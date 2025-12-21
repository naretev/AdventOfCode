from collections import defaultdict, deque
import re
import sys
import os

sys.setrecursionlimit(200_000)

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

lights = []
buttonList = []

for line in lines:
    lights.append(re.search(r"\[([^)]*)\]", line).group(1))
    buttonList.append([
        [int(n) for n in g.split(",")]
        for g in re.findall(r"\(([^)]*)\)", line)
    ])

def bfs(q: deque, memo: set, i):
    curr, dep = q.popleft()
    if curr in memo:
        return bfs(q, memo, i)
    if curr == lights[i]:
        return dep
    
    memo.add(curr)
    
    for button in buttonList[i]:
        next = curr
        for b in button:
            next = next[:b] + ("." if next[b] == "#" else "#") + next[b+1:]
        q.append([next, dep+1])
    
    return bfs(q, memo, i)

count = 0
for i in range(len(lights)):
    q = deque()
    q.append(["." * len(lights[i]), 0])
    memo = set()
    count += bfs(q, memo, i)

print(count)
