import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

for i in range(len(lines)):
    lines[i] = list(lines[i])

count = 0
for i in range(1, len(lines)):
    for j in range(len(lines[0])):
        if lines[i-1][j] == "S" and lines[i][j] == ".":
            lines[i][j] = "S"
        if lines[i-1][j] == "S" and lines[i][j] == "^":
            count += 1
            lines[i][j-1] = "S"
            lines[i][j+1] = "S"

print(count)
