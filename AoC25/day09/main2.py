import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

points = []
for line in lines:
    points.append([int(n) for n in line.split(",")])

def isAreaInBounds(p1, p2):
    x1, y1 = p1
    x2, y2 = p2
    for i in range(len(points)):
        px1, py1 = points[i-1]
        px2, py2 = points[i]

        if px1 == px2:
            if min(x1, x2) < px1 < max(x1, x2):
                if not (max(py1, py2) <= min(y1, y2) or min(py1, py2) >= max(y1, y2)):  
                    return False
        if py1 == py2:
            if min(y1, y2) < py1 < max(y1, y2):
                if not (max(px1, px2) <= min(x1, x2) or min(px1, px2) >= max(x1, x2)):
                    return False
    
    return True

maxArea = 0
for i in range(len(points)):
    for j in range(i+1, len(points)):
        x1, y1 = points[i]
        x2, y2 = points[j]
        if isAreaInBounds(points[i], points[j]):
            maxArea = max(maxArea, (abs(x1-x2)+1)*(abs(y1-y2)+1))

print(maxArea)
