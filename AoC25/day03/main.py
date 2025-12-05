import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)
count = 0
for bank in lines:
    indexA = 0
    for i in range(len(bank)-1):
        if int(bank[i]) > int(bank[indexA]):
            indexA = i
    
    indexB = indexA+1
    for i in range(indexB, len(bank)):
        if int(bank[i]) > int(bank[indexB]):
            indexB = i
    count += int(bank[indexA]+bank[indexB])

print(count)