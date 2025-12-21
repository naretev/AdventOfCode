import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)
pos = 50
count = 0
for line in lines:
    dir, num = line[:1], int(line[1:])

    if dir == "L":
        pos -= num
    elif dir == "R":
        pos += num
    
    pos %= 100
    
    if pos == 0:
        count += 1

print(count)
