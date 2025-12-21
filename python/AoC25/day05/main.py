import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

splitI = 0
for i in range(len(lines)):
    if lines[i] == "":
        splitI = i

ranges = []
for i in range(splitI):
    ranges.append([int(x) for x in lines[i].split("-")])

ids = [int(x) for x in lines[splitI+1:]]

def isSpoiled(id: int) -> bool:
    for a, b in ranges:
        if a <= id <= b:
            return True
    
    return False

count = 0
for id in ids:
    if isSpoiled(id):
        count += 1

print(count)
