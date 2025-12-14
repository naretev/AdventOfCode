import sys
import os
import re

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)
input = []
for i in range(len(lines)-1):
    x = re.split(r'\s+', lines[i])
    y = x if x[0] != '' else x[1:]
    z = y if y[-1] != '' else y[:-1]
    input.append([int(n) for n in z])

ops = []
x = re.split(r'\s+', lines[-1])
y = x if x[0] != '' else x[1:]
ops = y if y[-1] != '' else y[:-1]

sum = 0
for i in range(len(input[0])):
    o = ops[i]
    colSum = 0 if o == '+' else 1
    for j in range(len(input)):
        if o == '*':
            colSum *= input[j][i]
        else:
            colSum += input[j][i]
    
    sum += colSum

print(sum)
