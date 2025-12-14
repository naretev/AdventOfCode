import re
import sys
import os
import pulp

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(parent_dir)

from filereader import read_file

lines = read_file("lines", __file__)

joltage = []
button_list = []

for line in lines:
    button_list.append([[int(n) for n in g.split(",")] for g in re.findall(r"\(([^)]*)\)", line)])

    joltage.append([int(n) for n in re.search(r"\{([^}]*)\}", line).group(1).split(",")])

def buttons_to_vectors(buttons, n):
    vectors = []
    for button in buttons:
        v = [0] * n
        for idx in button:
            v[idx] += 1
        vectors.append(v)
    return vectors

def ilp_solve(start, target, vectors):
    d = len(start)
    k = len(vectors)

    D = [target[i] - start[i] for i in range(d)]

    prob = pulp.LpProblem("reachability", pulp.LpMinimize)

    # variables: how many times each button is pressed
    x = [pulp.LpVariable(f"x{i}", lowBound=0, cat="Integer") for i in range(k)]

    # constraints: V * x = D
    for i in range(d):
        prob += pulp.lpSum(vectors[j][i] * x[j] for j in range(k)) == D[i]

    prob += pulp.lpSum(x)

    prob.solve(pulp.PULP_CBC_CMD(msg=False))

    status = pulp.LpStatus[prob.status]

    if status in ("Optimal", "Feasible"):
        solution = [int(pulp.value(var)) for var in x]
        return solution
    else:
        return None

count = 0
for i in range(len(joltage)):
    target = joltage[i]
    buttons = button_list[i]

    n = len(target)
    start = [0] * n

    vectors = buttons_to_vectors(buttons, n)

    solution = ilp_solve(start, target, vectors)

    if solution is None:
        print("No solution")
    else: 
        count += sum(solution)

print(count)
