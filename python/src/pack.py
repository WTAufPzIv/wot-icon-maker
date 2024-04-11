import os
import shutil

# 获取当前目录
current_directory = os.getcwd()

# 定义文件夹路径
battle_atlas_directory = os.path.join(current_directory, 'battleAtlas', 'Atlas')
vehicle_marker_atlas_directory = os.path.join(current_directory, 'vehicleMarkerAtlas', 'Atlas')
output_directory = os.path.join(current_directory, 'output')
res_directory = os.path.join(current_directory, 'res')

# 获取output文件夹下的所有文件
output_files = os.listdir(output_directory)

# 获取vehicleMarkerAtlas/Atlas文件夹下的所有文件
output_files1 = os.listdir(vehicle_marker_atlas_directory)

# 获取battleAtlas/Atlas文件夹下的所有文件
output_files2 = os.listdir(battle_atlas_directory)

os.makedirs(os.path.join(res_directory, 'gui\\maps\\icons\\vehicle\\contour'))
os.makedirs(os.path.join(res_directory, 'gui\\flash\\atlases'))
# 将icon文件复制粘贴到/res/gui/maps/icons/vehicle/contour文件夹下
for file in output_files:
    source_path = os.path.join(output_directory, file)
    destination_path = os.path.join(res_directory, 'gui\\maps\\icons\\vehicle\\contour', file)
    shutil.copy(source_path, destination_path)

# 将vehicleMarkerAtlas/Atlas文件复制粘贴到/res/gui/flash/atlases文件夹下
for file in output_files1:
    source_path = os.path.join(vehicle_marker_atlas_directory, file)
    destination_path = os.path.join(res_directory, 'gui\\flash\\atlases', file)
    shutil.copy(source_path, destination_path)

# 将battleAtlas/Atlas文件复制粘贴到/res/gui/flash/atlases文件夹下，重复的文件进行替换
for file in output_files2:
    source_path = os.path.join(battle_atlas_directory, file)
    destination_path = os.path.join(res_directory, 'gui\\flash\\atlases', file)
    shutil.copy(source_path, destination_path)