import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

def isInvalidFor(step: int, numStr: str, l: int) -> bool:
    part1 = numStr[:step]
    for startI in range(step, l, step):
        if part1 != numStr[startI:startI+step]:
            return False
    return True

def isInvalid(numStr: str, l: int) -> bool:
    for step in range(1, (l//2)+1):
        if l%step != 0: continue
        if isInvalidFor(step, numStr, l):
            return True
    return False

text = read_file("text", __file__)
count = 0
for part in text.split(","):
    a, b = [int(x) for x in part.split("-")]

    for num in range(a, b+1):
        numStr = str(num)
        l = len(numStr)
        if isInvalid(numStr, l):
            count += num

print(count)
