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

def dfs(curr, target, memo={}, seen_fft=False, seen_dac=False):
    if curr == target:
        return 1 if seen_dac and seen_fft else 0
    
    seen_dac = seen_dac or curr == "dac"
    seen_fft = seen_fft or curr == "fft"
    key = (curr, seen_fft, seen_dac)

    if key in memo:
        return memo[key]

    memo[key] = sum(dfs(edge, target, memo, seen_fft, seen_dac) for edge in graph[curr])
    return memo[key]

print(dfs("svr", "out"))
