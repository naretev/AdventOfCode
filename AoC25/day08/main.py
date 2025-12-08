from collections import defaultdict
import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

boxes = []
for line in lines:
    boxes.append([int(n) for n in line.split(",")])

def calcDist(box1, box2):
    x1, y1, z1 = box1
    x2, y2, z2 = box2
    return abs(x1-x2)**2 + abs(y1-y2)**2 + abs(z1-z2)**2

edges = []
for i in range(len(boxes)):
    for j in range(i + 1, len(boxes)):
        d = calcDist(boxes[i], boxes[j])
        edges.append([i, j, d])

edges.sort(key=lambda k: k[2])

graph = defaultdict(list)
for i in range(1000):
    a, b, _ = edges[i]
    graph[a].append(b)
    graph[b].append(a)

def dfs(curr, graph, visited):
    if curr in visited: return 0
    visited.add(curr)

    return 1 + sum([dfs(nxt, graph, visited) for nxt in graph[curr]])

visited = set()
res = sorted([dfs(k, graph, visited) for k in graph.keys()])
print(res[-1] * res[-2] * res[-3])
