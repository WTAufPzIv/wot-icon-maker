"use strict";
const path = require("path");
const electron = require("electron");
const require$$1 = require("string_decoder");
const require$$1$1 = require("events");
const require$$4 = require("timers");
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var xml2js = {};
var defaults = {};
var hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults)
    return defaults;
  hasRequiredDefaults = 1;
  (function() {
    defaults.defaults = {
      "0.1": {
        explicitCharkey: false,
        trim: true,
        normalize: true,
        normalizeTags: false,
        attrkey: "@",
        charkey: "#",
        explicitArray: false,
        ignoreAttrs: false,
        mergeAttrs: false,
        explicitRoot: false,
        validator: null,
        xmlns: false,
        explicitChildren: false,
        childkey: "@@",
        charsAsChildren: false,
        includeWhiteChars: false,
        async: false,
        strict: true,
        attrNameProcessors: null,
        attrValueProcessors: null,
        tagNameProcessors: null,
        valueProcessors: null,
        emptyTag: ""
      },
      "0.2": {
        explicitCharkey: false,
        trim: false,
        normalize: false,
        normalizeTags: false,
        attrkey: "$",
        charkey: "_",
        explicitArray: true,
        ignoreAttrs: false,
        mergeAttrs: false,
        explicitRoot: true,
        validator: null,
        xmlns: false,
        explicitChildren: false,
        preserveChildrenOrder: false,
        childkey: "$$",
        charsAsChildren: false,
        includeWhiteChars: false,
        async: false,
        strict: true,
        attrNameProcessors: null,
        attrValueProcessors: null,
        tagNameProcessors: null,
        valueProcessors: null,
        rootName: "root",
        xmldec: {
          "version": "1.0",
          "encoding": "UTF-8",
          "standalone": true
        },
        doctype: null,
        renderOpts: {
          "pretty": true,
          "indent": "  ",
          "newline": "\n"
        },
        headless: false,
        chunkSize: 1e4,
        emptyTag: "",
        cdata: false
      }
    };
  }).call(commonjsGlobal);
  return defaults;
}
var builder = {};
var lib = {};
var Utility = {};
var hasRequiredUtility;
function requireUtility() {
  if (hasRequiredUtility)
    return Utility;
  hasRequiredUtility = 1;
  (function() {
    var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject, slice = [].slice, hasProp = {}.hasOwnProperty;
    assign = function() {
      var i, key, len, source, sources, target;
      target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (isFunction(Object.assign)) {
        Object.assign.apply(null, arguments);
      } else {
        for (i = 0, len = sources.length; i < len; i++) {
          source = sources[i];
          if (source != null) {
            for (key in source) {
              if (!hasProp.call(source, key))
                continue;
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
    isFunction = function(val) {
      return !!val && Object.prototype.toString.call(val) === "[object Function]";
    };
    isObject = function(val) {
      var ref;
      return !!val && ((ref = typeof val) === "function" || ref === "object");
    };
    isArray = function(val) {
      if (isFunction(Array.isArray)) {
        return Array.isArray(val);
      } else {
        return Object.prototype.toString.call(val) === "[object Array]";
      }
    };
    isEmpty = function(val) {
      var key;
      if (isArray(val)) {
        return !val.length;
      } else {
        for (key in val) {
          if (!hasProp.call(val, key))
            continue;
          return false;
        }
        return true;
      }
    };
    isPlainObject = function(val) {
      var ctor, proto;
      return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === "function" && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
    };
    getValue = function(obj) {
      if (isFunction(obj.valueOf)) {
        return obj.valueOf();
      } else {
        return obj;
      }
    };
    Utility.assign = assign;
    Utility.isFunction = isFunction;
    Utility.isObject = isObject;
    Utility.isArray = isArray;
    Utility.isEmpty = isEmpty;
    Utility.isPlainObject = isPlainObject;
    Utility.getValue = getValue;
  }).call(commonjsGlobal);
  return Utility;
}
var XMLDOMImplementation = { exports: {} };
var hasRequiredXMLDOMImplementation;
function requireXMLDOMImplementation() {
  if (hasRequiredXMLDOMImplementation)
    return XMLDOMImplementation.exports;
  hasRequiredXMLDOMImplementation = 1;
  (function() {
    XMLDOMImplementation.exports = function() {
      function XMLDOMImplementation2() {
      }
      XMLDOMImplementation2.prototype.hasFeature = function(feature, version) {
        return true;
      };
      XMLDOMImplementation2.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLDOMImplementation2.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLDOMImplementation2.prototype.createHTMLDocument = function(title) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLDOMImplementation2.prototype.getFeature = function(feature, version) {
        throw new Error("This DOM method is not implemented.");
      };
      return XMLDOMImplementation2;
    }();
  }).call(commonjsGlobal);
  return XMLDOMImplementation.exports;
}
var XMLDocument = { exports: {} };
var XMLDOMConfiguration = { exports: {} };
var XMLDOMErrorHandler = { exports: {} };
var hasRequiredXMLDOMErrorHandler;
function requireXMLDOMErrorHandler() {
  if (hasRequiredXMLDOMErrorHandler)
    return XMLDOMErrorHandler.exports;
  hasRequiredXMLDOMErrorHandler = 1;
  (function() {
    XMLDOMErrorHandler.exports = function() {
      function XMLDOMErrorHandler2() {
      }
      XMLDOMErrorHandler2.prototype.handleError = function(error) {
        throw new Error(error);
      };
      return XMLDOMErrorHandler2;
    }();
  }).call(commonjsGlobal);
  return XMLDOMErrorHandler.exports;
}
var XMLDOMStringList = { exports: {} };
var hasRequiredXMLDOMStringList;
function requireXMLDOMStringList() {
  if (hasRequiredXMLDOMStringList)
    return XMLDOMStringList.exports;
  hasRequiredXMLDOMStringList = 1;
  (function() {
    XMLDOMStringList.exports = function() {
      function XMLDOMStringList2(arr) {
        this.arr = arr || [];
      }
      Object.defineProperty(XMLDOMStringList2.prototype, "length", {
        get: function() {
          return this.arr.length;
        }
      });
      XMLDOMStringList2.prototype.item = function(index) {
        return this.arr[index] || null;
      };
      XMLDOMStringList2.prototype.contains = function(str) {
        return this.arr.indexOf(str) !== -1;
      };
      return XMLDOMStringList2;
    }();
  }).call(commonjsGlobal);
  return XMLDOMStringList.exports;
}
var hasRequiredXMLDOMConfiguration;
function requireXMLDOMConfiguration() {
  if (hasRequiredXMLDOMConfiguration)
    return XMLDOMConfiguration.exports;
  hasRequiredXMLDOMConfiguration = 1;
  (function() {
    var XMLDOMErrorHandler2, XMLDOMStringList2;
    XMLDOMErrorHandler2 = requireXMLDOMErrorHandler();
    XMLDOMStringList2 = requireXMLDOMStringList();
    XMLDOMConfiguration.exports = function() {
      function XMLDOMConfiguration2() {
        this.defaultParams = {
          "canonical-form": false,
          "cdata-sections": false,
          "comments": false,
          "datatype-normalization": false,
          "element-content-whitespace": true,
          "entities": true,
          "error-handler": new XMLDOMErrorHandler2(),
          "infoset": true,
          "validate-if-schema": false,
          "namespaces": true,
          "namespace-declarations": true,
          "normalize-characters": false,
          "schema-location": "",
          "schema-type": "",
          "split-cdata-sections": true,
          "validate": false,
          "well-formed": true
        };
        this.params = Object.create(this.defaultParams);
      }
      Object.defineProperty(XMLDOMConfiguration2.prototype, "parameterNames", {
        get: function() {
          return new XMLDOMStringList2(Object.keys(this.defaultParams));
        }
      });
      XMLDOMConfiguration2.prototype.getParameter = function(name) {
        if (this.params.hasOwnProperty(name)) {
          return this.params[name];
        } else {
          return null;
        }
      };
      XMLDOMConfiguration2.prototype.canSetParameter = function(name, value) {
        return true;
      };
      XMLDOMConfiguration2.prototype.setParameter = function(name, value) {
        if (value != null) {
          return this.params[name] = value;
        } else {
          return delete this.params[name];
        }
      };
      return XMLDOMConfiguration2;
    }();
  }).call(commonjsGlobal);
  return XMLDOMConfiguration.exports;
}
var XMLNode = { exports: {} };
var XMLElement = { exports: {} };
var NodeType = { exports: {} };
var hasRequiredNodeType;
function requireNodeType() {
  if (hasRequiredNodeType)
    return NodeType.exports;
  hasRequiredNodeType = 1;
  (function() {
    NodeType.exports = {
      Element: 1,
      Attribute: 2,
      Text: 3,
      CData: 4,
      EntityReference: 5,
      EntityDeclaration: 6,
      ProcessingInstruction: 7,
      Comment: 8,
      Document: 9,
      DocType: 10,
      DocumentFragment: 11,
      NotationDeclaration: 12,
      Declaration: 201,
      Raw: 202,
      AttributeDeclaration: 203,
      ElementDeclaration: 204,
      Dummy: 205
    };
  }).call(commonjsGlobal);
  return NodeType.exports;
}
var XMLAttribute = { exports: {} };
var hasRequiredXMLAttribute;
function requireXMLAttribute() {
  if (hasRequiredXMLAttribute)
    return XMLAttribute.exports;
  hasRequiredXMLAttribute = 1;
  (function() {
    var NodeType2;
    NodeType2 = requireNodeType();
    requireXMLNode();
    XMLAttribute.exports = function() {
      function XMLAttribute2(parent, name, value) {
        this.parent = parent;
        if (this.parent) {
          this.options = this.parent.options;
          this.stringify = this.parent.stringify;
        }
        if (name == null) {
          throw new Error("Missing attribute name. " + this.debugInfo(name));
        }
        this.name = this.stringify.name(name);
        this.value = this.stringify.attValue(value);
        this.type = NodeType2.Attribute;
        this.isId = false;
        this.schemaTypeInfo = null;
      }
      Object.defineProperty(XMLAttribute2.prototype, "nodeType", {
        get: function() {
          return this.type;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "ownerElement", {
        get: function() {
          return this.parent;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "textContent", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "namespaceURI", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "prefix", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "localName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLAttribute2.prototype, "specified", {
        get: function() {
          return true;
        }
      });
      XMLAttribute2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLAttribute2.prototype.toString = function(options) {
        return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
      };
      XMLAttribute2.prototype.debugInfo = function(name) {
        name = name || this.name;
        if (name == null) {
          return "parent: <" + this.parent.name + ">";
        } else {
          return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
        }
      };
      XMLAttribute2.prototype.isEqualNode = function(node) {
        if (node.namespaceURI !== this.namespaceURI) {
          return false;
        }
        if (node.prefix !== this.prefix) {
          return false;
        }
        if (node.localName !== this.localName) {
          return false;
        }
        if (node.value !== this.value) {
          return false;
        }
        return true;
      };
      return XMLAttribute2;
    }();
  }).call(commonjsGlobal);
  return XMLAttribute.exports;
}
var XMLNamedNodeMap = { exports: {} };
var hasRequiredXMLNamedNodeMap;
function requireXMLNamedNodeMap() {
  if (hasRequiredXMLNamedNodeMap)
    return XMLNamedNodeMap.exports;
  hasRequiredXMLNamedNodeMap = 1;
  (function() {
    XMLNamedNodeMap.exports = function() {
      function XMLNamedNodeMap2(nodes) {
        this.nodes = nodes;
      }
      Object.defineProperty(XMLNamedNodeMap2.prototype, "length", {
        get: function() {
          return Object.keys(this.nodes).length || 0;
        }
      });
      XMLNamedNodeMap2.prototype.clone = function() {
        return this.nodes = null;
      };
      XMLNamedNodeMap2.prototype.getNamedItem = function(name) {
        return this.nodes[name];
      };
      XMLNamedNodeMap2.prototype.setNamedItem = function(node) {
        var oldNode;
        oldNode = this.nodes[node.nodeName];
        this.nodes[node.nodeName] = node;
        return oldNode || null;
      };
      XMLNamedNodeMap2.prototype.removeNamedItem = function(name) {
        var oldNode;
        oldNode = this.nodes[name];
        delete this.nodes[name];
        return oldNode || null;
      };
      XMLNamedNodeMap2.prototype.item = function(index) {
        return this.nodes[Object.keys(this.nodes)[index]] || null;
      };
      XMLNamedNodeMap2.prototype.getNamedItemNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLNamedNodeMap2.prototype.setNamedItemNS = function(node) {
        throw new Error("This DOM method is not implemented.");
      };
      XMLNamedNodeMap2.prototype.removeNamedItemNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented.");
      };
      return XMLNamedNodeMap2;
    }();
  }).call(commonjsGlobal);
  return XMLNamedNodeMap.exports;
}
var hasRequiredXMLElement;
function requireXMLElement() {
  if (hasRequiredXMLElement)
    return XMLElement.exports;
  hasRequiredXMLElement = 1;
  (function() {
    var NodeType2, XMLAttribute2, XMLNamedNodeMap2, XMLNode2, getValue, isFunction, isObject, ref, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    ref = requireUtility(), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLAttribute2 = requireXMLAttribute();
    XMLNamedNodeMap2 = requireXMLNamedNodeMap();
    XMLElement.exports = function(superClass) {
      extend(XMLElement2, superClass);
      function XMLElement2(parent, name, attributes) {
        var child, j, len, ref1;
        XMLElement2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing element name. " + this.debugInfo());
        }
        this.name = this.stringify.name(name);
        this.type = NodeType2.Element;
        this.attribs = {};
        this.schemaTypeInfo = null;
        if (attributes != null) {
          this.attribute(attributes);
        }
        if (parent.type === NodeType2.Document) {
          this.isRoot = true;
          this.documentObject = parent;
          parent.rootObject = this;
          if (parent.children) {
            ref1 = parent.children;
            for (j = 0, len = ref1.length; j < len; j++) {
              child = ref1[j];
              if (child.type === NodeType2.DocType) {
                child.name = this.name;
                break;
              }
            }
          }
        }
      }
      Object.defineProperty(XMLElement2.prototype, "tagName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLElement2.prototype, "namespaceURI", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLElement2.prototype, "prefix", {
        get: function() {
          return "";
        }
      });
      Object.defineProperty(XMLElement2.prototype, "localName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLElement2.prototype, "id", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "className", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "classList", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLElement2.prototype, "attributes", {
        get: function() {
          if (!this.attributeMap || !this.attributeMap.nodes) {
            this.attributeMap = new XMLNamedNodeMap2(this.attribs);
          }
          return this.attributeMap;
        }
      });
      XMLElement2.prototype.clone = function() {
        var att, attName, clonedSelf, ref1;
        clonedSelf = Object.create(this);
        if (clonedSelf.isRoot) {
          clonedSelf.documentObject = null;
        }
        clonedSelf.attribs = {};
        ref1 = this.attribs;
        for (attName in ref1) {
          if (!hasProp.call(ref1, attName))
            continue;
          att = ref1[attName];
          clonedSelf.attribs[attName] = att.clone();
        }
        clonedSelf.children = [];
        this.children.forEach(function(child) {
          var clonedChild;
          clonedChild = child.clone();
          clonedChild.parent = clonedSelf;
          return clonedSelf.children.push(clonedChild);
        });
        return clonedSelf;
      };
      XMLElement2.prototype.attribute = function(name, value) {
        var attName, attValue;
        if (name != null) {
          name = getValue(name);
        }
        if (isObject(name)) {
          for (attName in name) {
            if (!hasProp.call(name, attName))
              continue;
            attValue = name[attName];
            this.attribute(attName, attValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          if (this.options.keepNullAttributes && value == null) {
            this.attribs[name] = new XMLAttribute2(this, name, "");
          } else if (value != null) {
            this.attribs[name] = new XMLAttribute2(this, name, value);
          }
        }
        return this;
      };
      XMLElement2.prototype.removeAttribute = function(name) {
        var attName, j, len;
        if (name == null) {
          throw new Error("Missing attribute name. " + this.debugInfo());
        }
        name = getValue(name);
        if (Array.isArray(name)) {
          for (j = 0, len = name.length; j < len; j++) {
            attName = name[j];
            delete this.attribs[attName];
          }
        } else {
          delete this.attribs[name];
        }
        return this;
      };
      XMLElement2.prototype.toString = function(options) {
        return this.options.writer.element(this, this.options.writer.filterOptions(options));
      };
      XMLElement2.prototype.att = function(name, value) {
        return this.attribute(name, value);
      };
      XMLElement2.prototype.a = function(name, value) {
        return this.attribute(name, value);
      };
      XMLElement2.prototype.getAttribute = function(name) {
        if (this.attribs.hasOwnProperty(name)) {
          return this.attribs[name].value;
        } else {
          return null;
        }
      };
      XMLElement2.prototype.setAttribute = function(name, value) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getAttributeNode = function(name) {
        if (this.attribs.hasOwnProperty(name)) {
          return this.attribs[name];
        } else {
          return null;
        }
      };
      XMLElement2.prototype.setAttributeNode = function(newAttr) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.removeAttributeNode = function(oldAttr) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByTagName = function(name) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getAttributeNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.removeAttributeNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.setAttributeNodeNS = function(newAttr) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.hasAttribute = function(name) {
        return this.attribs.hasOwnProperty(name);
      };
      XMLElement2.prototype.hasAttributeNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.setIdAttribute = function(name, isId) {
        if (this.attribs.hasOwnProperty(name)) {
          return this.attribs[name].isId;
        } else {
          return isId;
        }
      };
      XMLElement2.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.setIdAttributeNode = function(idAttr, isId) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByTagName = function(tagname) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.getElementsByClassName = function(classNames) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLElement2.prototype.isEqualNode = function(node) {
        var i, j, ref1;
        if (!XMLElement2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
          return false;
        }
        if (node.namespaceURI !== this.namespaceURI) {
          return false;
        }
        if (node.prefix !== this.prefix) {
          return false;
        }
        if (node.localName !== this.localName) {
          return false;
        }
        if (node.attribs.length !== this.attribs.length) {
          return false;
        }
        for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
          if (!this.attribs[i].isEqualNode(node.attribs[i])) {
            return false;
          }
        }
        return true;
      };
      return XMLElement2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLElement.exports;
}
var XMLCData = { exports: {} };
var XMLCharacterData = { exports: {} };
var hasRequiredXMLCharacterData;
function requireXMLCharacterData() {
  if (hasRequiredXMLCharacterData)
    return XMLCharacterData.exports;
  hasRequiredXMLCharacterData = 1;
  (function() {
    var XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    XMLCharacterData.exports = function(superClass) {
      extend(XMLCharacterData2, superClass);
      function XMLCharacterData2(parent) {
        XMLCharacterData2.__super__.constructor.call(this, parent);
        this.value = "";
      }
      Object.defineProperty(XMLCharacterData2.prototype, "data", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      Object.defineProperty(XMLCharacterData2.prototype, "length", {
        get: function() {
          return this.value.length;
        }
      });
      Object.defineProperty(XMLCharacterData2.prototype, "textContent", {
        get: function() {
          return this.value;
        },
        set: function(value) {
          return this.value = value || "";
        }
      });
      XMLCharacterData2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLCharacterData2.prototype.substringData = function(offset, count) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.appendData = function(arg) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.insertData = function(offset, arg) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.deleteData = function(offset, count) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.replaceData = function(offset, count, arg) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLCharacterData2.prototype.isEqualNode = function(node) {
        if (!XMLCharacterData2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
          return false;
        }
        if (node.data !== this.data) {
          return false;
        }
        return true;
      };
      return XMLCharacterData2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLCharacterData.exports;
}
var hasRequiredXMLCData;
function requireXMLCData() {
  if (hasRequiredXMLCData)
    return XMLCData.exports;
  hasRequiredXMLCData = 1;
  (function() {
    var NodeType2, XMLCharacterData2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLCData.exports = function(superClass) {
      extend(XMLCData2, superClass);
      function XMLCData2(parent, text) {
        XMLCData2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing CDATA text. " + this.debugInfo());
        }
        this.name = "#cdata-section";
        this.type = NodeType2.CData;
        this.value = this.stringify.cdata(text);
      }
      XMLCData2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLCData2.prototype.toString = function(options) {
        return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
      };
      return XMLCData2;
    }(XMLCharacterData2);
  }).call(commonjsGlobal);
  return XMLCData.exports;
}
var XMLComment = { exports: {} };
var hasRequiredXMLComment;
function requireXMLComment() {
  if (hasRequiredXMLComment)
    return XMLComment.exports;
  hasRequiredXMLComment = 1;
  (function() {
    var NodeType2, XMLCharacterData2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLComment.exports = function(superClass) {
      extend(XMLComment2, superClass);
      function XMLComment2(parent, text) {
        XMLComment2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing comment text. " + this.debugInfo());
        }
        this.name = "#comment";
        this.type = NodeType2.Comment;
        this.value = this.stringify.comment(text);
      }
      XMLComment2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLComment2.prototype.toString = function(options) {
        return this.options.writer.comment(this, this.options.writer.filterOptions(options));
      };
      return XMLComment2;
    }(XMLCharacterData2);
  }).call(commonjsGlobal);
  return XMLComment.exports;
}
var XMLDeclaration = { exports: {} };
var hasRequiredXMLDeclaration;
function requireXMLDeclaration() {
  if (hasRequiredXMLDeclaration)
    return XMLDeclaration.exports;
  hasRequiredXMLDeclaration = 1;
  (function() {
    var NodeType2, XMLNode2, isObject, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDeclaration.exports = function(superClass) {
      extend(XMLDeclaration2, superClass);
      function XMLDeclaration2(parent, version, encoding, standalone) {
        var ref;
        XMLDeclaration2.__super__.constructor.call(this, parent);
        if (isObject(version)) {
          ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
        }
        if (!version) {
          version = "1.0";
        }
        this.type = NodeType2.Declaration;
        this.version = this.stringify.xmlVersion(version);
        if (encoding != null) {
          this.encoding = this.stringify.xmlEncoding(encoding);
        }
        if (standalone != null) {
          this.standalone = this.stringify.xmlStandalone(standalone);
        }
      }
      XMLDeclaration2.prototype.toString = function(options) {
        return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
      };
      return XMLDeclaration2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDeclaration.exports;
}
var XMLDocType = { exports: {} };
var XMLDTDAttList = { exports: {} };
var hasRequiredXMLDTDAttList;
function requireXMLDTDAttList() {
  if (hasRequiredXMLDTDAttList)
    return XMLDTDAttList.exports;
  hasRequiredXMLDTDAttList = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDAttList.exports = function(superClass) {
      extend(XMLDTDAttList2, superClass);
      function XMLDTDAttList2(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        XMLDTDAttList2.__super__.constructor.call(this, parent);
        if (elementName == null) {
          throw new Error("Missing DTD element name. " + this.debugInfo());
        }
        if (attributeName == null) {
          throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
        }
        if (!attributeType) {
          throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
        }
        if (!defaultValueType) {
          throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
        }
        if (defaultValueType.indexOf("#") !== 0) {
          defaultValueType = "#" + defaultValueType;
        }
        if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
          throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
        }
        if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
          throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
        }
        this.elementName = this.stringify.name(elementName);
        this.type = NodeType2.AttributeDeclaration;
        this.attributeName = this.stringify.name(attributeName);
        this.attributeType = this.stringify.dtdAttType(attributeType);
        if (defaultValue) {
          this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
        }
        this.defaultValueType = defaultValueType;
      }
      XMLDTDAttList2.prototype.toString = function(options) {
        return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
      };
      return XMLDTDAttList2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDAttList.exports;
}
var XMLDTDEntity = { exports: {} };
var hasRequiredXMLDTDEntity;
function requireXMLDTDEntity() {
  if (hasRequiredXMLDTDEntity)
    return XMLDTDEntity.exports;
  hasRequiredXMLDTDEntity = 1;
  (function() {
    var NodeType2, XMLNode2, isObject, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDEntity.exports = function(superClass) {
      extend(XMLDTDEntity2, superClass);
      function XMLDTDEntity2(parent, pe, name, value) {
        XMLDTDEntity2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD entity name. " + this.debugInfo(name));
        }
        if (value == null) {
          throw new Error("Missing DTD entity value. " + this.debugInfo(name));
        }
        this.pe = !!pe;
        this.name = this.stringify.name(name);
        this.type = NodeType2.EntityDeclaration;
        if (!isObject(value)) {
          this.value = this.stringify.dtdEntityValue(value);
          this.internal = true;
        } else {
          if (!value.pubID && !value.sysID) {
            throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
          }
          if (value.pubID && !value.sysID) {
            throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
          }
          this.internal = false;
          if (value.pubID != null) {
            this.pubID = this.stringify.dtdPubID(value.pubID);
          }
          if (value.sysID != null) {
            this.sysID = this.stringify.dtdSysID(value.sysID);
          }
          if (value.nData != null) {
            this.nData = this.stringify.dtdNData(value.nData);
          }
          if (this.pe && this.nData) {
            throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
          }
        }
      }
      Object.defineProperty(XMLDTDEntity2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "notationName", {
        get: function() {
          return this.nData || null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "inputEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "xmlEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDTDEntity2.prototype, "xmlVersion", {
        get: function() {
          return null;
        }
      });
      XMLDTDEntity2.prototype.toString = function(options) {
        return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
      };
      return XMLDTDEntity2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDEntity.exports;
}
var XMLDTDElement = { exports: {} };
var hasRequiredXMLDTDElement;
function requireXMLDTDElement() {
  if (hasRequiredXMLDTDElement)
    return XMLDTDElement.exports;
  hasRequiredXMLDTDElement = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDElement.exports = function(superClass) {
      extend(XMLDTDElement2, superClass);
      function XMLDTDElement2(parent, name, value) {
        XMLDTDElement2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD element name. " + this.debugInfo());
        }
        if (!value) {
          value = "(#PCDATA)";
        }
        if (Array.isArray(value)) {
          value = "(" + value.join(",") + ")";
        }
        this.name = this.stringify.name(name);
        this.type = NodeType2.ElementDeclaration;
        this.value = this.stringify.dtdElementValue(value);
      }
      XMLDTDElement2.prototype.toString = function(options) {
        return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
      };
      return XMLDTDElement2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDElement.exports;
}
var XMLDTDNotation = { exports: {} };
var hasRequiredXMLDTDNotation;
function requireXMLDTDNotation() {
  if (hasRequiredXMLDTDNotation)
    return XMLDTDNotation.exports;
  hasRequiredXMLDTDNotation = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDNotation.exports = function(superClass) {
      extend(XMLDTDNotation2, superClass);
      function XMLDTDNotation2(parent, name, value) {
        XMLDTDNotation2.__super__.constructor.call(this, parent);
        if (name == null) {
          throw new Error("Missing DTD notation name. " + this.debugInfo(name));
        }
        if (!value.pubID && !value.sysID) {
          throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
        }
        this.name = this.stringify.name(name);
        this.type = NodeType2.NotationDeclaration;
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
      }
      Object.defineProperty(XMLDTDNotation2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDTDNotation2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      XMLDTDNotation2.prototype.toString = function(options) {
        return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
      };
      return XMLDTDNotation2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDTDNotation.exports;
}
var hasRequiredXMLDocType;
function requireXMLDocType() {
  if (hasRequiredXMLDocType)
    return XMLDocType.exports;
  hasRequiredXMLDocType = 1;
  (function() {
    var NodeType2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLNamedNodeMap2, XMLNode2, isObject, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = requireUtility().isObject;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLNamedNodeMap2 = requireXMLNamedNodeMap();
    XMLDocType.exports = function(superClass) {
      extend(XMLDocType2, superClass);
      function XMLDocType2(parent, pubID, sysID) {
        var child, i, len, ref, ref1, ref2;
        XMLDocType2.__super__.constructor.call(this, parent);
        this.type = NodeType2.DocType;
        if (parent.children) {
          ref = parent.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child.type === NodeType2.Element) {
              this.name = child.name;
              break;
            }
          }
        }
        this.documentObject = parent;
        if (isObject(pubID)) {
          ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
        }
        if (sysID == null) {
          ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
        }
        if (pubID != null) {
          this.pubID = this.stringify.dtdPubID(pubID);
        }
        if (sysID != null) {
          this.sysID = this.stringify.dtdSysID(sysID);
        }
      }
      Object.defineProperty(XMLDocType2.prototype, "entities", {
        get: function() {
          var child, i, len, nodes, ref;
          nodes = {};
          ref = this.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child.type === NodeType2.EntityDeclaration && !child.pe) {
              nodes[child.name] = child;
            }
          }
          return new XMLNamedNodeMap2(nodes);
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "notations", {
        get: function() {
          var child, i, len, nodes, ref;
          nodes = {};
          ref = this.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child.type === NodeType2.NotationDeclaration) {
              nodes[child.name] = child;
            }
          }
          return new XMLNamedNodeMap2(nodes);
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "publicId", {
        get: function() {
          return this.pubID;
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "systemId", {
        get: function() {
          return this.sysID;
        }
      });
      Object.defineProperty(XMLDocType2.prototype, "internalSubset", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      XMLDocType2.prototype.element = function(name, value) {
        var child;
        child = new XMLDTDElement2(this, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        var child;
        child = new XMLDTDAttList2(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.entity = function(name, value) {
        var child;
        child = new XMLDTDEntity2(this, false, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.pEntity = function(name, value) {
        var child;
        child = new XMLDTDEntity2(this, true, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.notation = function(name, value) {
        var child;
        child = new XMLDTDNotation2(this, name, value);
        this.children.push(child);
        return this;
      };
      XMLDocType2.prototype.toString = function(options) {
        return this.options.writer.docType(this, this.options.writer.filterOptions(options));
      };
      XMLDocType2.prototype.ele = function(name, value) {
        return this.element(name, value);
      };
      XMLDocType2.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
      };
      XMLDocType2.prototype.ent = function(name, value) {
        return this.entity(name, value);
      };
      XMLDocType2.prototype.pent = function(name, value) {
        return this.pEntity(name, value);
      };
      XMLDocType2.prototype.not = function(name, value) {
        return this.notation(name, value);
      };
      XMLDocType2.prototype.up = function() {
        return this.root() || this.documentObject;
      };
      XMLDocType2.prototype.isEqualNode = function(node) {
        if (!XMLDocType2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
          return false;
        }
        if (node.name !== this.name) {
          return false;
        }
        if (node.publicId !== this.publicId) {
          return false;
        }
        if (node.systemId !== this.systemId) {
          return false;
        }
        return true;
      };
      return XMLDocType2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDocType.exports;
}
var XMLRaw = { exports: {} };
var hasRequiredXMLRaw;
function requireXMLRaw() {
  if (hasRequiredXMLRaw)
    return XMLRaw.exports;
  hasRequiredXMLRaw = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLNode2 = requireXMLNode();
    XMLRaw.exports = function(superClass) {
      extend(XMLRaw2, superClass);
      function XMLRaw2(parent, text) {
        XMLRaw2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing raw text. " + this.debugInfo());
        }
        this.type = NodeType2.Raw;
        this.value = this.stringify.raw(text);
      }
      XMLRaw2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLRaw2.prototype.toString = function(options) {
        return this.options.writer.raw(this, this.options.writer.filterOptions(options));
      };
      return XMLRaw2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLRaw.exports;
}
var XMLText = { exports: {} };
var hasRequiredXMLText;
function requireXMLText() {
  if (hasRequiredXMLText)
    return XMLText.exports;
  hasRequiredXMLText = 1;
  (function() {
    var NodeType2, XMLCharacterData2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLText.exports = function(superClass) {
      extend(XMLText2, superClass);
      function XMLText2(parent, text) {
        XMLText2.__super__.constructor.call(this, parent);
        if (text == null) {
          throw new Error("Missing element text. " + this.debugInfo());
        }
        this.name = "#text";
        this.type = NodeType2.Text;
        this.value = this.stringify.text(text);
      }
      Object.defineProperty(XMLText2.prototype, "isElementContentWhitespace", {
        get: function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      Object.defineProperty(XMLText2.prototype, "wholeText", {
        get: function() {
          var next, prev, str;
          str = "";
          prev = this.previousSibling;
          while (prev) {
            str = prev.data + str;
            prev = prev.previousSibling;
          }
          str += this.data;
          next = this.nextSibling;
          while (next) {
            str = str + next.data;
            next = next.nextSibling;
          }
          return str;
        }
      });
      XMLText2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLText2.prototype.toString = function(options) {
        return this.options.writer.text(this, this.options.writer.filterOptions(options));
      };
      XMLText2.prototype.splitText = function(offset) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLText2.prototype.replaceWholeText = function(content) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      return XMLText2;
    }(XMLCharacterData2);
  }).call(commonjsGlobal);
  return XMLText.exports;
}
var XMLProcessingInstruction = { exports: {} };
var hasRequiredXMLProcessingInstruction;
function requireXMLProcessingInstruction() {
  if (hasRequiredXMLProcessingInstruction)
    return XMLProcessingInstruction.exports;
  hasRequiredXMLProcessingInstruction = 1;
  (function() {
    var NodeType2, XMLCharacterData2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLCharacterData2 = requireXMLCharacterData();
    XMLProcessingInstruction.exports = function(superClass) {
      extend(XMLProcessingInstruction2, superClass);
      function XMLProcessingInstruction2(parent, target, value) {
        XMLProcessingInstruction2.__super__.constructor.call(this, parent);
        if (target == null) {
          throw new Error("Missing instruction target. " + this.debugInfo());
        }
        this.type = NodeType2.ProcessingInstruction;
        this.target = this.stringify.insTarget(target);
        this.name = this.target;
        if (value) {
          this.value = this.stringify.insValue(value);
        }
      }
      XMLProcessingInstruction2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLProcessingInstruction2.prototype.toString = function(options) {
        return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
      };
      XMLProcessingInstruction2.prototype.isEqualNode = function(node) {
        if (!XMLProcessingInstruction2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
          return false;
        }
        if (node.target !== this.target) {
          return false;
        }
        return true;
      };
      return XMLProcessingInstruction2;
    }(XMLCharacterData2);
  }).call(commonjsGlobal);
  return XMLProcessingInstruction.exports;
}
var XMLDummy = { exports: {} };
var hasRequiredXMLDummy;
function requireXMLDummy() {
  if (hasRequiredXMLDummy)
    return XMLDummy.exports;
  hasRequiredXMLDummy = 1;
  (function() {
    var NodeType2, XMLNode2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLDummy.exports = function(superClass) {
      extend(XMLDummy2, superClass);
      function XMLDummy2(parent) {
        XMLDummy2.__super__.constructor.call(this, parent);
        this.type = NodeType2.Dummy;
      }
      XMLDummy2.prototype.clone = function() {
        return Object.create(this);
      };
      XMLDummy2.prototype.toString = function(options) {
        return "";
      };
      return XMLDummy2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDummy.exports;
}
var XMLNodeList = { exports: {} };
var hasRequiredXMLNodeList;
function requireXMLNodeList() {
  if (hasRequiredXMLNodeList)
    return XMLNodeList.exports;
  hasRequiredXMLNodeList = 1;
  (function() {
    XMLNodeList.exports = function() {
      function XMLNodeList2(nodes) {
        this.nodes = nodes;
      }
      Object.defineProperty(XMLNodeList2.prototype, "length", {
        get: function() {
          return this.nodes.length || 0;
        }
      });
      XMLNodeList2.prototype.clone = function() {
        return this.nodes = null;
      };
      XMLNodeList2.prototype.item = function(index) {
        return this.nodes[index] || null;
      };
      return XMLNodeList2;
    }();
  }).call(commonjsGlobal);
  return XMLNodeList.exports;
}
var DocumentPosition = { exports: {} };
var hasRequiredDocumentPosition;
function requireDocumentPosition() {
  if (hasRequiredDocumentPosition)
    return DocumentPosition.exports;
  hasRequiredDocumentPosition = 1;
  (function() {
    DocumentPosition.exports = {
      Disconnected: 1,
      Preceding: 2,
      Following: 4,
      Contains: 8,
      ContainedBy: 16,
      ImplementationSpecific: 32
    };
  }).call(commonjsGlobal);
  return DocumentPosition.exports;
}
var hasRequiredXMLNode;
function requireXMLNode() {
  if (hasRequiredXMLNode)
    return XMLNode.exports;
  hasRequiredXMLNode = 1;
  (function() {
    var DocumentPosition2, NodeType2, XMLCData2, XMLComment2, XMLDeclaration2, XMLDocType2, XMLDummy2, XMLElement2, XMLNodeList2, XMLProcessingInstruction2, XMLRaw2, XMLText2, getValue, isEmpty, isFunction, isObject, ref1, hasProp = {}.hasOwnProperty;
    ref1 = requireUtility(), isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;
    XMLElement2 = null;
    XMLCData2 = null;
    XMLComment2 = null;
    XMLDeclaration2 = null;
    XMLDocType2 = null;
    XMLRaw2 = null;
    XMLText2 = null;
    XMLProcessingInstruction2 = null;
    XMLDummy2 = null;
    NodeType2 = null;
    XMLNodeList2 = null;
    DocumentPosition2 = null;
    XMLNode.exports = function() {
      function XMLNode2(parent1) {
        this.parent = parent1;
        if (this.parent) {
          this.options = this.parent.options;
          this.stringify = this.parent.stringify;
        }
        this.value = null;
        this.children = [];
        this.baseURI = null;
        if (!XMLElement2) {
          XMLElement2 = requireXMLElement();
          XMLCData2 = requireXMLCData();
          XMLComment2 = requireXMLComment();
          XMLDeclaration2 = requireXMLDeclaration();
          XMLDocType2 = requireXMLDocType();
          XMLRaw2 = requireXMLRaw();
          XMLText2 = requireXMLText();
          XMLProcessingInstruction2 = requireXMLProcessingInstruction();
          XMLDummy2 = requireXMLDummy();
          NodeType2 = requireNodeType();
          XMLNodeList2 = requireXMLNodeList();
          requireXMLNamedNodeMap();
          DocumentPosition2 = requireDocumentPosition();
        }
      }
      Object.defineProperty(XMLNode2.prototype, "nodeName", {
        get: function() {
          return this.name;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nodeType", {
        get: function() {
          return this.type;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nodeValue", {
        get: function() {
          return this.value;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "parentNode", {
        get: function() {
          return this.parent;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "childNodes", {
        get: function() {
          if (!this.childNodeList || !this.childNodeList.nodes) {
            this.childNodeList = new XMLNodeList2(this.children);
          }
          return this.childNodeList;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "firstChild", {
        get: function() {
          return this.children[0] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "lastChild", {
        get: function() {
          return this.children[this.children.length - 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "previousSibling", {
        get: function() {
          var i;
          i = this.parent.children.indexOf(this);
          return this.parent.children[i - 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "nextSibling", {
        get: function() {
          var i;
          i = this.parent.children.indexOf(this);
          return this.parent.children[i + 1] || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "ownerDocument", {
        get: function() {
          return this.document() || null;
        }
      });
      Object.defineProperty(XMLNode2.prototype, "textContent", {
        get: function() {
          var child, j, len, ref2, str;
          if (this.nodeType === NodeType2.Element || this.nodeType === NodeType2.DocumentFragment) {
            str = "";
            ref2 = this.children;
            for (j = 0, len = ref2.length; j < len; j++) {
              child = ref2[j];
              if (child.textContent) {
                str += child.textContent;
              }
            }
            return str;
          } else {
            return null;
          }
        },
        set: function(value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        }
      });
      XMLNode2.prototype.setParent = function(parent) {
        var child, j, len, ref2, results;
        this.parent = parent;
        if (parent) {
          this.options = parent.options;
          this.stringify = parent.stringify;
        }
        ref2 = this.children;
        results = [];
        for (j = 0, len = ref2.length; j < len; j++) {
          child = ref2[j];
          results.push(child.setParent(this));
        }
        return results;
      };
      XMLNode2.prototype.element = function(name, attributes, text) {
        var childNode, item, j, k, key, lastChild, len, len1, ref2, ref3, val;
        lastChild = null;
        if (attributes === null && text == null) {
          ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
        }
        if (attributes == null) {
          attributes = {};
        }
        attributes = getValue(attributes);
        if (!isObject(attributes)) {
          ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
        }
        if (name != null) {
          name = getValue(name);
        }
        if (Array.isArray(name)) {
          for (j = 0, len = name.length; j < len; j++) {
            item = name[j];
            lastChild = this.element(item);
          }
        } else if (isFunction(name)) {
          lastChild = this.element(name.apply());
        } else if (isObject(name)) {
          for (key in name) {
            if (!hasProp.call(name, key))
              continue;
            val = name[key];
            if (isFunction(val)) {
              val = val.apply();
            }
            if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
              lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
            } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
              lastChild = this.dummy();
            } else if (isObject(val) && isEmpty(val)) {
              lastChild = this.element(key);
            } else if (!this.options.keepNullNodes && val == null) {
              lastChild = this.dummy();
            } else if (!this.options.separateArrayItems && Array.isArray(val)) {
              for (k = 0, len1 = val.length; k < len1; k++) {
                item = val[k];
                childNode = {};
                childNode[key] = item;
                lastChild = this.element(childNode);
              }
            } else if (isObject(val)) {
              if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
                lastChild = this.element(val);
              } else {
                lastChild = this.element(key);
                lastChild.element(val);
              }
            } else {
              lastChild = this.element(key, val);
            }
          }
        } else if (!this.options.keepNullNodes && text === null) {
          lastChild = this.dummy();
        } else {
          if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
            lastChild = this.text(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
            lastChild = this.cdata(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
            lastChild = this.comment(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
            lastChild = this.raw(text);
          } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
            lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
          } else {
            lastChild = this.node(name, attributes, text);
          }
        }
        if (lastChild == null) {
          throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
        }
        return lastChild;
      };
      XMLNode2.prototype.insertBefore = function(name, attributes, text) {
        var child, i, newChild, refChild, removed;
        if (name != null ? name.type : void 0) {
          newChild = name;
          refChild = attributes;
          newChild.setParent(this);
          if (refChild) {
            i = children.indexOf(refChild);
            removed = children.splice(i);
            children.push(newChild);
            Array.prototype.push.apply(children, removed);
          } else {
            children.push(newChild);
          }
          return newChild;
        } else {
          if (this.isRoot) {
            throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
          }
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          child = this.parent.element(name, attributes, text);
          Array.prototype.push.apply(this.parent.children, removed);
          return child;
        }
      };
      XMLNode2.prototype.insertAfter = function(name, attributes, text) {
        var child, i, removed;
        if (this.isRoot) {
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
        }
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        child = this.parent.element(name, attributes, text);
        Array.prototype.push.apply(this.parent.children, removed);
        return child;
      };
      XMLNode2.prototype.remove = function() {
        var i;
        if (this.isRoot) {
          throw new Error("Cannot remove the root element. " + this.debugInfo());
        }
        i = this.parent.children.indexOf(this);
        [].splice.apply(this.parent.children, [i, i - i + 1].concat([]));
        return this.parent;
      };
      XMLNode2.prototype.node = function(name, attributes, text) {
        var child, ref2;
        if (name != null) {
          name = getValue(name);
        }
        attributes || (attributes = {});
        attributes = getValue(attributes);
        if (!isObject(attributes)) {
          ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
        }
        child = new XMLElement2(this, name, attributes);
        if (text != null) {
          child.text(text);
        }
        this.children.push(child);
        return child;
      };
      XMLNode2.prototype.text = function(value) {
        var child;
        if (isObject(value)) {
          this.element(value);
        }
        child = new XMLText2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.cdata = function(value) {
        var child;
        child = new XMLCData2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.comment = function(value) {
        var child;
        child = new XMLComment2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.commentBefore = function(value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        this.parent.comment(value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.commentAfter = function(value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        this.parent.comment(value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.raw = function(value) {
        var child;
        child = new XMLRaw2(this, value);
        this.children.push(child);
        return this;
      };
      XMLNode2.prototype.dummy = function() {
        var child;
        child = new XMLDummy2(this);
        return child;
      };
      XMLNode2.prototype.instruction = function(target, value) {
        var insTarget, insValue, instruction, j, len;
        if (target != null) {
          target = getValue(target);
        }
        if (value != null) {
          value = getValue(value);
        }
        if (Array.isArray(target)) {
          for (j = 0, len = target.length; j < len; j++) {
            insTarget = target[j];
            this.instruction(insTarget);
          }
        } else if (isObject(target)) {
          for (insTarget in target) {
            if (!hasProp.call(target, insTarget))
              continue;
            insValue = target[insTarget];
            this.instruction(insTarget, insValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          instruction = new XMLProcessingInstruction2(this, target, value);
          this.children.push(instruction);
        }
        return this;
      };
      XMLNode2.prototype.instructionBefore = function(target, value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        this.parent.instruction(target, value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.instructionAfter = function(target, value) {
        var i, removed;
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i + 1);
        this.parent.instruction(target, value);
        Array.prototype.push.apply(this.parent.children, removed);
        return this;
      };
      XMLNode2.prototype.declaration = function(version, encoding, standalone) {
        var doc, xmldec;
        doc = this.document();
        xmldec = new XMLDeclaration2(doc, version, encoding, standalone);
        if (doc.children.length === 0) {
          doc.children.unshift(xmldec);
        } else if (doc.children[0].type === NodeType2.Declaration) {
          doc.children[0] = xmldec;
        } else {
          doc.children.unshift(xmldec);
        }
        return doc.root() || doc;
      };
      XMLNode2.prototype.dtd = function(pubID, sysID) {
        var child, doc, doctype, i, j, k, len, len1, ref2, ref3;
        doc = this.document();
        doctype = new XMLDocType2(doc, pubID, sysID);
        ref2 = doc.children;
        for (i = j = 0, len = ref2.length; j < len; i = ++j) {
          child = ref2[i];
          if (child.type === NodeType2.DocType) {
            doc.children[i] = doctype;
            return doctype;
          }
        }
        ref3 = doc.children;
        for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
          child = ref3[i];
          if (child.isRoot) {
            doc.children.splice(i, 0, doctype);
            return doctype;
          }
        }
        doc.children.push(doctype);
        return doctype;
      };
      XMLNode2.prototype.up = function() {
        if (this.isRoot) {
          throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
        }
        return this.parent;
      };
      XMLNode2.prototype.root = function() {
        var node;
        node = this;
        while (node) {
          if (node.type === NodeType2.Document) {
            return node.rootObject;
          } else if (node.isRoot) {
            return node;
          } else {
            node = node.parent;
          }
        }
      };
      XMLNode2.prototype.document = function() {
        var node;
        node = this;
        while (node) {
          if (node.type === NodeType2.Document) {
            return node;
          } else {
            node = node.parent;
          }
        }
      };
      XMLNode2.prototype.end = function(options) {
        return this.document().end(options);
      };
      XMLNode2.prototype.prev = function() {
        var i;
        i = this.parent.children.indexOf(this);
        if (i < 1) {
          throw new Error("Already at the first node. " + this.debugInfo());
        }
        return this.parent.children[i - 1];
      };
      XMLNode2.prototype.next = function() {
        var i;
        i = this.parent.children.indexOf(this);
        if (i === -1 || i === this.parent.children.length - 1) {
          throw new Error("Already at the last node. " + this.debugInfo());
        }
        return this.parent.children[i + 1];
      };
      XMLNode2.prototype.importDocument = function(doc) {
        var clonedRoot;
        clonedRoot = doc.root().clone();
        clonedRoot.parent = this;
        clonedRoot.isRoot = false;
        this.children.push(clonedRoot);
        return this;
      };
      XMLNode2.prototype.debugInfo = function(name) {
        var ref2, ref3;
        name = name || this.name;
        if (name == null && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
          return "";
        } else if (name == null) {
          return "parent: <" + this.parent.name + ">";
        } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
          return "node: <" + name + ">";
        } else {
          return "node: <" + name + ">, parent: <" + this.parent.name + ">";
        }
      };
      XMLNode2.prototype.ele = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLNode2.prototype.nod = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLNode2.prototype.txt = function(value) {
        return this.text(value);
      };
      XMLNode2.prototype.dat = function(value) {
        return this.cdata(value);
      };
      XMLNode2.prototype.com = function(value) {
        return this.comment(value);
      };
      XMLNode2.prototype.ins = function(target, value) {
        return this.instruction(target, value);
      };
      XMLNode2.prototype.doc = function() {
        return this.document();
      };
      XMLNode2.prototype.dec = function(version, encoding, standalone) {
        return this.declaration(version, encoding, standalone);
      };
      XMLNode2.prototype.e = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLNode2.prototype.n = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLNode2.prototype.t = function(value) {
        return this.text(value);
      };
      XMLNode2.prototype.d = function(value) {
        return this.cdata(value);
      };
      XMLNode2.prototype.c = function(value) {
        return this.comment(value);
      };
      XMLNode2.prototype.r = function(value) {
        return this.raw(value);
      };
      XMLNode2.prototype.i = function(target, value) {
        return this.instruction(target, value);
      };
      XMLNode2.prototype.u = function() {
        return this.up();
      };
      XMLNode2.prototype.importXMLBuilder = function(doc) {
        return this.importDocument(doc);
      };
      XMLNode2.prototype.replaceChild = function(newChild, oldChild) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.removeChild = function(oldChild) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.appendChild = function(newChild) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.hasChildNodes = function() {
        return this.children.length !== 0;
      };
      XMLNode2.prototype.cloneNode = function(deep) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.normalize = function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.isSupported = function(feature, version) {
        return true;
      };
      XMLNode2.prototype.hasAttributes = function() {
        return this.attribs.length !== 0;
      };
      XMLNode2.prototype.compareDocumentPosition = function(other) {
        var ref, res;
        ref = this;
        if (ref === other) {
          return 0;
        } else if (this.document() !== other.document()) {
          res = DocumentPosition2.Disconnected | DocumentPosition2.ImplementationSpecific;
          if (Math.random() < 0.5) {
            res |= DocumentPosition2.Preceding;
          } else {
            res |= DocumentPosition2.Following;
          }
          return res;
        } else if (ref.isAncestor(other)) {
          return DocumentPosition2.Contains | DocumentPosition2.Preceding;
        } else if (ref.isDescendant(other)) {
          return DocumentPosition2.Contains | DocumentPosition2.Following;
        } else if (ref.isPreceding(other)) {
          return DocumentPosition2.Preceding;
        } else {
          return DocumentPosition2.Following;
        }
      };
      XMLNode2.prototype.isSameNode = function(other) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.lookupPrefix = function(namespaceURI) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.isDefaultNamespace = function(namespaceURI) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.lookupNamespaceURI = function(prefix) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.isEqualNode = function(node) {
        var i, j, ref2;
        if (node.nodeType !== this.nodeType) {
          return false;
        }
        if (node.children.length !== this.children.length) {
          return false;
        }
        for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
          if (!this.children[i].isEqualNode(node.children[i])) {
            return false;
          }
        }
        return true;
      };
      XMLNode2.prototype.getFeature = function(feature, version) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.setUserData = function(key, data, handler) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.getUserData = function(key) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLNode2.prototype.contains = function(other) {
        if (!other) {
          return false;
        }
        return other === this || this.isDescendant(other);
      };
      XMLNode2.prototype.isDescendant = function(node) {
        var child, isDescendantChild, j, len, ref2;
        ref2 = this.children;
        for (j = 0, len = ref2.length; j < len; j++) {
          child = ref2[j];
          if (node === child) {
            return true;
          }
          isDescendantChild = child.isDescendant(node);
          if (isDescendantChild) {
            return true;
          }
        }
        return false;
      };
      XMLNode2.prototype.isAncestor = function(node) {
        return node.isDescendant(this);
      };
      XMLNode2.prototype.isPreceding = function(node) {
        var nodePos, thisPos;
        nodePos = this.treePosition(node);
        thisPos = this.treePosition(this);
        if (nodePos === -1 || thisPos === -1) {
          return false;
        } else {
          return nodePos < thisPos;
        }
      };
      XMLNode2.prototype.isFollowing = function(node) {
        var nodePos, thisPos;
        nodePos = this.treePosition(node);
        thisPos = this.treePosition(this);
        if (nodePos === -1 || thisPos === -1) {
          return false;
        } else {
          return nodePos > thisPos;
        }
      };
      XMLNode2.prototype.treePosition = function(node) {
        var found, pos;
        pos = 0;
        found = false;
        this.foreachTreeNode(this.document(), function(childNode) {
          pos++;
          if (!found && childNode === node) {
            return found = true;
          }
        });
        if (found) {
          return pos;
        } else {
          return -1;
        }
      };
      XMLNode2.prototype.foreachTreeNode = function(node, func) {
        var child, j, len, ref2, res;
        node || (node = this.document());
        ref2 = node.children;
        for (j = 0, len = ref2.length; j < len; j++) {
          child = ref2[j];
          if (res = func(child)) {
            return res;
          } else {
            res = this.foreachTreeNode(child, func);
            if (res) {
              return res;
            }
          }
        }
      };
      return XMLNode2;
    }();
  }).call(commonjsGlobal);
  return XMLNode.exports;
}
var XMLStringifier = { exports: {} };
var hasRequiredXMLStringifier;
function requireXMLStringifier() {
  if (hasRequiredXMLStringifier)
    return XMLStringifier.exports;
  hasRequiredXMLStringifier = 1;
  (function() {
    var bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    }, hasProp = {}.hasOwnProperty;
    XMLStringifier.exports = function() {
      function XMLStringifier2(options) {
        this.assertLegalName = bind(this.assertLegalName, this);
        this.assertLegalChar = bind(this.assertLegalChar, this);
        var key, ref, value;
        options || (options = {});
        this.options = options;
        if (!this.options.version) {
          this.options.version = "1.0";
        }
        ref = options.stringify || {};
        for (key in ref) {
          if (!hasProp.call(ref, key))
            continue;
          value = ref[key];
          this[key] = value;
        }
      }
      XMLStringifier2.prototype.name = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalName("" + val || "");
      };
      XMLStringifier2.prototype.text = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar(this.textEscape("" + val || ""));
      };
      XMLStringifier2.prototype.cdata = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        val = val.replace("]]>", "]]]]><![CDATA[>");
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.comment = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        if (val.match(/--/)) {
          throw new Error("Comment text cannot contain double-hypen: " + val);
        }
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.raw = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return "" + val || "";
      };
      XMLStringifier2.prototype.attValue = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar(this.attEscape(val = "" + val || ""));
      };
      XMLStringifier2.prototype.insTarget = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.insValue = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        if (val.match(/\?>/)) {
          throw new Error("Invalid processing instruction value: " + val);
        }
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.xmlVersion = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        if (!val.match(/1\.[0-9]+/)) {
          throw new Error("Invalid version number: " + val);
        }
        return val;
      };
      XMLStringifier2.prototype.xmlEncoding = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        val = "" + val || "";
        if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
          throw new Error("Invalid encoding: " + val);
        }
        return this.assertLegalChar(val);
      };
      XMLStringifier2.prototype.xmlStandalone = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        if (val) {
          return "yes";
        } else {
          return "no";
        }
      };
      XMLStringifier2.prototype.dtdPubID = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdSysID = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdElementValue = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdAttType = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdAttDefault = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdEntityValue = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.dtdNData = function(val) {
        if (this.options.noValidation) {
          return val;
        }
        return this.assertLegalChar("" + val || "");
      };
      XMLStringifier2.prototype.convertAttKey = "@";
      XMLStringifier2.prototype.convertPIKey = "?";
      XMLStringifier2.prototype.convertTextKey = "#text";
      XMLStringifier2.prototype.convertCDataKey = "#cdata";
      XMLStringifier2.prototype.convertCommentKey = "#comment";
      XMLStringifier2.prototype.convertRawKey = "#raw";
      XMLStringifier2.prototype.assertLegalChar = function(str) {
        var regex, res;
        if (this.options.noValidation) {
          return str;
        }
        regex = "";
        if (this.options.version === "1.0") {
          regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
          if (res = str.match(regex)) {
            throw new Error("Invalid character in string: " + str + " at index " + res.index);
          }
        } else if (this.options.version === "1.1") {
          regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
          if (res = str.match(regex)) {
            throw new Error("Invalid character in string: " + str + " at index " + res.index);
          }
        }
        return str;
      };
      XMLStringifier2.prototype.assertLegalName = function(str) {
        var regex;
        if (this.options.noValidation) {
          return str;
        }
        this.assertLegalChar(str);
        regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
        if (!str.match(regex)) {
          throw new Error("Invalid character in name");
        }
        return str;
      };
      XMLStringifier2.prototype.textEscape = function(str) {
        var ampregex;
        if (this.options.noValidation) {
          return str;
        }
        ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
        return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
      };
      XMLStringifier2.prototype.attEscape = function(str) {
        var ampregex;
        if (this.options.noValidation) {
          return str;
        }
        ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
        return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
      };
      return XMLStringifier2;
    }();
  }).call(commonjsGlobal);
  return XMLStringifier.exports;
}
var XMLStringWriter = { exports: {} };
var XMLWriterBase = { exports: {} };
var WriterState = { exports: {} };
var hasRequiredWriterState;
function requireWriterState() {
  if (hasRequiredWriterState)
    return WriterState.exports;
  hasRequiredWriterState = 1;
  (function() {
    WriterState.exports = {
      None: 0,
      OpenTag: 1,
      InsideTag: 2,
      CloseTag: 3
    };
  }).call(commonjsGlobal);
  return WriterState.exports;
}
var hasRequiredXMLWriterBase;
function requireXMLWriterBase() {
  if (hasRequiredXMLWriterBase)
    return XMLWriterBase.exports;
  hasRequiredXMLWriterBase = 1;
  (function() {
    var NodeType2, WriterState2, assign, hasProp = {}.hasOwnProperty;
    assign = requireUtility().assign;
    NodeType2 = requireNodeType();
    requireXMLDeclaration();
    requireXMLDocType();
    requireXMLCData();
    requireXMLComment();
    requireXMLElement();
    requireXMLRaw();
    requireXMLText();
    requireXMLProcessingInstruction();
    requireXMLDummy();
    requireXMLDTDAttList();
    requireXMLDTDElement();
    requireXMLDTDEntity();
    requireXMLDTDNotation();
    WriterState2 = requireWriterState();
    XMLWriterBase.exports = function() {
      function XMLWriterBase2(options) {
        var key, ref, value;
        options || (options = {});
        this.options = options;
        ref = options.writer || {};
        for (key in ref) {
          if (!hasProp.call(ref, key))
            continue;
          value = ref[key];
          this["_" + key] = this[key];
          this[key] = value;
        }
      }
      XMLWriterBase2.prototype.filterOptions = function(options) {
        var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
        options || (options = {});
        options = assign({}, this.options, options);
        filteredOptions = {
          writer: this
        };
        filteredOptions.pretty = options.pretty || false;
        filteredOptions.allowEmpty = options.allowEmpty || false;
        filteredOptions.indent = (ref = options.indent) != null ? ref : "  ";
        filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : "\n";
        filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
        filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
        filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : "";
        if (filteredOptions.spaceBeforeSlash === true) {
          filteredOptions.spaceBeforeSlash = " ";
        }
        filteredOptions.suppressPrettyCount = 0;
        filteredOptions.user = {};
        filteredOptions.state = WriterState2.None;
        return filteredOptions;
      };
      XMLWriterBase2.prototype.indent = function(node, options, level) {
        var indentLevel;
        if (!options.pretty || options.suppressPrettyCount) {
          return "";
        } else if (options.pretty) {
          indentLevel = (level || 0) + options.offset + 1;
          if (indentLevel > 0) {
            return new Array(indentLevel).join(options.indent);
          }
        }
        return "";
      };
      XMLWriterBase2.prototype.endline = function(node, options, level) {
        if (!options.pretty || options.suppressPrettyCount) {
          return "";
        } else {
          return options.newline;
        }
      };
      XMLWriterBase2.prototype.attribute = function(att, options, level) {
        var r;
        this.openAttribute(att, options, level);
        r = " " + att.name + '="' + att.value + '"';
        this.closeAttribute(att, options, level);
        return r;
      };
      XMLWriterBase2.prototype.cdata = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<![CDATA[";
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += "]]>" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.comment = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!-- ";
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += " -->" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.declaration = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<?xml";
        options.state = WriterState2.InsideTag;
        r += ' version="' + node.version + '"';
        if (node.encoding != null) {
          r += ' encoding="' + node.encoding + '"';
        }
        if (node.standalone != null) {
          r += ' standalone="' + node.standalone + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + "?>";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.docType = function(node, options, level) {
        var child, i, len, r, ref;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        r += "<!DOCTYPE " + node.root().name;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.children.length > 0) {
          r += " [";
          r += this.endline(node, options, level);
          options.state = WriterState2.InsideTag;
          ref = node.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            r += this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          r += "]";
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.element = function(node, options, level) {
        var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
        level || (level = 0);
        prettySuppressed = false;
        r = "";
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r += this.indent(node, options, level) + "<" + node.name;
        ref = node.attribs;
        for (name in ref) {
          if (!hasProp.call(ref, name))
            continue;
          att = ref[name];
          r += this.attribute(att, options, level);
        }
        childNodeCount = node.children.length;
        firstChildNode = childNodeCount === 0 ? null : node.children[0];
        if (childNodeCount === 0 || node.children.every(function(e) {
          return (e.type === NodeType2.Text || e.type === NodeType2.Raw) && e.value === "";
        })) {
          if (options.allowEmpty) {
            r += ">";
            options.state = WriterState2.CloseTag;
            r += "</" + node.name + ">" + this.endline(node, options, level);
          } else {
            options.state = WriterState2.CloseTag;
            r += options.spaceBeforeSlash + "/>" + this.endline(node, options, level);
          }
        } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType2.Text || firstChildNode.type === NodeType2.Raw) && firstChildNode.value != null) {
          r += ">";
          options.state = WriterState2.InsideTag;
          options.suppressPrettyCount++;
          prettySuppressed = true;
          r += this.writeChildNode(firstChildNode, options, level + 1);
          options.suppressPrettyCount--;
          prettySuppressed = false;
          options.state = WriterState2.CloseTag;
          r += "</" + node.name + ">" + this.endline(node, options, level);
        } else {
          if (options.dontPrettyTextNodes) {
            ref1 = node.children;
            for (i = 0, len = ref1.length; i < len; i++) {
              child = ref1[i];
              if ((child.type === NodeType2.Text || child.type === NodeType2.Raw) && child.value != null) {
                options.suppressPrettyCount++;
                prettySuppressed = true;
                break;
              }
            }
          }
          r += ">" + this.endline(node, options, level);
          options.state = WriterState2.InsideTag;
          ref2 = node.children;
          for (j = 0, len1 = ref2.length; j < len1; j++) {
            child = ref2[j];
            r += this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          r += this.indent(node, options, level) + "</" + node.name + ">";
          if (prettySuppressed) {
            options.suppressPrettyCount--;
          }
          r += this.endline(node, options, level);
          options.state = WriterState2.None;
        }
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.writeChildNode = function(node, options, level) {
        switch (node.type) {
          case NodeType2.CData:
            return this.cdata(node, options, level);
          case NodeType2.Comment:
            return this.comment(node, options, level);
          case NodeType2.Element:
            return this.element(node, options, level);
          case NodeType2.Raw:
            return this.raw(node, options, level);
          case NodeType2.Text:
            return this.text(node, options, level);
          case NodeType2.ProcessingInstruction:
            return this.processingInstruction(node, options, level);
          case NodeType2.Dummy:
            return "";
          case NodeType2.Declaration:
            return this.declaration(node, options, level);
          case NodeType2.DocType:
            return this.docType(node, options, level);
          case NodeType2.AttributeDeclaration:
            return this.dtdAttList(node, options, level);
          case NodeType2.ElementDeclaration:
            return this.dtdElement(node, options, level);
          case NodeType2.EntityDeclaration:
            return this.dtdEntity(node, options, level);
          case NodeType2.NotationDeclaration:
            return this.dtdNotation(node, options, level);
          default:
            throw new Error("Unknown XML node type: " + node.constructor.name);
        }
      };
      XMLWriterBase2.prototype.processingInstruction = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<?";
        options.state = WriterState2.InsideTag;
        r += node.target;
        if (node.value) {
          r += " " + node.value;
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + "?>";
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.raw = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.text = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level);
        options.state = WriterState2.InsideTag;
        r += node.value;
        options.state = WriterState2.CloseTag;
        r += this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.dtdAttList = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ATTLIST";
        options.state = WriterState2.InsideTag;
        r += " " + node.elementName + " " + node.attributeName + " " + node.attributeType;
        if (node.defaultValueType !== "#DEFAULT") {
          r += " " + node.defaultValueType;
        }
        if (node.defaultValue) {
          r += ' "' + node.defaultValue + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.dtdElement = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ELEMENT";
        options.state = WriterState2.InsideTag;
        r += " " + node.name + " " + node.value;
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.dtdEntity = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!ENTITY";
        options.state = WriterState2.InsideTag;
        if (node.pe) {
          r += " %";
        }
        r += " " + node.name;
        if (node.value) {
          r += ' "' + node.value + '"';
        } else {
          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }
          if (node.nData) {
            r += " NDATA " + node.nData;
          }
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.dtdNotation = function(node, options, level) {
        var r;
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        r = this.indent(node, options, level) + "<!NOTATION";
        options.state = WriterState2.InsideTag;
        r += " " + node.name;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.pubID) {
          r += ' PUBLIC "' + node.pubID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        options.state = WriterState2.CloseTag;
        r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
        options.state = WriterState2.None;
        this.closeNode(node, options, level);
        return r;
      };
      XMLWriterBase2.prototype.openNode = function(node, options, level) {
      };
      XMLWriterBase2.prototype.closeNode = function(node, options, level) {
      };
      XMLWriterBase2.prototype.openAttribute = function(att, options, level) {
      };
      XMLWriterBase2.prototype.closeAttribute = function(att, options, level) {
      };
      return XMLWriterBase2;
    }();
  }).call(commonjsGlobal);
  return XMLWriterBase.exports;
}
var hasRequiredXMLStringWriter;
function requireXMLStringWriter() {
  if (hasRequiredXMLStringWriter)
    return XMLStringWriter.exports;
  hasRequiredXMLStringWriter = 1;
  (function() {
    var XMLWriterBase2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    XMLWriterBase2 = requireXMLWriterBase();
    XMLStringWriter.exports = function(superClass) {
      extend(XMLStringWriter2, superClass);
      function XMLStringWriter2(options) {
        XMLStringWriter2.__super__.constructor.call(this, options);
      }
      XMLStringWriter2.prototype.document = function(doc, options) {
        var child, i, len, r, ref;
        options = this.filterOptions(options);
        r = "";
        ref = doc.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          r += this.writeChildNode(child, options, 0);
        }
        if (options.pretty && r.slice(-options.newline.length) === options.newline) {
          r = r.slice(0, -options.newline.length);
        }
        return r;
      };
      return XMLStringWriter2;
    }(XMLWriterBase2);
  }).call(commonjsGlobal);
  return XMLStringWriter.exports;
}
var hasRequiredXMLDocument;
function requireXMLDocument() {
  if (hasRequiredXMLDocument)
    return XMLDocument.exports;
  hasRequiredXMLDocument = 1;
  (function() {
    var NodeType2, XMLDOMConfiguration2, XMLDOMImplementation2, XMLNode2, XMLStringWriter2, XMLStringifier2, isPlainObject, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    isPlainObject = requireUtility().isPlainObject;
    XMLDOMImplementation2 = requireXMLDOMImplementation();
    XMLDOMConfiguration2 = requireXMLDOMConfiguration();
    XMLNode2 = requireXMLNode();
    NodeType2 = requireNodeType();
    XMLStringifier2 = requireXMLStringifier();
    XMLStringWriter2 = requireXMLStringWriter();
    XMLDocument.exports = function(superClass) {
      extend(XMLDocument2, superClass);
      function XMLDocument2(options) {
        XMLDocument2.__super__.constructor.call(this, null);
        this.name = "#document";
        this.type = NodeType2.Document;
        this.documentURI = null;
        this.domConfig = new XMLDOMConfiguration2();
        options || (options = {});
        if (!options.writer) {
          options.writer = new XMLStringWriter2();
        }
        this.options = options;
        this.stringify = new XMLStringifier2(options);
      }
      Object.defineProperty(XMLDocument2.prototype, "implementation", {
        value: new XMLDOMImplementation2()
      });
      Object.defineProperty(XMLDocument2.prototype, "doctype", {
        get: function() {
          var child, i, len, ref;
          ref = this.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            if (child.type === NodeType2.DocType) {
              return child;
            }
          }
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "documentElement", {
        get: function() {
          return this.rootObject || null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "inputEncoding", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "strictErrorChecking", {
        get: function() {
          return false;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlEncoding", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].encoding;
          } else {
            return null;
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlStandalone", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].standalone === "yes";
          } else {
            return false;
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "xmlVersion", {
        get: function() {
          if (this.children.length !== 0 && this.children[0].type === NodeType2.Declaration) {
            return this.children[0].version;
          } else {
            return "1.0";
          }
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "URL", {
        get: function() {
          return this.documentURI;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "origin", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "compatMode", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "characterSet", {
        get: function() {
          return null;
        }
      });
      Object.defineProperty(XMLDocument2.prototype, "contentType", {
        get: function() {
          return null;
        }
      });
      XMLDocument2.prototype.end = function(writer) {
        var writerOptions;
        writerOptions = {};
        if (!writer) {
          writer = this.options.writer;
        } else if (isPlainObject(writer)) {
          writerOptions = writer;
          writer = this.options.writer;
        }
        return writer.document(this, writer.filterOptions(writerOptions));
      };
      XMLDocument2.prototype.toString = function(options) {
        return this.options.writer.document(this, this.options.writer.filterOptions(options));
      };
      XMLDocument2.prototype.createElement = function(tagName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createDocumentFragment = function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createTextNode = function(data) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createComment = function(data) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createCDATASection = function(data) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createProcessingInstruction = function(target, data) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createAttribute = function(name) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createEntityReference = function(name) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.getElementsByTagName = function(tagname) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.importNode = function(importedNode, deep) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createElementNS = function(namespaceURI, qualifiedName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.getElementById = function(elementId) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.adoptNode = function(source) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.normalizeDocument = function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.getElementsByClassName = function(classNames) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createEvent = function(eventInterface) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createRange = function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createNodeIterator = function(root, whatToShow, filter) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      XMLDocument2.prototype.createTreeWalker = function(root, whatToShow, filter) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      };
      return XMLDocument2;
    }(XMLNode2);
  }).call(commonjsGlobal);
  return XMLDocument.exports;
}
var XMLDocumentCB = { exports: {} };
var hasRequiredXMLDocumentCB;
function requireXMLDocumentCB() {
  if (hasRequiredXMLDocumentCB)
    return XMLDocumentCB.exports;
  hasRequiredXMLDocumentCB = 1;
  (function() {
    var NodeType2, WriterState2, XMLAttribute2, XMLCData2, XMLComment2, XMLDTDAttList2, XMLDTDElement2, XMLDTDEntity2, XMLDTDNotation2, XMLDeclaration2, XMLDocType2, XMLDocument2, XMLElement2, XMLProcessingInstruction2, XMLRaw2, XMLStringWriter2, XMLStringifier2, XMLText2, getValue, isFunction, isObject, isPlainObject, ref, hasProp = {}.hasOwnProperty;
    ref = requireUtility(), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;
    NodeType2 = requireNodeType();
    XMLDocument2 = requireXMLDocument();
    XMLElement2 = requireXMLElement();
    XMLCData2 = requireXMLCData();
    XMLComment2 = requireXMLComment();
    XMLRaw2 = requireXMLRaw();
    XMLText2 = requireXMLText();
    XMLProcessingInstruction2 = requireXMLProcessingInstruction();
    XMLDeclaration2 = requireXMLDeclaration();
    XMLDocType2 = requireXMLDocType();
    XMLDTDAttList2 = requireXMLDTDAttList();
    XMLDTDEntity2 = requireXMLDTDEntity();
    XMLDTDElement2 = requireXMLDTDElement();
    XMLDTDNotation2 = requireXMLDTDNotation();
    XMLAttribute2 = requireXMLAttribute();
    XMLStringifier2 = requireXMLStringifier();
    XMLStringWriter2 = requireXMLStringWriter();
    WriterState2 = requireWriterState();
    XMLDocumentCB.exports = function() {
      function XMLDocumentCB2(options, onData, onEnd) {
        var writerOptions;
        this.name = "?xml";
        this.type = NodeType2.Document;
        options || (options = {});
        writerOptions = {};
        if (!options.writer) {
          options.writer = new XMLStringWriter2();
        } else if (isPlainObject(options.writer)) {
          writerOptions = options.writer;
          options.writer = new XMLStringWriter2();
        }
        this.options = options;
        this.writer = options.writer;
        this.writerOptions = this.writer.filterOptions(writerOptions);
        this.stringify = new XMLStringifier2(options);
        this.onDataCallback = onData || function() {
        };
        this.onEndCallback = onEnd || function() {
        };
        this.currentNode = null;
        this.currentLevel = -1;
        this.openTags = {};
        this.documentStarted = false;
        this.documentCompleted = false;
        this.root = null;
      }
      XMLDocumentCB2.prototype.createChildNode = function(node) {
        var att, attName, attributes, child, i, len, ref1, ref2;
        switch (node.type) {
          case NodeType2.CData:
            this.cdata(node.value);
            break;
          case NodeType2.Comment:
            this.comment(node.value);
            break;
          case NodeType2.Element:
            attributes = {};
            ref1 = node.attribs;
            for (attName in ref1) {
              if (!hasProp.call(ref1, attName))
                continue;
              att = ref1[attName];
              attributes[attName] = att.value;
            }
            this.node(node.name, attributes);
            break;
          case NodeType2.Dummy:
            this.dummy();
            break;
          case NodeType2.Raw:
            this.raw(node.value);
            break;
          case NodeType2.Text:
            this.text(node.value);
            break;
          case NodeType2.ProcessingInstruction:
            this.instruction(node.target, node.value);
            break;
          default:
            throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
        }
        ref2 = node.children;
        for (i = 0, len = ref2.length; i < len; i++) {
          child = ref2[i];
          this.createChildNode(child);
          if (child.type === NodeType2.Element) {
            this.up();
          }
        }
        return this;
      };
      XMLDocumentCB2.prototype.dummy = function() {
        return this;
      };
      XMLDocumentCB2.prototype.node = function(name, attributes, text) {
        var ref1;
        if (name == null) {
          throw new Error("Missing node name.");
        }
        if (this.root && this.currentLevel === -1) {
          throw new Error("Document can only have one root node. " + this.debugInfo(name));
        }
        this.openCurrent();
        name = getValue(name);
        if (attributes == null) {
          attributes = {};
        }
        attributes = getValue(attributes);
        if (!isObject(attributes)) {
          ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
        }
        this.currentNode = new XMLElement2(this, name, attributes);
        this.currentNode.children = false;
        this.currentLevel++;
        this.openTags[this.currentLevel] = this.currentNode;
        if (text != null) {
          this.text(text);
        }
        return this;
      };
      XMLDocumentCB2.prototype.element = function(name, attributes, text) {
        var child, i, len, oldValidationFlag, ref1, root;
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          this.dtdElement.apply(this, arguments);
        } else {
          if (Array.isArray(name) || isObject(name) || isFunction(name)) {
            oldValidationFlag = this.options.noValidation;
            this.options.noValidation = true;
            root = new XMLDocument2(this.options).element("TEMP_ROOT");
            root.element(name);
            this.options.noValidation = oldValidationFlag;
            ref1 = root.children;
            for (i = 0, len = ref1.length; i < len; i++) {
              child = ref1[i];
              this.createChildNode(child);
              if (child.type === NodeType2.Element) {
                this.up();
              }
            }
          } else {
            this.node(name, attributes, text);
          }
        }
        return this;
      };
      XMLDocumentCB2.prototype.attribute = function(name, value) {
        var attName, attValue;
        if (!this.currentNode || this.currentNode.children) {
          throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
        }
        if (name != null) {
          name = getValue(name);
        }
        if (isObject(name)) {
          for (attName in name) {
            if (!hasProp.call(name, attName))
              continue;
            attValue = name[attName];
            this.attribute(attName, attValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          if (this.options.keepNullAttributes && value == null) {
            this.currentNode.attribs[name] = new XMLAttribute2(this, name, "");
          } else if (value != null) {
            this.currentNode.attribs[name] = new XMLAttribute2(this, name, value);
          }
        }
        return this;
      };
      XMLDocumentCB2.prototype.text = function(value) {
        var node;
        this.openCurrent();
        node = new XMLText2(this, value);
        this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.cdata = function(value) {
        var node;
        this.openCurrent();
        node = new XMLCData2(this, value);
        this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.comment = function(value) {
        var node;
        this.openCurrent();
        node = new XMLComment2(this, value);
        this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.raw = function(value) {
        var node;
        this.openCurrent();
        node = new XMLRaw2(this, value);
        this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.instruction = function(target, value) {
        var i, insTarget, insValue, len, node;
        this.openCurrent();
        if (target != null) {
          target = getValue(target);
        }
        if (value != null) {
          value = getValue(value);
        }
        if (Array.isArray(target)) {
          for (i = 0, len = target.length; i < len; i++) {
            insTarget = target[i];
            this.instruction(insTarget);
          }
        } else if (isObject(target)) {
          for (insTarget in target) {
            if (!hasProp.call(target, insTarget))
              continue;
            insValue = target[insTarget];
            this.instruction(insTarget, insValue);
          }
        } else {
          if (isFunction(value)) {
            value = value.apply();
          }
          node = new XMLProcessingInstruction2(this, target, value);
          this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        }
        return this;
      };
      XMLDocumentCB2.prototype.declaration = function(version, encoding, standalone) {
        var node;
        this.openCurrent();
        if (this.documentStarted) {
          throw new Error("declaration() must be the first node.");
        }
        node = new XMLDeclaration2(this, version, encoding, standalone);
        this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.doctype = function(root, pubID, sysID) {
        this.openCurrent();
        if (root == null) {
          throw new Error("Missing root node name.");
        }
        if (this.root) {
          throw new Error("dtd() must come before the root node.");
        }
        this.currentNode = new XMLDocType2(this, pubID, sysID);
        this.currentNode.rootNodeName = root;
        this.currentNode.children = false;
        this.currentLevel++;
        this.openTags[this.currentLevel] = this.currentNode;
        return this;
      };
      XMLDocumentCB2.prototype.dtdElement = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDElement2(this, name, value);
        this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
        var node;
        this.openCurrent();
        node = new XMLDTDAttList2(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
        this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.entity = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDEntity2(this, false, name, value);
        this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.pEntity = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDEntity2(this, true, name, value);
        this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.notation = function(name, value) {
        var node;
        this.openCurrent();
        node = new XMLDTDNotation2(this, name, value);
        this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
        return this;
      };
      XMLDocumentCB2.prototype.up = function() {
        if (this.currentLevel < 0) {
          throw new Error("The document node has no parent.");
        }
        if (this.currentNode) {
          if (this.currentNode.children) {
            this.closeNode(this.currentNode);
          } else {
            this.openNode(this.currentNode);
          }
          this.currentNode = null;
        } else {
          this.closeNode(this.openTags[this.currentLevel]);
        }
        delete this.openTags[this.currentLevel];
        this.currentLevel--;
        return this;
      };
      XMLDocumentCB2.prototype.end = function() {
        while (this.currentLevel >= 0) {
          this.up();
        }
        return this.onEnd();
      };
      XMLDocumentCB2.prototype.openCurrent = function() {
        if (this.currentNode) {
          this.currentNode.children = true;
          return this.openNode(this.currentNode);
        }
      };
      XMLDocumentCB2.prototype.openNode = function(node) {
        var att, chunk, name, ref1;
        if (!node.isOpen) {
          if (!this.root && this.currentLevel === 0 && node.type === NodeType2.Element) {
            this.root = node;
          }
          chunk = "";
          if (node.type === NodeType2.Element) {
            this.writerOptions.state = WriterState2.OpenTag;
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<" + node.name;
            ref1 = node.attribs;
            for (name in ref1) {
              if (!hasProp.call(ref1, name))
                continue;
              att = ref1[name];
              chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
            }
            chunk += (node.children ? ">" : "/>") + this.writer.endline(node, this.writerOptions, this.currentLevel);
            this.writerOptions.state = WriterState2.InsideTag;
          } else {
            this.writerOptions.state = WriterState2.OpenTag;
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + node.rootNodeName;
            if (node.pubID && node.sysID) {
              chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
            } else if (node.sysID) {
              chunk += ' SYSTEM "' + node.sysID + '"';
            }
            if (node.children) {
              chunk += " [";
              this.writerOptions.state = WriterState2.InsideTag;
            } else {
              this.writerOptions.state = WriterState2.CloseTag;
              chunk += ">";
            }
            chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
          }
          this.onData(chunk, this.currentLevel);
          return node.isOpen = true;
        }
      };
      XMLDocumentCB2.prototype.closeNode = function(node) {
        var chunk;
        if (!node.isClosed) {
          chunk = "";
          this.writerOptions.state = WriterState2.CloseTag;
          if (node.type === NodeType2.Element) {
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "</" + node.name + ">" + this.writer.endline(node, this.writerOptions, this.currentLevel);
          } else {
            chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(node, this.writerOptions, this.currentLevel);
          }
          this.writerOptions.state = WriterState2.None;
          this.onData(chunk, this.currentLevel);
          return node.isClosed = true;
        }
      };
      XMLDocumentCB2.prototype.onData = function(chunk, level) {
        this.documentStarted = true;
        return this.onDataCallback(chunk, level + 1);
      };
      XMLDocumentCB2.prototype.onEnd = function() {
        this.documentCompleted = true;
        return this.onEndCallback();
      };
      XMLDocumentCB2.prototype.debugInfo = function(name) {
        if (name == null) {
          return "";
        } else {
          return "node: <" + name + ">";
        }
      };
      XMLDocumentCB2.prototype.ele = function() {
        return this.element.apply(this, arguments);
      };
      XMLDocumentCB2.prototype.nod = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLDocumentCB2.prototype.txt = function(value) {
        return this.text(value);
      };
      XMLDocumentCB2.prototype.dat = function(value) {
        return this.cdata(value);
      };
      XMLDocumentCB2.prototype.com = function(value) {
        return this.comment(value);
      };
      XMLDocumentCB2.prototype.ins = function(target, value) {
        return this.instruction(target, value);
      };
      XMLDocumentCB2.prototype.dec = function(version, encoding, standalone) {
        return this.declaration(version, encoding, standalone);
      };
      XMLDocumentCB2.prototype.dtd = function(root, pubID, sysID) {
        return this.doctype(root, pubID, sysID);
      };
      XMLDocumentCB2.prototype.e = function(name, attributes, text) {
        return this.element(name, attributes, text);
      };
      XMLDocumentCB2.prototype.n = function(name, attributes, text) {
        return this.node(name, attributes, text);
      };
      XMLDocumentCB2.prototype.t = function(value) {
        return this.text(value);
      };
      XMLDocumentCB2.prototype.d = function(value) {
        return this.cdata(value);
      };
      XMLDocumentCB2.prototype.c = function(value) {
        return this.comment(value);
      };
      XMLDocumentCB2.prototype.r = function(value) {
        return this.raw(value);
      };
      XMLDocumentCB2.prototype.i = function(target, value) {
        return this.instruction(target, value);
      };
      XMLDocumentCB2.prototype.att = function() {
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          return this.attList.apply(this, arguments);
        } else {
          return this.attribute.apply(this, arguments);
        }
      };
      XMLDocumentCB2.prototype.a = function() {
        if (this.currentNode && this.currentNode.type === NodeType2.DocType) {
          return this.attList.apply(this, arguments);
        } else {
          return this.attribute.apply(this, arguments);
        }
      };
      XMLDocumentCB2.prototype.ent = function(name, value) {
        return this.entity(name, value);
      };
      XMLDocumentCB2.prototype.pent = function(name, value) {
        return this.pEntity(name, value);
      };
      XMLDocumentCB2.prototype.not = function(name, value) {
        return this.notation(name, value);
      };
      return XMLDocumentCB2;
    }();
  }).call(commonjsGlobal);
  return XMLDocumentCB.exports;
}
var XMLStreamWriter = { exports: {} };
var hasRequiredXMLStreamWriter;
function requireXMLStreamWriter() {
  if (hasRequiredXMLStreamWriter)
    return XMLStreamWriter.exports;
  hasRequiredXMLStreamWriter = 1;
  (function() {
    var NodeType2, WriterState2, XMLWriterBase2, extend = function(child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
    }, hasProp = {}.hasOwnProperty;
    NodeType2 = requireNodeType();
    XMLWriterBase2 = requireXMLWriterBase();
    WriterState2 = requireWriterState();
    XMLStreamWriter.exports = function(superClass) {
      extend(XMLStreamWriter2, superClass);
      function XMLStreamWriter2(stream, options) {
        this.stream = stream;
        XMLStreamWriter2.__super__.constructor.call(this, options);
      }
      XMLStreamWriter2.prototype.endline = function(node, options, level) {
        if (node.isLastRootNode && options.state === WriterState2.CloseTag) {
          return "";
        } else {
          return XMLStreamWriter2.__super__.endline.call(this, node, options, level);
        }
      };
      XMLStreamWriter2.prototype.document = function(doc, options) {
        var child, i, j, k, len, len1, ref, ref1, results;
        ref = doc.children;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          child = ref[i];
          child.isLastRootNode = i === doc.children.length - 1;
        }
        options = this.filterOptions(options);
        ref1 = doc.children;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          child = ref1[k];
          results.push(this.writeChildNode(child, options, 0));
        }
        return results;
      };
      XMLStreamWriter2.prototype.attribute = function(att, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.attribute.call(this, att, options, level));
      };
      XMLStreamWriter2.prototype.cdata = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.cdata.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.comment = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.comment.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.declaration = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.declaration.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.docType = function(node, options, level) {
        var child, j, len, ref;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        this.stream.write(this.indent(node, options, level));
        this.stream.write("<!DOCTYPE " + node.root().name);
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        if (node.children.length > 0) {
          this.stream.write(" [");
          this.stream.write(this.endline(node, options, level));
          options.state = WriterState2.InsideTag;
          ref = node.children;
          for (j = 0, len = ref.length; j < len; j++) {
            child = ref[j];
            this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          this.stream.write("]");
        }
        options.state = WriterState2.CloseTag;
        this.stream.write(options.spaceBeforeSlash + ">");
        this.stream.write(this.endline(node, options, level));
        options.state = WriterState2.None;
        return this.closeNode(node, options, level);
      };
      XMLStreamWriter2.prototype.element = function(node, options, level) {
        var att, child, childNodeCount, firstChildNode, j, len, name, ref, ref1;
        level || (level = 0);
        this.openNode(node, options, level);
        options.state = WriterState2.OpenTag;
        this.stream.write(this.indent(node, options, level) + "<" + node.name);
        ref = node.attribs;
        for (name in ref) {
          if (!hasProp.call(ref, name))
            continue;
          att = ref[name];
          this.attribute(att, options, level);
        }
        childNodeCount = node.children.length;
        firstChildNode = childNodeCount === 0 ? null : node.children[0];
        if (childNodeCount === 0 || node.children.every(function(e) {
          return (e.type === NodeType2.Text || e.type === NodeType2.Raw) && e.value === "";
        })) {
          if (options.allowEmpty) {
            this.stream.write(">");
            options.state = WriterState2.CloseTag;
            this.stream.write("</" + node.name + ">");
          } else {
            options.state = WriterState2.CloseTag;
            this.stream.write(options.spaceBeforeSlash + "/>");
          }
        } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType2.Text || firstChildNode.type === NodeType2.Raw) && firstChildNode.value != null) {
          this.stream.write(">");
          options.state = WriterState2.InsideTag;
          options.suppressPrettyCount++;
          this.writeChildNode(firstChildNode, options, level + 1);
          options.suppressPrettyCount--;
          options.state = WriterState2.CloseTag;
          this.stream.write("</" + node.name + ">");
        } else {
          this.stream.write(">" + this.endline(node, options, level));
          options.state = WriterState2.InsideTag;
          ref1 = node.children;
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            this.writeChildNode(child, options, level + 1);
          }
          options.state = WriterState2.CloseTag;
          this.stream.write(this.indent(node, options, level) + "</" + node.name + ">");
        }
        this.stream.write(this.endline(node, options, level));
        options.state = WriterState2.None;
        return this.closeNode(node, options, level);
      };
      XMLStreamWriter2.prototype.processingInstruction = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.processingInstruction.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.raw = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.raw.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.text = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.text.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.dtdAttList = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.dtdAttList.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.dtdElement = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.dtdElement.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.dtdEntity = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.dtdEntity.call(this, node, options, level));
      };
      XMLStreamWriter2.prototype.dtdNotation = function(node, options, level) {
        return this.stream.write(XMLStreamWriter2.__super__.dtdNotation.call(this, node, options, level));
      };
      return XMLStreamWriter2;
    }(XMLWriterBase2);
  }).call(commonjsGlobal);
  return XMLStreamWriter.exports;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib)
    return lib;
  hasRequiredLib = 1;
  (function() {
    var NodeType2, WriterState2, XMLDOMImplementation2, XMLDocument2, XMLDocumentCB2, XMLStreamWriter2, XMLStringWriter2, assign, isFunction, ref;
    ref = requireUtility(), assign = ref.assign, isFunction = ref.isFunction;
    XMLDOMImplementation2 = requireXMLDOMImplementation();
    XMLDocument2 = requireXMLDocument();
    XMLDocumentCB2 = requireXMLDocumentCB();
    XMLStringWriter2 = requireXMLStringWriter();
    XMLStreamWriter2 = requireXMLStreamWriter();
    NodeType2 = requireNodeType();
    WriterState2 = requireWriterState();
    lib.create = function(name, xmldec, doctype, options) {
      var doc, root;
      if (name == null) {
        throw new Error("Root element needs a name.");
      }
      options = assign({}, xmldec, doctype, options);
      doc = new XMLDocument2(options);
      root = doc.element(name);
      if (!options.headless) {
        doc.declaration(options);
        if (options.pubID != null || options.sysID != null) {
          doc.dtd(options);
        }
      }
      return root;
    };
    lib.begin = function(options, onData, onEnd) {
      var ref1;
      if (isFunction(options)) {
        ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
        options = {};
      }
      if (onData) {
        return new XMLDocumentCB2(options, onData, onEnd);
      } else {
        return new XMLDocument2(options);
      }
    };
    lib.stringWriter = function(options) {
      return new XMLStringWriter2(options);
    };
    lib.streamWriter = function(stream, options) {
      return new XMLStreamWriter2(stream, options);
    };
    lib.implementation = new XMLDOMImplementation2();
    lib.nodeType = NodeType2;
    lib.writerState = WriterState2;
  }).call(commonjsGlobal);
  return lib;
}
var hasRequiredBuilder;
function requireBuilder() {
  if (hasRequiredBuilder)
    return builder;
  hasRequiredBuilder = 1;
  (function() {
    var builder$1, defaults2, escapeCDATA, requiresCDATA, wrapCDATA, hasProp = {}.hasOwnProperty;
    builder$1 = requireLib();
    defaults2 = requireDefaults().defaults;
    requiresCDATA = function(entry) {
      return typeof entry === "string" && (entry.indexOf("&") >= 0 || entry.indexOf(">") >= 0 || entry.indexOf("<") >= 0);
    };
    wrapCDATA = function(entry) {
      return "<![CDATA[" + escapeCDATA(entry) + "]]>";
    };
    escapeCDATA = function(entry) {
      return entry.replace("]]>", "]]]]><![CDATA[>");
    };
    builder.Builder = function() {
      function Builder(opts) {
        var key, ref, value;
        this.options = {};
        ref = defaults2["0.2"];
        for (key in ref) {
          if (!hasProp.call(ref, key))
            continue;
          value = ref[key];
          this.options[key] = value;
        }
        for (key in opts) {
          if (!hasProp.call(opts, key))
            continue;
          value = opts[key];
          this.options[key] = value;
        }
      }
      Builder.prototype.buildObject = function(rootObj) {
        var attrkey, charkey, render, rootElement, rootName;
        attrkey = this.options.attrkey;
        charkey = this.options.charkey;
        if (Object.keys(rootObj).length === 1 && this.options.rootName === defaults2["0.2"].rootName) {
          rootName = Object.keys(rootObj)[0];
          rootObj = rootObj[rootName];
        } else {
          rootName = this.options.rootName;
        }
        render = /* @__PURE__ */ function(_this) {
          return function(element, obj) {
            var attr, child, entry, index, key, value;
            if (typeof obj !== "object") {
              if (_this.options.cdata && requiresCDATA(obj)) {
                element.raw(wrapCDATA(obj));
              } else {
                element.txt(obj);
              }
            } else if (Array.isArray(obj)) {
              for (index in obj) {
                if (!hasProp.call(obj, index))
                  continue;
                child = obj[index];
                for (key in child) {
                  entry = child[key];
                  element = render(element.ele(key), entry).up();
                }
              }
            } else {
              for (key in obj) {
                if (!hasProp.call(obj, key))
                  continue;
                child = obj[key];
                if (key === attrkey) {
                  if (typeof child === "object") {
                    for (attr in child) {
                      value = child[attr];
                      element = element.att(attr, value);
                    }
                  }
                } else if (key === charkey) {
                  if (_this.options.cdata && requiresCDATA(child)) {
                    element = element.raw(wrapCDATA(child));
                  } else {
                    element = element.txt(child);
                  }
                } else if (Array.isArray(child)) {
                  for (index in child) {
                    if (!hasProp.call(child, index))
                      continue;
                    entry = child[index];
                    if (typeof entry === "string") {
                      if (_this.options.cdata && requiresCDATA(entry)) {
                        element = element.ele(key).raw(wrapCDATA(entry)).up();
                      } else {
                        element = element.ele(key, entry).up();
                      }
                    } else {
                      element = render(element.ele(key), entry).up();
                    }
                  }
                } else if (typeof child === "object") {
                  element = render(element.ele(key), child).up();
                } else {
                  if (typeof child === "string" && _this.options.cdata && requiresCDATA(child)) {
                    element = element.ele(key).raw(wrapCDATA(child)).up();
                  } else {
                    if (child == null) {
                      child = "";
                    }
                    element = element.ele(key, child.toString()).up();
                  }
                }
              }
            }
            return element;
          };
        }(this);
        rootElement = builder$1.create(rootName, this.options.xmldec, this.options.doctype, {
          headless: this.options.headless,
          allowSurrogateChars: this.options.allowSurrogateChars
        });
        return render(rootElement, rootObj).end(this.options.renderOpts);
      };
      return Builder;
    }();
  }).call(commonjsGlobal);
  return builder;
}
var parser = {};
var sax = {};
var hasRequiredSax;
function requireSax() {
  if (hasRequiredSax)
    return sax;
  hasRequiredSax = 1;
  (function(exports) {
    (function(sax2) {
      sax2.parser = function(strict, opt) {
        return new SAXParser(strict, opt);
      };
      sax2.SAXParser = SAXParser;
      sax2.SAXStream = SAXStream;
      sax2.createStream = createStream;
      sax2.MAX_BUFFER_LENGTH = 64 * 1024;
      var buffers = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      sax2.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
          return new SAXParser(strict, opt);
        }
        var parser2 = this;
        clearBuffers(parser2);
        parser2.q = parser2.c = "";
        parser2.bufferCheckPosition = sax2.MAX_BUFFER_LENGTH;
        parser2.opt = opt || {};
        parser2.opt.lowercase = parser2.opt.lowercase || parser2.opt.lowercasetags;
        parser2.looseCase = parser2.opt.lowercase ? "toLowerCase" : "toUpperCase";
        parser2.tags = [];
        parser2.closed = parser2.closedRoot = parser2.sawRoot = false;
        parser2.tag = parser2.error = null;
        parser2.strict = !!strict;
        parser2.noscript = !!(strict || parser2.opt.noscript);
        parser2.state = S.BEGIN;
        parser2.strictEntities = parser2.opt.strictEntities;
        parser2.ENTITIES = parser2.strictEntities ? Object.create(sax2.XML_ENTITIES) : Object.create(sax2.ENTITIES);
        parser2.attribList = [];
        if (parser2.opt.xmlns) {
          parser2.ns = Object.create(rootNS);
        }
        parser2.trackPosition = parser2.opt.position !== false;
        if (parser2.trackPosition) {
          parser2.position = parser2.line = parser2.column = 0;
        }
        emit(parser2, "onready");
      }
      if (!Object.create) {
        Object.create = function(o) {
          function F() {
          }
          F.prototype = o;
          var newf = new F();
          return newf;
        };
      }
      if (!Object.keys) {
        Object.keys = function(o) {
          var a = [];
          for (var i in o)
            if (o.hasOwnProperty(i))
              a.push(i);
          return a;
        };
      }
      function checkBufferLength(parser2) {
        var maxAllowed = Math.max(sax2.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;
        for (var i = 0, l = buffers.length; i < l; i++) {
          var len = parser2[buffers[i]].length;
          if (len > maxAllowed) {
            switch (buffers[i]) {
              case "textNode":
                closeText(parser2);
                break;
              case "cdata":
                emitNode(parser2, "oncdata", parser2.cdata);
                parser2.cdata = "";
                break;
              case "script":
                emitNode(parser2, "onscript", parser2.script);
                parser2.script = "";
                break;
              default:
                error(parser2, "Max buffer length exceeded: " + buffers[i]);
            }
          }
          maxActual = Math.max(maxActual, len);
        }
        var m = sax2.MAX_BUFFER_LENGTH - maxActual;
        parser2.bufferCheckPosition = m + parser2.position;
      }
      function clearBuffers(parser2) {
        for (var i = 0, l = buffers.length; i < l; i++) {
          parser2[buffers[i]] = "";
        }
      }
      function flushBuffers(parser2) {
        closeText(parser2);
        if (parser2.cdata !== "") {
          emitNode(parser2, "oncdata", parser2.cdata);
          parser2.cdata = "";
        }
        if (parser2.script !== "") {
          emitNode(parser2, "onscript", parser2.script);
          parser2.script = "";
        }
      }
      SAXParser.prototype = {
        end: function() {
          end(this);
        },
        write,
        resume: function() {
          this.error = null;
          return this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          flushBuffers(this);
        }
      };
      var Stream;
      try {
        Stream = require("stream").Stream;
      } catch (ex) {
        Stream = function() {
        };
      }
      if (!Stream)
        Stream = function() {
        };
      var streamWraps = sax2.EVENTS.filter(function(ev) {
        return ev !== "error" && ev !== "end";
      });
      function createStream(strict, opt) {
        return new SAXStream(strict, opt);
      }
      function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
          return new SAXStream(strict, opt);
        }
        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me = this;
        this._parser.onend = function() {
          me.emit("end");
        };
        this._parser.onerror = function(er) {
          me.emit("error", er);
          me._parser.error = null;
        };
        this._decoder = null;
        streamWraps.forEach(function(ev) {
          Object.defineProperty(me, "on" + ev, {
            get: function() {
              return me._parser["on" + ev];
            },
            set: function(h) {
              if (!h) {
                me.removeAllListeners(ev);
                me._parser["on" + ev] = h;
                return h;
              }
              me.on(ev, h);
            },
            enumerable: true,
            configurable: false
          });
        });
      }
      SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
          value: SAXStream
        }
      });
      SAXStream.prototype.write = function(data) {
        if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
          if (!this._decoder) {
            var SD = require$$1.StringDecoder;
            this._decoder = new SD("utf8");
          }
          data = this._decoder.write(data);
        }
        this._parser.write(data.toString());
        this.emit("data", data);
        return true;
      };
      SAXStream.prototype.end = function(chunk) {
        if (chunk && chunk.length) {
          this.write(chunk);
        }
        this._parser.end();
        return true;
      };
      SAXStream.prototype.on = function(ev, handler) {
        var me = this;
        if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
          me._parser["on" + ev] = function() {
            var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
            args.splice(0, 0, ev);
            me.emit.apply(me, args);
          };
        }
        return Stream.prototype.on.call(me, ev, handler);
      };
      var CDATA = "[CDATA[";
      var DOCTYPE = "DOCTYPE";
      var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
      var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
      var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
      var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function isWhitespace(c) {
        return c === " " || c === "\n" || c === "\r" || c === "	";
      }
      function isQuote(c) {
        return c === '"' || c === "'";
      }
      function isAttribEnd(c) {
        return c === ">" || isWhitespace(c);
      }
      function isMatch(regex, c) {
        return regex.test(c);
      }
      function notMatch(regex, c) {
        return !isMatch(regex, c);
      }
      var S = 0;
      sax2.STATE = {
        BEGIN: S++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: S++,
        // leading whitespace
        TEXT: S++,
        // general stuff
        TEXT_ENTITY: S++,
        // &amp and such.
        OPEN_WAKA: S++,
        // <
        SGML_DECL: S++,
        // <!BLARG
        SGML_DECL_QUOTED: S++,
        // <!BLARG foo "bar
        DOCTYPE: S++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: S++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: S++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: S++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: S++,
        // <!-
        COMMENT: S++,
        // <!--
        COMMENT_ENDING: S++,
        // <!-- blah -
        COMMENT_ENDED: S++,
        // <!-- blah --
        CDATA: S++,
        // <![CDATA[ something
        CDATA_ENDING: S++,
        // ]
        CDATA_ENDING_2: S++,
        // ]]
        PROC_INST: S++,
        // <?hi
        PROC_INST_BODY: S++,
        // <?hi there
        PROC_INST_ENDING: S++,
        // <?hi "there" ?
        OPEN_TAG: S++,
        // <strong
        OPEN_TAG_SLASH: S++,
        // <strong /
        ATTRIB: S++,
        // <a
        ATTRIB_NAME: S++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: S++,
        // <a foo _
        ATTRIB_VALUE: S++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: S++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: S++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: S++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: S++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: S++,
        // <foo bar=&quot
        CLOSE_TAG: S++,
        // </a
        CLOSE_TAG_SAW_WHITE: S++,
        // </a   >
        SCRIPT: S++,
        // <script> ...
        SCRIPT_ENDING: S++
        // <script> ... <
      };
      sax2.XML_ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'"
      };
      sax2.ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'",
        "AElig": 198,
        "Aacute": 193,
        "Acirc": 194,
        "Agrave": 192,
        "Aring": 197,
        "Atilde": 195,
        "Auml": 196,
        "Ccedil": 199,
        "ETH": 208,
        "Eacute": 201,
        "Ecirc": 202,
        "Egrave": 200,
        "Euml": 203,
        "Iacute": 205,
        "Icirc": 206,
        "Igrave": 204,
        "Iuml": 207,
        "Ntilde": 209,
        "Oacute": 211,
        "Ocirc": 212,
        "Ograve": 210,
        "Oslash": 216,
        "Otilde": 213,
        "Ouml": 214,
        "THORN": 222,
        "Uacute": 218,
        "Ucirc": 219,
        "Ugrave": 217,
        "Uuml": 220,
        "Yacute": 221,
        "aacute": 225,
        "acirc": 226,
        "aelig": 230,
        "agrave": 224,
        "aring": 229,
        "atilde": 227,
        "auml": 228,
        "ccedil": 231,
        "eacute": 233,
        "ecirc": 234,
        "egrave": 232,
        "eth": 240,
        "euml": 235,
        "iacute": 237,
        "icirc": 238,
        "igrave": 236,
        "iuml": 239,
        "ntilde": 241,
        "oacute": 243,
        "ocirc": 244,
        "ograve": 242,
        "oslash": 248,
        "otilde": 245,
        "ouml": 246,
        "szlig": 223,
        "thorn": 254,
        "uacute": 250,
        "ucirc": 251,
        "ugrave": 249,
        "uuml": 252,
        "yacute": 253,
        "yuml": 255,
        "copy": 169,
        "reg": 174,
        "nbsp": 160,
        "iexcl": 161,
        "cent": 162,
        "pound": 163,
        "curren": 164,
        "yen": 165,
        "brvbar": 166,
        "sect": 167,
        "uml": 168,
        "ordf": 170,
        "laquo": 171,
        "not": 172,
        "shy": 173,
        "macr": 175,
        "deg": 176,
        "plusmn": 177,
        "sup1": 185,
        "sup2": 178,
        "sup3": 179,
        "acute": 180,
        "micro": 181,
        "para": 182,
        "middot": 183,
        "cedil": 184,
        "ordm": 186,
        "raquo": 187,
        "frac14": 188,
        "frac12": 189,
        "frac34": 190,
        "iquest": 191,
        "times": 215,
        "divide": 247,
        "OElig": 338,
        "oelig": 339,
        "Scaron": 352,
        "scaron": 353,
        "Yuml": 376,
        "fnof": 402,
        "circ": 710,
        "tilde": 732,
        "Alpha": 913,
        "Beta": 914,
        "Gamma": 915,
        "Delta": 916,
        "Epsilon": 917,
        "Zeta": 918,
        "Eta": 919,
        "Theta": 920,
        "Iota": 921,
        "Kappa": 922,
        "Lambda": 923,
        "Mu": 924,
        "Nu": 925,
        "Xi": 926,
        "Omicron": 927,
        "Pi": 928,
        "Rho": 929,
        "Sigma": 931,
        "Tau": 932,
        "Upsilon": 933,
        "Phi": 934,
        "Chi": 935,
        "Psi": 936,
        "Omega": 937,
        "alpha": 945,
        "beta": 946,
        "gamma": 947,
        "delta": 948,
        "epsilon": 949,
        "zeta": 950,
        "eta": 951,
        "theta": 952,
        "iota": 953,
        "kappa": 954,
        "lambda": 955,
        "mu": 956,
        "nu": 957,
        "xi": 958,
        "omicron": 959,
        "pi": 960,
        "rho": 961,
        "sigmaf": 962,
        "sigma": 963,
        "tau": 964,
        "upsilon": 965,
        "phi": 966,
        "chi": 967,
        "psi": 968,
        "omega": 969,
        "thetasym": 977,
        "upsih": 978,
        "piv": 982,
        "ensp": 8194,
        "emsp": 8195,
        "thinsp": 8201,
        "zwnj": 8204,
        "zwj": 8205,
        "lrm": 8206,
        "rlm": 8207,
        "ndash": 8211,
        "mdash": 8212,
        "lsquo": 8216,
        "rsquo": 8217,
        "sbquo": 8218,
        "ldquo": 8220,
        "rdquo": 8221,
        "bdquo": 8222,
        "dagger": 8224,
        "Dagger": 8225,
        "bull": 8226,
        "hellip": 8230,
        "permil": 8240,
        "prime": 8242,
        "Prime": 8243,
        "lsaquo": 8249,
        "rsaquo": 8250,
        "oline": 8254,
        "frasl": 8260,
        "euro": 8364,
        "image": 8465,
        "weierp": 8472,
        "real": 8476,
        "trade": 8482,
        "alefsym": 8501,
        "larr": 8592,
        "uarr": 8593,
        "rarr": 8594,
        "darr": 8595,
        "harr": 8596,
        "crarr": 8629,
        "lArr": 8656,
        "uArr": 8657,
        "rArr": 8658,
        "dArr": 8659,
        "hArr": 8660,
        "forall": 8704,
        "part": 8706,
        "exist": 8707,
        "empty": 8709,
        "nabla": 8711,
        "isin": 8712,
        "notin": 8713,
        "ni": 8715,
        "prod": 8719,
        "sum": 8721,
        "minus": 8722,
        "lowast": 8727,
        "radic": 8730,
        "prop": 8733,
        "infin": 8734,
        "ang": 8736,
        "and": 8743,
        "or": 8744,
        "cap": 8745,
        "cup": 8746,
        "int": 8747,
        "there4": 8756,
        "sim": 8764,
        "cong": 8773,
        "asymp": 8776,
        "ne": 8800,
        "equiv": 8801,
        "le": 8804,
        "ge": 8805,
        "sub": 8834,
        "sup": 8835,
        "nsub": 8836,
        "sube": 8838,
        "supe": 8839,
        "oplus": 8853,
        "otimes": 8855,
        "perp": 8869,
        "sdot": 8901,
        "lceil": 8968,
        "rceil": 8969,
        "lfloor": 8970,
        "rfloor": 8971,
        "lang": 9001,
        "rang": 9002,
        "loz": 9674,
        "spades": 9824,
        "clubs": 9827,
        "hearts": 9829,
        "diams": 9830
      };
      Object.keys(sax2.ENTITIES).forEach(function(key) {
        var e = sax2.ENTITIES[key];
        var s2 = typeof e === "number" ? String.fromCharCode(e) : e;
        sax2.ENTITIES[key] = s2;
      });
      for (var s in sax2.STATE) {
        sax2.STATE[sax2.STATE[s]] = s;
      }
      S = sax2.STATE;
      function emit(parser2, event, data) {
        parser2[event] && parser2[event](data);
      }
      function emitNode(parser2, nodeType, data) {
        if (parser2.textNode)
          closeText(parser2);
        emit(parser2, nodeType, data);
      }
      function closeText(parser2) {
        parser2.textNode = textopts(parser2.opt, parser2.textNode);
        if (parser2.textNode)
          emit(parser2, "ontext", parser2.textNode);
        parser2.textNode = "";
      }
      function textopts(opt, text) {
        if (opt.trim)
          text = text.trim();
        if (opt.normalize)
          text = text.replace(/\s+/g, " ");
        return text;
      }
      function error(parser2, er) {
        closeText(parser2);
        if (parser2.trackPosition) {
          er += "\nLine: " + parser2.line + "\nColumn: " + parser2.column + "\nChar: " + parser2.c;
        }
        er = new Error(er);
        parser2.error = er;
        emit(parser2, "onerror", er);
        return parser2;
      }
      function end(parser2) {
        if (parser2.sawRoot && !parser2.closedRoot)
          strictFail(parser2, "Unclosed root tag");
        if (parser2.state !== S.BEGIN && parser2.state !== S.BEGIN_WHITESPACE && parser2.state !== S.TEXT) {
          error(parser2, "Unexpected end");
        }
        closeText(parser2);
        parser2.c = "";
        parser2.closed = true;
        emit(parser2, "onend");
        SAXParser.call(parser2, parser2.strict, parser2.opt);
        return parser2;
      }
      function strictFail(parser2, message) {
        if (typeof parser2 !== "object" || !(parser2 instanceof SAXParser)) {
          throw new Error("bad call to strictFail");
        }
        if (parser2.strict) {
          error(parser2, message);
        }
      }
      function newTag(parser2) {
        if (!parser2.strict)
          parser2.tagName = parser2.tagName[parser2.looseCase]();
        var parent = parser2.tags[parser2.tags.length - 1] || parser2;
        var tag = parser2.tag = { name: parser2.tagName, attributes: {} };
        if (parser2.opt.xmlns) {
          tag.ns = parent.ns;
        }
        parser2.attribList.length = 0;
        emitNode(parser2, "onopentagstart", tag);
      }
      function qname(name, attribute) {
        var i = name.indexOf(":");
        var qualName = i < 0 ? ["", name] : name.split(":");
        var prefix = qualName[0];
        var local = qualName[1];
        if (attribute && name === "xmlns") {
          prefix = "xmlns";
          local = "";
        }
        return { prefix, local };
      }
      function attrib(parser2) {
        if (!parser2.strict) {
          parser2.attribName = parser2.attribName[parser2.looseCase]();
        }
        if (parser2.attribList.indexOf(parser2.attribName) !== -1 || parser2.tag.attributes.hasOwnProperty(parser2.attribName)) {
          parser2.attribName = parser2.attribValue = "";
          return;
        }
        if (parser2.opt.xmlns) {
          var qn = qname(parser2.attribName, true);
          var prefix = qn.prefix;
          var local = qn.local;
          if (prefix === "xmlns") {
            if (local === "xml" && parser2.attribValue !== XML_NAMESPACE) {
              strictFail(
                parser2,
                "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser2.attribValue
              );
            } else if (local === "xmlns" && parser2.attribValue !== XMLNS_NAMESPACE) {
              strictFail(
                parser2,
                "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser2.attribValue
              );
            } else {
              var tag = parser2.tag;
              var parent = parser2.tags[parser2.tags.length - 1] || parser2;
              if (tag.ns === parent.ns) {
                tag.ns = Object.create(parent.ns);
              }
              tag.ns[local] = parser2.attribValue;
            }
          }
          parser2.attribList.push([parser2.attribName, parser2.attribValue]);
        } else {
          parser2.tag.attributes[parser2.attribName] = parser2.attribValue;
          emitNode(parser2, "onattribute", {
            name: parser2.attribName,
            value: parser2.attribValue
          });
        }
        parser2.attribName = parser2.attribValue = "";
      }
      function openTag(parser2, selfClosing) {
        if (parser2.opt.xmlns) {
          var tag = parser2.tag;
          var qn = qname(parser2.tagName);
          tag.prefix = qn.prefix;
          tag.local = qn.local;
          tag.uri = tag.ns[qn.prefix] || "";
          if (tag.prefix && !tag.uri) {
            strictFail(parser2, "Unbound namespace prefix: " + JSON.stringify(parser2.tagName));
            tag.uri = qn.prefix;
          }
          var parent = parser2.tags[parser2.tags.length - 1] || parser2;
          if (tag.ns && parent.ns !== tag.ns) {
            Object.keys(tag.ns).forEach(function(p) {
              emitNode(parser2, "onopennamespace", {
                prefix: p,
                uri: tag.ns[p]
              });
            });
          }
          for (var i = 0, l = parser2.attribList.length; i < l; i++) {
            var nv = parser2.attribList[i];
            var name = nv[0];
            var value = nv[1];
            var qualName = qname(name, true);
            var prefix = qualName.prefix;
            var local = qualName.local;
            var uri = prefix === "" ? "" : tag.ns[prefix] || "";
            var a = {
              name,
              value,
              prefix,
              local,
              uri
            };
            if (prefix && prefix !== "xmlns" && !uri) {
              strictFail(parser2, "Unbound namespace prefix: " + JSON.stringify(prefix));
              a.uri = prefix;
            }
            parser2.tag.attributes[name] = a;
            emitNode(parser2, "onattribute", a);
          }
          parser2.attribList.length = 0;
        }
        parser2.tag.isSelfClosing = !!selfClosing;
        parser2.sawRoot = true;
        parser2.tags.push(parser2.tag);
        emitNode(parser2, "onopentag", parser2.tag);
        if (!selfClosing) {
          if (!parser2.noscript && parser2.tagName.toLowerCase() === "script") {
            parser2.state = S.SCRIPT;
          } else {
            parser2.state = S.TEXT;
          }
          parser2.tag = null;
          parser2.tagName = "";
        }
        parser2.attribName = parser2.attribValue = "";
        parser2.attribList.length = 0;
      }
      function closeTag(parser2) {
        if (!parser2.tagName) {
          strictFail(parser2, "Weird empty close tag.");
          parser2.textNode += "</>";
          parser2.state = S.TEXT;
          return;
        }
        if (parser2.script) {
          if (parser2.tagName !== "script") {
            parser2.script += "</" + parser2.tagName + ">";
            parser2.tagName = "";
            parser2.state = S.SCRIPT;
            return;
          }
          emitNode(parser2, "onscript", parser2.script);
          parser2.script = "";
        }
        var t = parser2.tags.length;
        var tagName = parser2.tagName;
        if (!parser2.strict) {
          tagName = tagName[parser2.looseCase]();
        }
        var closeTo = tagName;
        while (t--) {
          var close = parser2.tags[t];
          if (close.name !== closeTo) {
            strictFail(parser2, "Unexpected close tag");
          } else {
            break;
          }
        }
        if (t < 0) {
          strictFail(parser2, "Unmatched closing tag: " + parser2.tagName);
          parser2.textNode += "</" + parser2.tagName + ">";
          parser2.state = S.TEXT;
          return;
        }
        parser2.tagName = tagName;
        var s2 = parser2.tags.length;
        while (s2-- > t) {
          var tag = parser2.tag = parser2.tags.pop();
          parser2.tagName = parser2.tag.name;
          emitNode(parser2, "onclosetag", parser2.tagName);
          var x = {};
          for (var i in tag.ns) {
            x[i] = tag.ns[i];
          }
          var parent = parser2.tags[parser2.tags.length - 1] || parser2;
          if (parser2.opt.xmlns && tag.ns !== parent.ns) {
            Object.keys(tag.ns).forEach(function(p) {
              var n = tag.ns[p];
              emitNode(parser2, "onclosenamespace", { prefix: p, uri: n });
            });
          }
        }
        if (t === 0)
          parser2.closedRoot = true;
        parser2.tagName = parser2.attribValue = parser2.attribName = "";
        parser2.attribList.length = 0;
        parser2.state = S.TEXT;
      }
      function parseEntity(parser2) {
        var entity = parser2.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = "";
        if (parser2.ENTITIES[entity]) {
          return parser2.ENTITIES[entity];
        }
        if (parser2.ENTITIES[entityLC]) {
          return parser2.ENTITIES[entityLC];
        }
        entity = entityLC;
        if (entity.charAt(0) === "#") {
          if (entity.charAt(1) === "x") {
            entity = entity.slice(2);
            num = parseInt(entity, 16);
            numStr = num.toString(16);
          } else {
            entity = entity.slice(1);
            num = parseInt(entity, 10);
            numStr = num.toString(10);
          }
        }
        entity = entity.replace(/^0+/, "");
        if (isNaN(num) || numStr.toLowerCase() !== entity) {
          strictFail(parser2, "Invalid character entity");
          return "&" + parser2.entity + ";";
        }
        return String.fromCodePoint(num);
      }
      function beginWhiteSpace(parser2, c) {
        if (c === "<") {
          parser2.state = S.OPEN_WAKA;
          parser2.startTagPosition = parser2.position;
        } else if (!isWhitespace(c)) {
          strictFail(parser2, "Non-whitespace before first tag.");
          parser2.textNode = c;
          parser2.state = S.TEXT;
        }
      }
      function charAt(chunk, i) {
        var result = "";
        if (i < chunk.length) {
          result = chunk.charAt(i);
        }
        return result;
      }
      function write(chunk) {
        var parser2 = this;
        if (this.error) {
          throw this.error;
        }
        if (parser2.closed) {
          return error(
            parser2,
            "Cannot write after close. Assign an onready handler."
          );
        }
        if (chunk === null) {
          return end(parser2);
        }
        if (typeof chunk === "object") {
          chunk = chunk.toString();
        }
        var i = 0;
        var c = "";
        while (true) {
          c = charAt(chunk, i++);
          parser2.c = c;
          if (!c) {
            break;
          }
          if (parser2.trackPosition) {
            parser2.position++;
            if (c === "\n") {
              parser2.line++;
              parser2.column = 0;
            } else {
              parser2.column++;
            }
          }
          switch (parser2.state) {
            case S.BEGIN:
              parser2.state = S.BEGIN_WHITESPACE;
              if (c === "\uFEFF") {
                continue;
              }
              beginWhiteSpace(parser2, c);
              continue;
            case S.BEGIN_WHITESPACE:
              beginWhiteSpace(parser2, c);
              continue;
            case S.TEXT:
              if (parser2.sawRoot && !parser2.closedRoot) {
                var starti = i - 1;
                while (c && c !== "<" && c !== "&") {
                  c = charAt(chunk, i++);
                  if (c && parser2.trackPosition) {
                    parser2.position++;
                    if (c === "\n") {
                      parser2.line++;
                      parser2.column = 0;
                    } else {
                      parser2.column++;
                    }
                  }
                }
                parser2.textNode += chunk.substring(starti, i - 1);
              }
              if (c === "<" && !(parser2.sawRoot && parser2.closedRoot && !parser2.strict)) {
                parser2.state = S.OPEN_WAKA;
                parser2.startTagPosition = parser2.position;
              } else {
                if (!isWhitespace(c) && (!parser2.sawRoot || parser2.closedRoot)) {
                  strictFail(parser2, "Text data outside of root node.");
                }
                if (c === "&") {
                  parser2.state = S.TEXT_ENTITY;
                } else {
                  parser2.textNode += c;
                }
              }
              continue;
            case S.SCRIPT:
              if (c === "<") {
                parser2.state = S.SCRIPT_ENDING;
              } else {
                parser2.script += c;
              }
              continue;
            case S.SCRIPT_ENDING:
              if (c === "/") {
                parser2.state = S.CLOSE_TAG;
              } else {
                parser2.script += "<" + c;
                parser2.state = S.SCRIPT;
              }
              continue;
            case S.OPEN_WAKA:
              if (c === "!") {
                parser2.state = S.SGML_DECL;
                parser2.sgmlDecl = "";
              } else if (isWhitespace(c))
                ;
              else if (isMatch(nameStart, c)) {
                parser2.state = S.OPEN_TAG;
                parser2.tagName = c;
              } else if (c === "/") {
                parser2.state = S.CLOSE_TAG;
                parser2.tagName = "";
              } else if (c === "?") {
                parser2.state = S.PROC_INST;
                parser2.procInstName = parser2.procInstBody = "";
              } else {
                strictFail(parser2, "Unencoded <");
                if (parser2.startTagPosition + 1 < parser2.position) {
                  var pad = parser2.position - parser2.startTagPosition;
                  c = new Array(pad).join(" ") + c;
                }
                parser2.textNode += "<" + c;
                parser2.state = S.TEXT;
              }
              continue;
            case S.SGML_DECL:
              if ((parser2.sgmlDecl + c).toUpperCase() === CDATA) {
                emitNode(parser2, "onopencdata");
                parser2.state = S.CDATA;
                parser2.sgmlDecl = "";
                parser2.cdata = "";
              } else if (parser2.sgmlDecl + c === "--") {
                parser2.state = S.COMMENT;
                parser2.comment = "";
                parser2.sgmlDecl = "";
              } else if ((parser2.sgmlDecl + c).toUpperCase() === DOCTYPE) {
                parser2.state = S.DOCTYPE;
                if (parser2.doctype || parser2.sawRoot) {
                  strictFail(
                    parser2,
                    "Inappropriately located doctype declaration"
                  );
                }
                parser2.doctype = "";
                parser2.sgmlDecl = "";
              } else if (c === ">") {
                emitNode(parser2, "onsgmldeclaration", parser2.sgmlDecl);
                parser2.sgmlDecl = "";
                parser2.state = S.TEXT;
              } else if (isQuote(c)) {
                parser2.state = S.SGML_DECL_QUOTED;
                parser2.sgmlDecl += c;
              } else {
                parser2.sgmlDecl += c;
              }
              continue;
            case S.SGML_DECL_QUOTED:
              if (c === parser2.q) {
                parser2.state = S.SGML_DECL;
                parser2.q = "";
              }
              parser2.sgmlDecl += c;
              continue;
            case S.DOCTYPE:
              if (c === ">") {
                parser2.state = S.TEXT;
                emitNode(parser2, "ondoctype", parser2.doctype);
                parser2.doctype = true;
              } else {
                parser2.doctype += c;
                if (c === "[") {
                  parser2.state = S.DOCTYPE_DTD;
                } else if (isQuote(c)) {
                  parser2.state = S.DOCTYPE_QUOTED;
                  parser2.q = c;
                }
              }
              continue;
            case S.DOCTYPE_QUOTED:
              parser2.doctype += c;
              if (c === parser2.q) {
                parser2.q = "";
                parser2.state = S.DOCTYPE;
              }
              continue;
            case S.DOCTYPE_DTD:
              parser2.doctype += c;
              if (c === "]") {
                parser2.state = S.DOCTYPE;
              } else if (isQuote(c)) {
                parser2.state = S.DOCTYPE_DTD_QUOTED;
                parser2.q = c;
              }
              continue;
            case S.DOCTYPE_DTD_QUOTED:
              parser2.doctype += c;
              if (c === parser2.q) {
                parser2.state = S.DOCTYPE_DTD;
                parser2.q = "";
              }
              continue;
            case S.COMMENT:
              if (c === "-") {
                parser2.state = S.COMMENT_ENDING;
              } else {
                parser2.comment += c;
              }
              continue;
            case S.COMMENT_ENDING:
              if (c === "-") {
                parser2.state = S.COMMENT_ENDED;
                parser2.comment = textopts(parser2.opt, parser2.comment);
                if (parser2.comment) {
                  emitNode(parser2, "oncomment", parser2.comment);
                }
                parser2.comment = "";
              } else {
                parser2.comment += "-" + c;
                parser2.state = S.COMMENT;
              }
              continue;
            case S.COMMENT_ENDED:
              if (c !== ">") {
                strictFail(parser2, "Malformed comment");
                parser2.comment += "--" + c;
                parser2.state = S.COMMENT;
              } else {
                parser2.state = S.TEXT;
              }
              continue;
            case S.CDATA:
              if (c === "]") {
                parser2.state = S.CDATA_ENDING;
              } else {
                parser2.cdata += c;
              }
              continue;
            case S.CDATA_ENDING:
              if (c === "]") {
                parser2.state = S.CDATA_ENDING_2;
              } else {
                parser2.cdata += "]" + c;
                parser2.state = S.CDATA;
              }
              continue;
            case S.CDATA_ENDING_2:
              if (c === ">") {
                if (parser2.cdata) {
                  emitNode(parser2, "oncdata", parser2.cdata);
                }
                emitNode(parser2, "onclosecdata");
                parser2.cdata = "";
                parser2.state = S.TEXT;
              } else if (c === "]") {
                parser2.cdata += "]";
              } else {
                parser2.cdata += "]]" + c;
                parser2.state = S.CDATA;
              }
              continue;
            case S.PROC_INST:
              if (c === "?") {
                parser2.state = S.PROC_INST_ENDING;
              } else if (isWhitespace(c)) {
                parser2.state = S.PROC_INST_BODY;
              } else {
                parser2.procInstName += c;
              }
              continue;
            case S.PROC_INST_BODY:
              if (!parser2.procInstBody && isWhitespace(c)) {
                continue;
              } else if (c === "?") {
                parser2.state = S.PROC_INST_ENDING;
              } else {
                parser2.procInstBody += c;
              }
              continue;
            case S.PROC_INST_ENDING:
              if (c === ">") {
                emitNode(parser2, "onprocessinginstruction", {
                  name: parser2.procInstName,
                  body: parser2.procInstBody
                });
                parser2.procInstName = parser2.procInstBody = "";
                parser2.state = S.TEXT;
              } else {
                parser2.procInstBody += "?" + c;
                parser2.state = S.PROC_INST_BODY;
              }
              continue;
            case S.OPEN_TAG:
              if (isMatch(nameBody, c)) {
                parser2.tagName += c;
              } else {
                newTag(parser2);
                if (c === ">") {
                  openTag(parser2);
                } else if (c === "/") {
                  parser2.state = S.OPEN_TAG_SLASH;
                } else {
                  if (!isWhitespace(c)) {
                    strictFail(parser2, "Invalid character in tag name");
                  }
                  parser2.state = S.ATTRIB;
                }
              }
              continue;
            case S.OPEN_TAG_SLASH:
              if (c === ">") {
                openTag(parser2, true);
                closeTag(parser2);
              } else {
                strictFail(parser2, "Forward-slash in opening tag not followed by >");
                parser2.state = S.ATTRIB;
              }
              continue;
            case S.ATTRIB:
              if (isWhitespace(c)) {
                continue;
              } else if (c === ">") {
                openTag(parser2);
              } else if (c === "/") {
                parser2.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c)) {
                parser2.attribName = c;
                parser2.attribValue = "";
                parser2.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser2, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME:
              if (c === "=") {
                parser2.state = S.ATTRIB_VALUE;
              } else if (c === ">") {
                strictFail(parser2, "Attribute without value");
                parser2.attribValue = parser2.attribName;
                attrib(parser2);
                openTag(parser2);
              } else if (isWhitespace(c)) {
                parser2.state = S.ATTRIB_NAME_SAW_WHITE;
              } else if (isMatch(nameBody, c)) {
                parser2.attribName += c;
              } else {
                strictFail(parser2, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME_SAW_WHITE:
              if (c === "=") {
                parser2.state = S.ATTRIB_VALUE;
              } else if (isWhitespace(c)) {
                continue;
              } else {
                strictFail(parser2, "Attribute without value");
                parser2.tag.attributes[parser2.attribName] = "";
                parser2.attribValue = "";
                emitNode(parser2, "onattribute", {
                  name: parser2.attribName,
                  value: ""
                });
                parser2.attribName = "";
                if (c === ">") {
                  openTag(parser2);
                } else if (isMatch(nameStart, c)) {
                  parser2.attribName = c;
                  parser2.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser2, "Invalid attribute name");
                  parser2.state = S.ATTRIB;
                }
              }
              continue;
            case S.ATTRIB_VALUE:
              if (isWhitespace(c)) {
                continue;
              } else if (isQuote(c)) {
                parser2.q = c;
                parser2.state = S.ATTRIB_VALUE_QUOTED;
              } else {
                strictFail(parser2, "Unquoted attribute value");
                parser2.state = S.ATTRIB_VALUE_UNQUOTED;
                parser2.attribValue = c;
              }
              continue;
            case S.ATTRIB_VALUE_QUOTED:
              if (c !== parser2.q) {
                if (c === "&") {
                  parser2.state = S.ATTRIB_VALUE_ENTITY_Q;
                } else {
                  parser2.attribValue += c;
                }
                continue;
              }
              attrib(parser2);
              parser2.q = "";
              parser2.state = S.ATTRIB_VALUE_CLOSED;
              continue;
            case S.ATTRIB_VALUE_CLOSED:
              if (isWhitespace(c)) {
                parser2.state = S.ATTRIB;
              } else if (c === ">") {
                openTag(parser2);
              } else if (c === "/") {
                parser2.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c)) {
                strictFail(parser2, "No whitespace between attributes");
                parser2.attribName = c;
                parser2.attribValue = "";
                parser2.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser2, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_VALUE_UNQUOTED:
              if (!isAttribEnd(c)) {
                if (c === "&") {
                  parser2.state = S.ATTRIB_VALUE_ENTITY_U;
                } else {
                  parser2.attribValue += c;
                }
                continue;
              }
              attrib(parser2);
              if (c === ">") {
                openTag(parser2);
              } else {
                parser2.state = S.ATTRIB;
              }
              continue;
            case S.CLOSE_TAG:
              if (!parser2.tagName) {
                if (isWhitespace(c)) {
                  continue;
                } else if (notMatch(nameStart, c)) {
                  if (parser2.script) {
                    parser2.script += "</" + c;
                    parser2.state = S.SCRIPT;
                  } else {
                    strictFail(parser2, "Invalid tagname in closing tag.");
                  }
                } else {
                  parser2.tagName = c;
                }
              } else if (c === ">") {
                closeTag(parser2);
              } else if (isMatch(nameBody, c)) {
                parser2.tagName += c;
              } else if (parser2.script) {
                parser2.script += "</" + parser2.tagName;
                parser2.tagName = "";
                parser2.state = S.SCRIPT;
              } else {
                if (!isWhitespace(c)) {
                  strictFail(parser2, "Invalid tagname in closing tag");
                }
                parser2.state = S.CLOSE_TAG_SAW_WHITE;
              }
              continue;
            case S.CLOSE_TAG_SAW_WHITE:
              if (isWhitespace(c)) {
                continue;
              }
              if (c === ">") {
                closeTag(parser2);
              } else {
                strictFail(parser2, "Invalid characters in closing tag");
              }
              continue;
            case S.TEXT_ENTITY:
            case S.ATTRIB_VALUE_ENTITY_Q:
            case S.ATTRIB_VALUE_ENTITY_U:
              var returnState;
              var buffer;
              switch (parser2.state) {
                case S.TEXT_ENTITY:
                  returnState = S.TEXT;
                  buffer = "textNode";
                  break;
                case S.ATTRIB_VALUE_ENTITY_Q:
                  returnState = S.ATTRIB_VALUE_QUOTED;
                  buffer = "attribValue";
                  break;
                case S.ATTRIB_VALUE_ENTITY_U:
                  returnState = S.ATTRIB_VALUE_UNQUOTED;
                  buffer = "attribValue";
                  break;
              }
              if (c === ";") {
                if (parser2.opt.unparsedEntities) {
                  var parsedEntity = parseEntity(parser2);
                  parser2.entity = "";
                  parser2.state = returnState;
                  parser2.write(parsedEntity);
                } else {
                  parser2[buffer] += parseEntity(parser2);
                  parser2.entity = "";
                  parser2.state = returnState;
                }
              } else if (isMatch(parser2.entity.length ? entityBody : entityStart, c)) {
                parser2.entity += c;
              } else {
                strictFail(parser2, "Invalid character in entity name");
                parser2[buffer] += "&" + parser2.entity + c;
                parser2.entity = "";
                parser2.state = returnState;
              }
              continue;
            default: {
              throw new Error(parser2, "Unknown state: " + parser2.state);
            }
          }
        }
        if (parser2.position >= parser2.bufferCheckPosition) {
          checkBufferLength(parser2);
        }
        return parser2;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      if (!String.fromCodePoint) {
        (function() {
          var stringFromCharCode = String.fromCharCode;
          var floor = Math.floor;
          var fromCodePoint = function() {
            var MAX_SIZE = 16384;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
              return "";
            }
            var result = "";
            while (++index < length) {
              var codePoint = Number(arguments[index]);
              if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 1114111 || // not a valid Unicode code point
              floor(codePoint) !== codePoint) {
                throw RangeError("Invalid code point: " + codePoint);
              }
              if (codePoint <= 65535) {
                codeUnits.push(codePoint);
              } else {
                codePoint -= 65536;
                highSurrogate = (codePoint >> 10) + 55296;
                lowSurrogate = codePoint % 1024 + 56320;
                codeUnits.push(highSurrogate, lowSurrogate);
              }
              if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
              }
            }
            return result;
          };
          if (Object.defineProperty) {
            Object.defineProperty(String, "fromCodePoint", {
              value: fromCodePoint,
              configurable: true,
              writable: true
            });
          } else {
            String.fromCodePoint = fromCodePoint;
          }
        })();
      }
    })(exports);
  })(sax);
  return sax;
}
var bom = {};
var hasRequiredBom;
function requireBom() {
  if (hasRequiredBom)
    return bom;
  hasRequiredBom = 1;
  (function() {
    bom.stripBOM = function(str) {
      if (str[0] === "\uFEFF") {
        return str.substring(1);
      } else {
        return str;
      }
    };
  }).call(commonjsGlobal);
  return bom;
}
var processors = {};
var hasRequiredProcessors;
function requireProcessors() {
  if (hasRequiredProcessors)
    return processors;
  hasRequiredProcessors = 1;
  (function() {
    var prefixMatch;
    prefixMatch = new RegExp(/(?!xmlns)^.*:/);
    processors.normalize = function(str) {
      return str.toLowerCase();
    };
    processors.firstCharLowerCase = function(str) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    };
    processors.stripPrefix = function(str) {
      return str.replace(prefixMatch, "");
    };
    processors.parseNumbers = function(str) {
      if (!isNaN(str)) {
        str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
      }
      return str;
    };
    processors.parseBooleans = function(str) {
      if (/^(?:true|false)$/i.test(str)) {
        str = str.toLowerCase() === "true";
      }
      return str;
    };
  }).call(commonjsGlobal);
  return processors;
}
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser)
    return parser;
  hasRequiredParser = 1;
  (function(exports) {
    (function() {
      var bom2, defaults2, defineProperty, events, isEmpty, processItem, processors2, sax2, setImmediate, bind = function(fn, me) {
        return function() {
          return fn.apply(me, arguments);
        };
      }, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      sax2 = requireSax();
      events = require$$1$1;
      bom2 = requireBom();
      processors2 = requireProcessors();
      setImmediate = require$$4.setImmediate;
      defaults2 = requireDefaults().defaults;
      isEmpty = function(thing) {
        return typeof thing === "object" && thing != null && Object.keys(thing).length === 0;
      };
      processItem = function(processors3, item, key) {
        var i, len, process2;
        for (i = 0, len = processors3.length; i < len; i++) {
          process2 = processors3[i];
          item = process2(item, key);
        }
        return item;
      };
      defineProperty = function(obj, key, value) {
        var descriptor;
        descriptor = /* @__PURE__ */ Object.create(null);
        descriptor.value = value;
        descriptor.writable = true;
        descriptor.enumerable = true;
        descriptor.configurable = true;
        return Object.defineProperty(obj, key, descriptor);
      };
      exports.Parser = function(superClass) {
        extend(Parser, superClass);
        function Parser(opts) {
          this.parseStringPromise = bind(this.parseStringPromise, this);
          this.parseString = bind(this.parseString, this);
          this.reset = bind(this.reset, this);
          this.assignOrPush = bind(this.assignOrPush, this);
          this.processAsync = bind(this.processAsync, this);
          var key, ref, value;
          if (!(this instanceof exports.Parser)) {
            return new exports.Parser(opts);
          }
          this.options = {};
          ref = defaults2["0.2"];
          for (key in ref) {
            if (!hasProp.call(ref, key))
              continue;
            value = ref[key];
            this.options[key] = value;
          }
          for (key in opts) {
            if (!hasProp.call(opts, key))
              continue;
            value = opts[key];
            this.options[key] = value;
          }
          if (this.options.xmlns) {
            this.options.xmlnskey = this.options.attrkey + "ns";
          }
          if (this.options.normalizeTags) {
            if (!this.options.tagNameProcessors) {
              this.options.tagNameProcessors = [];
            }
            this.options.tagNameProcessors.unshift(processors2.normalize);
          }
          this.reset();
        }
        Parser.prototype.processAsync = function() {
          var chunk, err;
          try {
            if (this.remaining.length <= this.options.chunkSize) {
              chunk = this.remaining;
              this.remaining = "";
              this.saxParser = this.saxParser.write(chunk);
              return this.saxParser.close();
            } else {
              chunk = this.remaining.substr(0, this.options.chunkSize);
              this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
              this.saxParser = this.saxParser.write(chunk);
              return setImmediate(this.processAsync);
            }
          } catch (error1) {
            err = error1;
            if (!this.saxParser.errThrown) {
              this.saxParser.errThrown = true;
              return this.emit(err);
            }
          }
        };
        Parser.prototype.assignOrPush = function(obj, key, newValue) {
          if (!(key in obj)) {
            if (!this.options.explicitArray) {
              return defineProperty(obj, key, newValue);
            } else {
              return defineProperty(obj, key, [newValue]);
            }
          } else {
            if (!(obj[key] instanceof Array)) {
              defineProperty(obj, key, [obj[key]]);
            }
            return obj[key].push(newValue);
          }
        };
        Parser.prototype.reset = function() {
          var attrkey, charkey, ontext, stack;
          this.removeAllListeners();
          this.saxParser = sax2.parser(this.options.strict, {
            trim: false,
            normalize: false,
            xmlns: this.options.xmlns
          });
          this.saxParser.errThrown = false;
          this.saxParser.onerror = /* @__PURE__ */ function(_this) {
            return function(error) {
              _this.saxParser.resume();
              if (!_this.saxParser.errThrown) {
                _this.saxParser.errThrown = true;
                return _this.emit("error", error);
              }
            };
          }(this);
          this.saxParser.onend = /* @__PURE__ */ function(_this) {
            return function() {
              if (!_this.saxParser.ended) {
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);
          this.saxParser.ended = false;
          this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
          this.resultObject = null;
          stack = [];
          attrkey = this.options.attrkey;
          charkey = this.options.charkey;
          this.saxParser.onopentag = /* @__PURE__ */ function(_this) {
            return function(node) {
              var key, newValue, obj, processedKey, ref;
              obj = {};
              obj[charkey] = "";
              if (!_this.options.ignoreAttrs) {
                ref = node.attributes;
                for (key in ref) {
                  if (!hasProp.call(ref, key))
                    continue;
                  if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                    obj[attrkey] = {};
                  }
                  newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
                  processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
                  if (_this.options.mergeAttrs) {
                    _this.assignOrPush(obj, processedKey, newValue);
                  } else {
                    defineProperty(obj[attrkey], processedKey, newValue);
                  }
                }
              }
              obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
              if (_this.options.xmlns) {
                obj[_this.options.xmlnskey] = {
                  uri: node.uri,
                  local: node.local
                };
              }
              return stack.push(obj);
            };
          }(this);
          this.saxParser.onclosetag = /* @__PURE__ */ function(_this) {
            return function() {
              var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
              obj = stack.pop();
              nodeName = obj["#name"];
              if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
                delete obj["#name"];
              }
              if (obj.cdata === true) {
                cdata = obj.cdata;
                delete obj.cdata;
              }
              s = stack[stack.length - 1];
              if (obj[charkey].match(/^\s*$/) && !cdata) {
                emptyStr = obj[charkey];
                delete obj[charkey];
              } else {
                if (_this.options.trim) {
                  obj[charkey] = obj[charkey].trim();
                }
                if (_this.options.normalize) {
                  obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
                }
                obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
                if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                  obj = obj[charkey];
                }
              }
              if (isEmpty(obj)) {
                if (typeof _this.options.emptyTag === "function") {
                  obj = _this.options.emptyTag();
                } else {
                  obj = _this.options.emptyTag !== "" ? _this.options.emptyTag : emptyStr;
                }
              }
              if (_this.options.validator != null) {
                xpath = "/" + function() {
                  var i, len, results;
                  results = [];
                  for (i = 0, len = stack.length; i < len; i++) {
                    node = stack[i];
                    results.push(node["#name"]);
                  }
                  return results;
                }().concat(nodeName).join("/");
                (function() {
                  var err;
                  try {
                    return obj = _this.options.validator(xpath, s && s[nodeName], obj);
                  } catch (error1) {
                    err = error1;
                    return _this.emit("error", err);
                  }
                })();
              }
              if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === "object") {
                if (!_this.options.preserveChildrenOrder) {
                  node = {};
                  if (_this.options.attrkey in obj) {
                    node[_this.options.attrkey] = obj[_this.options.attrkey];
                    delete obj[_this.options.attrkey];
                  }
                  if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                    node[_this.options.charkey] = obj[_this.options.charkey];
                    delete obj[_this.options.charkey];
                  }
                  if (Object.getOwnPropertyNames(obj).length > 0) {
                    node[_this.options.childkey] = obj;
                  }
                  obj = node;
                } else if (s) {
                  s[_this.options.childkey] = s[_this.options.childkey] || [];
                  objClone = {};
                  for (key in obj) {
                    if (!hasProp.call(obj, key))
                      continue;
                    defineProperty(objClone, key, obj[key]);
                  }
                  s[_this.options.childkey].push(objClone);
                  delete obj["#name"];
                  if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                    obj = obj[charkey];
                  }
                }
              }
              if (stack.length > 0) {
                return _this.assignOrPush(s, nodeName, obj);
              } else {
                if (_this.options.explicitRoot) {
                  old = obj;
                  obj = {};
                  defineProperty(obj, nodeName, old);
                }
                _this.resultObject = obj;
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);
          ontext = /* @__PURE__ */ function(_this) {
            return function(text) {
              var charChild, s;
              s = stack[stack.length - 1];
              if (s) {
                s[charkey] += text;
                if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, "").trim() !== "")) {
                  s[_this.options.childkey] = s[_this.options.childkey] || [];
                  charChild = {
                    "#name": "__text__"
                  };
                  charChild[charkey] = text;
                  if (_this.options.normalize) {
                    charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
                  }
                  s[_this.options.childkey].push(charChild);
                }
                return s;
              }
            };
          }(this);
          this.saxParser.ontext = ontext;
          return this.saxParser.oncdata = /* @__PURE__ */ function(_this) {
            return function(text) {
              var s;
              s = ontext(text);
              if (s) {
                return s.cdata = true;
              }
            };
          }();
        };
        Parser.prototype.parseString = function(str, cb) {
          var err;
          if (cb != null && typeof cb === "function") {
            this.on("end", function(result) {
              this.reset();
              return cb(null, result);
            });
            this.on("error", function(err2) {
              this.reset();
              return cb(err2);
            });
          }
          try {
            str = str.toString();
            if (str.trim() === "") {
              this.emit("end", null);
              return true;
            }
            str = bom2.stripBOM(str);
            if (this.options.async) {
              this.remaining = str;
              setImmediate(this.processAsync);
              return this.saxParser;
            }
            return this.saxParser.write(str).close();
          } catch (error1) {
            err = error1;
            if (!(this.saxParser.errThrown || this.saxParser.ended)) {
              this.emit("error", err);
              return this.saxParser.errThrown = true;
            } else if (this.saxParser.ended) {
              throw err;
            }
          }
        };
        Parser.prototype.parseStringPromise = function(str) {
          return new Promise(/* @__PURE__ */ function(_this) {
            return function(resolve, reject) {
              return _this.parseString(str, function(err, value) {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(value);
                }
              });
            };
          }(this));
        };
        return Parser;
      }(events);
      exports.parseString = function(str, a, b) {
        var cb, options, parser2;
        if (b != null) {
          if (typeof b === "function") {
            cb = b;
          }
          if (typeof a === "object") {
            options = a;
          }
        } else {
          if (typeof a === "function") {
            cb = a;
          }
          options = {};
        }
        parser2 = new exports.Parser(options);
        return parser2.parseString(str, cb);
      };
      exports.parseStringPromise = function(str, a) {
        var options, parser2;
        if (typeof a === "object") {
          options = a;
        }
        parser2 = new exports.Parser(options);
        return parser2.parseStringPromise(str);
      };
    }).call(commonjsGlobal);
  })(parser);
  return parser;
}
(function() {
  var builder2, defaults2, parser2, processors2, extend = function(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key))
        child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  }, hasProp = {}.hasOwnProperty;
  defaults2 = requireDefaults();
  builder2 = requireBuilder();
  parser2 = requireParser();
  processors2 = requireProcessors();
  xml2js.defaults = defaults2.defaults;
  xml2js.processors = processors2;
  xml2js.ValidationError = function(superClass) {
    extend(ValidationError, superClass);
    function ValidationError(message) {
      this.message = message;
    }
    return ValidationError;
  }(Error);
  xml2js.Builder = builder2.Builder;
  xml2js.Parser = parser2.Parser;
  xml2js.parseString = parser2.parseString;
  xml2js.parseStringPromise = parser2.parseStringPromise;
}).call(commonjsGlobal);
const fs$1 = require("fs");
function readAndParseXML(filePath) {
  return new Promise((resolve, reject) => {
    fs$1.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      xml2js.parseString(data, (err2, result) => {
        if (err2) {
          reject(err2);
          return;
        }
        resolve(result);
      });
    });
  });
}
const fs = require("fs");
const STORE_PATH = path.join(electron.app.getPath("userData"), "store.json");
function createSuccessIpcMessage(payload) {
  return {
    status: 1,
    payload,
    message: ""
  };
}
function createFailIpcMessage(message) {
  return {
    status: 0,
    payload: null,
    message
  };
}
function createModalWindow(mainWindow) {
  let modal = new electron.BrowserWindow({
    parent: mainWindow,
    // 设置父窗口
    modal: true,
    // 设置为模态窗口
    show: true,
    // 初始时不显示窗口
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      // 根据需要调整这些选项
    },
    autoHideMenuBar: true,
    width: 1500,
    height: 1e3,
    minWidth: 1500,
    minHeight: 1e3
  });
  modal.loadURL("http://localhost:3000/#/editor");
  modal.once("ready-to-show", () => {
    modal.show();
  });
}
const ipc = (mainWindow) => {
  electron.ipcMain.on("window-control", (event, command) => {
    switch (command) {
      case "minimize":
        mainWindow.minimize();
        break;
      case "maximize-restore":
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
        break;
      case "close":
        mainWindow.close();
        break;
      case "open-editor":
        createModalWindow(mainWindow);
    }
  });
  electron.ipcMain.on("dialog", (event, command, args) => {
    switch (command) {
      case "open-directory-dialog":
        electron.dialog.showOpenDialog(mainWindow, {
          properties: ["openDirectory"]
        }).then((result) => {
          if (!result.canceled && result.filePaths.length > 0) {
            event.sender.send("selected-directory", createSuccessIpcMessage(result.filePaths[0]));
          }
          event.sender.send("selected-directory", createSuccessIpcMessage(""));
        }).catch((err) => {
          event.sender.send("selected-directory", createFailIpcMessage(err));
        });
        break;
      case "show-error-dialog":
        const { title, message } = args;
        electron.dialog.showErrorBox(title, message);
        break;
    }
  });
  electron.ipcMain.on("file", async (event, command, args) => {
    switch (command) {
      case "read-version-xml":
        try {
          const { path: wotpath2 } = args;
          const filePath = path.join(wotpath2, "version.xml");
          const xmlObject = await readAndParseXML(filePath);
          event.sender.send("send-version-xml", createSuccessIpcMessage(JSON.stringify(xmlObject)));
          return;
        } catch (error) {
          console.error("读取或解析XML文件时出错:", error);
          event.sender.send("send-version-xml", createFailIpcMessage("读取或解析XML文件时出错"));
          return null;
        }
      case "get-file-list":
        try {
          const { path: wotpath2 } = args;
          const files = fs.readdirSync(wotpath2);
          event.sender.send("send-file-list", createSuccessIpcMessage(files));
          return;
        } catch (error) {
          console.error("读取文件列表时出错:", error);
          event.sender.send("send-file-list", createFailIpcMessage("读取文件列表时出错"));
          return;
        }
      case "open-folder":
        const { path: wotpath } = args;
        electron.shell.openPath(wotpath).then(() => {
          console.log("Folder opened successfully");
        }).catch((err) => {
          console.error("Error opening folder:", err);
        });
    }
  });
  electron.ipcMain.on("vuex", async (event, command, args) => {
    switch (command) {
      case "vuex-write":
        const { state } = args;
        console.log(STORE_PATH);
        fs.writeFile(STORE_PATH, state, (err) => {
          if (err) {
            event.reply("vuex-error", err);
          }
        });
        break;
      case "vuex-read":
        fs.readFile(STORE_PATH, (err, data) => {
          if (err) {
            if (err.code === "ENOENT") {
              event.sender.send("vuex-initial-stat", createFailIpcMessage("文件不存在"));
            } else {
              event.sender.send("vuex-initial-stat", createFailIpcMessage(JSON.stringify(err)));
            }
            return;
          }
          event.sender.send("vuex-initial-stat", createSuccessIpcMessage(data.toString()));
        });
    }
  });
};
path.resolve(__dirname, "../extension/vue-devtools");
let win;
const createWindow = () => {
  win = new electron.BrowserWindow({
    autoHideMenuBar: true,
    frame: false,
    minWidth: 1500,
    minHeight: 1e3,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "../src/preload.js")
      //预加载
    }
  });
  process.env.VITE_DEV_SERVER_URL && win.loadURL("http://localhost:3000") || win.loadFile("dist/index.html");
  ipc(win);
  if (process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true") {
    win.webContents.openDevTools();
  }
};
electron.app.whenReady().then(async () => {
  createWindow();
});
