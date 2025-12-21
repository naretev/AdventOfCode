import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

def strToInt(s):
    if s == "^": return -1
    elif s == ".": return 0
    else: return 1

for i in range(len(lines)):
    lines[i] = [strToInt(s) for s in lines[i]]

for i in range(1, len(lines)):
    for j in range(len(lines[0])):
        if lines[i-1][j] > 0 and lines[i][j] == 0:
            lines[i][j] = lines[i-1][j]

    for j in range(len(lines[0])):
        if lines[i-1][j] > 0 and lines[i][j] == -1:
            lines[i][j-1] = lines[i][j-1] + lines[i-1][j]
            lines[i][j+1] = lines[i][j+1] + lines[i-1][j]

print(sum(lines[-1]))
