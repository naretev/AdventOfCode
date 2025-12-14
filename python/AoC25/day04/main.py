import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

grid = read_file("lines", __file__)
iLen = len(grid)
jLen = len(grid[0])

def getVal(i: int, j: int) -> str:
    if j < 0 or j >= jLen or i < 0 or i >= iLen:
        return '.'
    else:
        return grid[i][j]

dirs = [
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1]
]

count = 0
for i in range(iLen):
    for j in range(jLen):
        if grid[i][j] == '@':
            rolls = 0
            for iDir, jDir in dirs:
                if getVal(i+iDir, j+jDir) == '@':
                    rolls += 1
            
            if rolls < 4:
                count += 1

print(count)
