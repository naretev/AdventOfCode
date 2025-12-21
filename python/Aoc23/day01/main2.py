import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

nums = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}
for i in range(10):
    nums[str(i)] = i

res = 0
for line in lines:
    l, r = 0, len(line)

    lv = None
    while lv is None:
        for i in range(1, 6):
            key = line[l:l+i]
            if key in nums:
                lv = nums[key]
        l += 1
    
    rv = None
    while rv is None:
        for i in range(1, 6):
            key = line[r-i:r]
            if key in nums:
                rv = nums[key]
        r -= 1
    
    res += lv*10 + rv

print(res)
