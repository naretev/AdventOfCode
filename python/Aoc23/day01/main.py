import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

nums = set([str(i) for i in range(10)])
res = 0
for line in lines:
    l, r = 0, len(line)-1

    while line[l] not in nums:
        l += 1
    while line[r] not in nums:
        r -= 1
    
    res += int(line[l]+line[r])

print(res)
