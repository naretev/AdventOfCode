import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
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

length = len(ranges)
def trimRange(startI: int, startL: int, startR: int) -> int:
    l = startL
    r = startR
    for i in range(startI, length):
        a, b = ranges[i]
        if a <= l and r <= b: return 0
        if l < a and b < r:
            return trimRange(i+1, l, a-1) + trimRange(i+1, b+1, r)

        if l <= b < r:
            l = b+1
        
        if l < a <= r:
            r = a-1
    
    return (r - l)+1

count = 0
for i in range(length):
    count += trimRange(i+1, ranges[i][0], ranges[i][1])

print(count)
