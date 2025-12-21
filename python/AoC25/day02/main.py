import sys
import os

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from filereader import read_file

text = read_file("text", __file__)
count = 0
for part in text.split(","):
    a, b = [int(x) for x in part.split("-")]

    for num in range(a, b+1):
        numStr = str(num)
        l = len(numStr)
        if l%2 == 0 and numStr[:l//2] == numStr[l//2:]:
            count += num

print(count)
