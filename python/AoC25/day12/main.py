import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

sizes = []
index = 0
while lines[index*5] == str(index)+":":
    sizes.append(sum(lines[l].count("#") for l in range(index*5+1, index*5+4)))
    index += 1

trees = []
for i in range(index*5, len(lines)):
    dimensions, count = lines[i].split(": ")
    w, h = dimensions.split("x")
    area = int(w) * int(h)
    counts = [int(x) for x in count.split(" ")]
    trees.append((area, counts))

res = 0
for area, counts in trees:
    required = sum(sizes[i] * counts[i] for i in range(len(sizes)))
    if area >= required:
        res += 1

print(res)
