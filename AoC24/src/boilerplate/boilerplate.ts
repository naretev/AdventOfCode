import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const inputs1 = groups[0];
  const inputs2 = groups[1];
  const inputs3 = groups[2];
  
  const dirs = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]

  let result = 0;

  for (let i = 0; i < inputs1.length; i++) {
    const element = inputs1[i];
    
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const inputs1 = groups[0];
  const inputs2 = groups[1];
  const inputs3 = groups[2];
  
  const dirs = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]

  let result = 0;

  for (let i = 0; i < inputs1.length; i++) {
    const element = inputs1[i];
    
  }

  console.log(result);
}

main1();

const dirs = [
  {xMod: 0, yMod: -1},
  {xMod: 1, yMod: 0},
  {xMod: 0, yMod: 1},
  {xMod: -1, yMod: 0},
]

const bfs = (startX: number, startY: number, matrix: string[][]) => {
  const visited = new Set();
  const q = new Array<{x: number, y: number, depth: number}>();
  q.push({x: startX, y: startY, depth: 0})

  while (q.length > 0) {
    const {x, y, depth} = q.shift() || {x: 0, y: 0, depth: 0};
    
    if (y === matrix.length-1 && x === matrix[y].length-1) return depth;

    if (visited.has(`${x}+${y}`)) {
      continue;
    }
    visited.add(`${x}+${y}`);

    for (let i = 0; i < dirs.length; i++) {
      const {xMod, yMod} = dirs[i];
      const newX = x+xMod;
      const newY = y+yMod;

      if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[newY].length && matrix[newY][newX] !== '#') {
        q.push({x: newX, y: newY, depth: depth+1});
      }
    }
  }

  return 0;
}
