import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

grid = read_file("lines", __file__)
yl = len(grid)
xl = len(grid[0])

def getVal(y: int, x: int) -> str:
    if x < 0 or x >= xl or y < 0 or y >= yl:
        return '.'
    else:
        return grid[y][x]

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

def removeRolls():
    for y in range(yl):
        for x in range(xl):
            if grid[y][x] == '@':
                rolls = 0
                for yMod, xMod in dirs:
                    if getVal(y+yMod, x+xMod) == '@':
                        rolls += 1
                
                if rolls < 4:
                    grid[y] = grid[y][:x] + 'x' + grid[y][x+1:]

def countX():
    count = 0
    for y in range(yl):
        for x in range(xl):
            if grid[y][x] == 'x':
                count += 1
    return count

prev = -1
current = countX()
while prev != current:
    prev = current
    removeRolls()
    current = countX()

print(current)