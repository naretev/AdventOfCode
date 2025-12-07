import sys
import os
import re

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

total = 0
currSum = 0
currOpr = ''
for i in range(len(lines[0])):
    if lines[-1][i] != ' ':
        currOpr = lines[-1][i]
        currSum = 0 if currOpr == '+' else 1
    
    numStr = ''
    for j in range(len(lines)-1):
        if lines[j][i] != ' ':
            numStr += lines[j][i]
    
    if numStr == '':
        total += currSum
    else:
        if currOpr == '+':
            currSum += int(numStr)
        else:
            currSum *= int(numStr)

print(total+currSum)
