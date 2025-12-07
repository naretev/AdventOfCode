import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file
lines = read_file("lines", __file__)

ranges = []
for i in range(len(lines)):
    if lines[i] == "": break
    ranges.append([int(x) for x in lines[i].split("-")])

ranges.sort(key=lambda k: k[0])
merged = [ranges[0]]
for i in range(len(ranges)):
    mr = merged[-1][1]
    l, r = ranges[i]

    if r <= mr: continue

    if mr < l:
        merged.append([l, r])
        continue

    merged[-1][1] = r

count = 0
for l, r in merged:
    count += (r-l)+1

print(count)
