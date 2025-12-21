from collections import defaultdict
from math import prod
import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

res = 0
for line in lines:
    reqs = defaultdict(int)
    id, game = line.split(': ')
    id = int(id.split(' ')[1])
    reveals = [
        (int(num), color)
        for reveals in game.split('; ')
        for reveal in reveals.split(', ')
        for num, color in [reveal.split(' ')]
    ]

    for num, color in reveals:
        reqs[color] = max(reqs[color], num)
    
    res += prod(reqs.values())

print(res)
