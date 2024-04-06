// Derived from World of Tanks Mod Tools by KatzSmile (under GPLv3)
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using RT.Util.Json;

namespace WotDataLib
{
    /// <summary>Helper class for reading World of Tanks BXML files.</summary>
    public static class BxmlReader
    {
        /// <summary>
        ///     Reads a BXML file from the specified file, returning the result as a JSON structure. See remarks.</summary>
        /// <remarks>
        ///     The WoT data files do not have a consistent type for all the numbers. Expect to see raw numbers (like
        ///     <c>5.7</c>) mixed freely with string numbers (like <c>"5.7"</c>).</remarks>
        public static JsonDict ReadFile(string filename)
        {
            using (var reader = new BinaryReader(File.Open(filename, FileMode.Open, FileAccess.Read, FileShare.Read)))
            {
                var result = readFile(reader);
                // debug: File.WriteAllText("C:/Temp/WoT/" + filename.FilenameCharactersEscape(), result.ToStringIndented());
                return result;
            }
        }

        /// <summary>
        ///     Reads a BXML file from the specified stream, returning the result as a JSON structure. See remarks.</summary>
        /// <remarks>
        ///     The WoT data files do not have a consistent type for all the numbers. Expect to see raw numbers (like
        ///     <c>5.7</c>) mixed freely with string numbers (like <c>"5.7"</c>).</remarks>
        public static JsonDict ReadFile(Stream file)
        {
            using (var reader = new BinaryReader(file))
            {
                var result = readFile(reader);
                // debug: File.WriteAllText("C:/Temp/WoT/" + filename.FilenameCharactersEscape(), result.ToStringIndented());
                return result;
            }
        }

        /// <summary>Reads a BXML file from the specified binary reader, returning the result as a JSON structure.</summary>
        private static JsonDict readFile(BinaryReader reader)
        {
            // Read and check file header
            if (reader.ReadUInt32() != 0x62A14E45)
                throw new WotDataException("This file does not look like a valid binary-xml file");

            // Read a 0 byte - not sure what it's purpose is
            reader.ReadByte();

            // Read an array of zero-terminated strings encoded in UTF-8
            // These strings are used for the dictionary keys when reading dictionaries (they are never encoded "in-line"; all dictionary keys
            // are indices into this list of strings).
            var strings = new List<string>();
            byte[] bytes = new byte[128];
            while (true)
            {
                // Read a zero-terminated array of bytes.
                int length = -1;
                do
                {
                    length++;
                    if (length >= bytes.Length)
                        Array.Resize(ref bytes, bytes.Length * 2);
                    bytes[length] = reader.ReadByte();
                } while (bytes[length] != 0);
                // The array of strings is terminated by a zero-length string
                if (length == 0)
                    break;
                // Decode the array as a UTF-8 string now that we know the length
                strings.Add(Encoding.UTF8.GetString(bytes, 0, length));
            }

            // Read a single dictionary structure
            return readDict(reader, strings);
        }

        private enum type { Dict = 0, String = 1, Int = 2, Floats = 3, Bool = 4, Base64 = 5 }

        /// <summary>
        ///     Reads a value of type dictionary from the current position of the binary reader. Note that in addition to a
        ///     number of children, a dictionary may also have an "own" value, which is never a dictionary, and which this
        ///     function stores at the empty string key (<c>result[""]</c>).</summary>
        /// <param name="reader">
        ///     The binary reader to read from.</param>
        /// <param name="strings">
        ///     An array of strings read from the start of the file, used as dictionary keys.</param>
        /// <returns>
        ///     The dictionary read, converted to a JSON dictionary for convenience.</returns>
        private static JsonDict readDict(BinaryReader reader, List<string> strings)
        {
            // Read the number of children that this dictionary has
            int childCount = reader.ReadInt16();

            // Read the length and data type of the "own" value.
            int endAndType = reader.ReadInt32();
            var ownValueLength = endAndType & 0x0fffffff;
            var ownValueType = (type) (endAndType >> 28);
            if (ownValueType == type.Dict)
                throw new WotDataException("14516");

            int prevEnd = ownValueLength;

            // Read information about each of the child values: the key name, the length and type of the value
            var children = new[] { new { name = "dummy", length = 0, type = type.String } }.ToList();
            children.Clear();
            for (int dummy = 0; dummy < childCount; dummy++)
            {
                var name = strings[reader.ReadInt16()];
                endAndType = reader.ReadInt32();
                var end = endAndType & 0x0fffffff;
                var length = end - prevEnd;
                prevEnd = end;
                children.Add(new { name, length, type = (type) (endAndType >> 28) });
            }

            // Read the own value
            var result = new JsonDict();
            if (ownValueLength > 0 || ownValueType != type.String) // some dictionaries don't have an "own" value
                result[""] = readData(reader, strings, ownValueType, ownValueLength);

            // Read the child values
            foreach (var child in children)
                result[child.name] = readData(reader, strings, child.type, child.length);

            return result;
        }

        /// <summary>
        ///     Reads a value from the current position of the binary reader. The value may be a nested dictionary, or one of
        ///     the primitive types.</summary>
        /// <param name="reader">
        ///     The binary reader to read from.</param>
        /// <param name="strings">
        ///     An array of strings read from the start of the file, used as dictionary keys.</param>
        /// <param name="type">
        ///     The type of the value (which must have been read elsewhere in the binary data file).</param>
        /// <param name="length">
        ///     The length of the value (which must have been read elsewhere in the binary data file).</param>
        /// <returns>
        ///     The value read, converted for convenience to a JSON value.</returns>
        private static JsonValue readData(BinaryReader reader, List<string> strings, type type, int length)
        {
            switch (type)
            {
                case type.Dict:
                    return readDict(reader, strings);
                case type.String:
                    return new JsonString(Encoding.UTF8.GetString(reader.ReadBytes(length), 0, length));
                case type.Int:
                    switch (length)
                    {
                        case 0:
                            return 0;
                        case 1:
                            return reader.ReadSByte();
                        case 2:
                            return reader.ReadInt16();
                        case 4:
                            return reader.ReadInt32();
                        default:
                            throw new WotDataException("Unexpected length for Int");
                    }
                case type.Floats:
                    var floats = new List<JsonNumber>();
                    for (int i = 0; i < length / 4; i++)
                        floats.Add(reader.ReadSingle());
                    if (floats.Count == 1)
                        return floats[0];
                    else
                        return new JsonList(floats);
                case type.Bool:
                    bool value = length == 1;
                    if (value && reader.ReadSByte() != 1)
                        throw new WotDataException("Boolean error");
                    return new JsonBool(value);
                case type.Base64:
                    var b64 = Convert.ToBase64String(reader.ReadBytes(length)); // weird one: bytes -> base64 where the base64 looks like a normal string
                    return new JsonString(b64);
                default:
                    throw new WotDataException("Unknown type");
            }
        }
    }
}
