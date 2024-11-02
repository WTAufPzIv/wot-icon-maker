# -*- coding: UTF-8 -*- 
import os
from PIL import Image
import xml.etree.ElementTree as ET
import shutil

###############################    分割dds部分   ###########################################
def extract_battle_atlas(dds_file, xml_file):
    # 打开XML配置文件
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # 创建存放贴图的目录
    output_dir = 'battleAtlas'
    os.makedirs(output_dir, exist_ok=True)

    # 打开DDS文件
    dds_image = Image.open(dds_file)

    # 遍历XML配置文件中的所有SubTexture元素
    for sub_texture in root.iter('SubTexture'):
        # 获取贴图信息
        texture_name = sub_texture.find('name').text.strip()
        x = int(sub_texture.find('x').text.strip())
        y = int(sub_texture.find('y').text.strip())
        width = int(sub_texture.find('width').text.strip())
        height = int(sub_texture.find('height').text.strip())

       # 提取贴图
        texture = dds_image.crop((x, y, x + width, y + height))

        # 修改贴图文件名
        new_texture_name = f"{texture_name}.png"

        # 保存贴图为带透明通道的PNG格式
        output_path = os.path.join(output_dir, new_texture_name)
        texture.save(output_path, format='PNG')
    # 关闭DDS文件
    dds_image.close()

# 调用函数并传入DDS文件和XML配置文件路径
extract_battle_atlas(f'battleAtlas.dds', f'battleAtlas.xml')

###############################    分割dds部分   ###########################################
def extract_vehicle_marker_atlas(dds_file, xml_file):
    # 打开XML配置文件
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # 创建存放贴图的目录
    output_dir = 'vehicleMarkerAtlas'
    os.makedirs(output_dir, exist_ok=True)

    # 打开DDS文件
    dds_image = Image.open(dds_file)

    # 遍历XML配置文件中的所有SubTexture元素
    for sub_texture in root.iter('SubTexture'):
        # 获取贴图信息
        texture_name = sub_texture.find('name').text.strip()
        x = int(sub_texture.find('x').text.strip())
        y = int(sub_texture.find('y').text.strip())
        width = int(sub_texture.find('width').text.strip())
        height = int(sub_texture.find('height').text.strip())

       # 提取贴图
        texture = dds_image.crop((x, y, x + width, y + height))

        # 修改贴图文件名
        new_texture_name = f"{texture_name}.png"

        # 保存贴图为带透明通道的PNG格式
        output_path = os.path.join(output_dir, new_texture_name)
        texture.save(output_path, format='PNG')
    # 关闭DDS文件
    dds_image.close()

# 调用函数并传入DDS文件和XML配置文件路径
extract_vehicle_marker_atlas(f'vehicleMarkerAtlas.dds', f'vehicleMarkerAtlas.xml')

###############################    分割dds部分   ###########################################
def extract_output(dds_file, xml_file):
    # 打开XML配置文件
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # 创建存放贴图的目录
    output_dir = 'output'
    os.makedirs(output_dir, exist_ok=True)

    # 打开DDS文件
    dds_image = Image.open(dds_file)

    # 遍历XML配置文件中的所有SubTexture元素
    for sub_texture in root.iter('SubTexture'):
        # 获取贴图信息
        texture_name = sub_texture.find('name').text.strip()
        x = int(sub_texture.find('x').text.strip())
        y = int(sub_texture.find('y').text.strip())
        width = int(sub_texture.find('width').text.strip())
        height = int(sub_texture.find('height').text.strip())

       # 提取贴图
        texture = dds_image.crop((x, y, x + width, y + height))

        # 修改贴图文件名
        new_texture_name = f"{texture_name}.png"

        # 保存贴图为带透明通道的PNG格式
        output_path = os.path.join(output_dir, new_texture_name)
        texture.save(output_path, format='PNG')
    # 关闭DDS文件
    dds_image.close()

# 调用函数并传入DDS文件和XML配置文件路径
extract_output(f'output.dds', f'output.xml')

###############################    替换文件部分   ###########################################
# 获取当前目录
current_directory = os.getcwd()

# 定义文件夹路径
battle_atlas_directory = os.path.join(current_directory, 'battleAtlas')
vehicle_marker_atlas_directory = os.path.join(current_directory, 'vehicleMarkerAtlas')
output_directory = os.path.join(current_directory, 'output')

# 获取output文件夹下的所有文件
output_files = os.listdir(output_directory)

# 将文件复制粘贴到battleAtlas文件夹下
for file in output_files:
    source_path = os.path.join(output_directory, file)
    destination_path = os.path.join(battle_atlas_directory, file)
    shutil.copy(source_path, destination_path)

# 将文件复制粘贴到vehicleMarkerAtlas文件夹下，重复的文件进行替换
for file in output_files:
    source_path = os.path.join(output_directory, file)
    destination_path = os.path.join(vehicle_marker_atlas_directory, file)
    shutil.copy(source_path, destination_path)