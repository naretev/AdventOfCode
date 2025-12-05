import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)
count = 0
size = 12
for bank in lines:
    indecies = []
    prevI = -1
    for offset in range(1, size+1):
        indecies.append(prevI+1)
        prevI += 1
        for i in range(prevI+1, len(bank)-(size-offset)):
            if int(bank[i]) > int(bank[indecies[-1]]):
                indecies[-1] = i
                prevI = i
    
    count += int("".join([bank[i] for i in indecies]))

print(count)