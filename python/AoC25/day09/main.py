import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

points = []
for line in lines:
    points.append([int(n) for n in line.split(",")])

maxArea = 0
for i in range(len(points)):
    for j in range(i+1, len(points)):
        x1, y1 = points[i]
        x2, y2 = points[j]
        maxArea = max(maxArea, (abs(x1-x2)+1)*(abs(y1-y2)+1))

print(maxArea)
