from collections import defaultdict
import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

graph = defaultdict(list)
for line in lines:
    vertex, edges = line.split(": ")
    graph[vertex] = edges.split(" ")

def dfs(curr, target, memo):
    if curr == target:
        return 1
    if curr in memo:
        return memo[curr]
    
    paths = 0
    for edge in graph[curr]:
        paths += dfs(edge, target, memo)
    
    memo[curr] = paths
    return paths

print(dfs("you", "out", memo={}))
