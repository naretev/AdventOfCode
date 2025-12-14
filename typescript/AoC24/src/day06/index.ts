import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const matrix = groups[0];

  const directions = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]

  const incDir = (directionIndex: number) => {
    return directionIndex === 3 ? 0 : directionIndex+1;
  }

  const obsSet = new Set();
  let startPos = {x: 0, y: 0}
  for (let y = 0; y < matrix.length; y++) {
    const line = matrix[y];
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y].charAt(x);
      if (cell === '^') {
        startPos = {x, y};
      }
      if (cell === '#') {
        obsSet.add(`${y}+${x}`);
      }
    }
  }

  const posSet = new Set();

  const followPath = (y: number, x: number, i: number) => {
    while (true) {
      const {xMod, yMod} = directions[i];
      if (y+yMod < 0 || y+yMod >= matrix.length || x+xMod < 0 || x+xMod >= matrix[y].length) return;

      if (obsSet.has(`${y+yMod}+${x+xMod}`)) {
        i = incDir(i);
      } else {
        posSet.add(`${y}+${x}`);
        x += xMod;
        y += yMod;
      }
    }
  }

  followPath(startPos.y, startPos.x, 0)
  console.log(posSet.size+1);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const matrix = groups[0];

  const directions = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]

  const incDir = (directionIndex: number) => {
    return directionIndex === 3 ? 0 : directionIndex+1;
  }

  const obsSet = new Set();
  let startPos = {x: 0, y: 0}
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y].charAt(x);
      if (cell === '^') {
        startPos = {x, y};
      }
      if (cell === '#') {
        obsSet.add(`${y}+${x}`);
      }
    }
  }

  const followPath = (y: number, x: number, i: number) => {
    const visited = new Set();
    while (true) {
      const {xMod, yMod} = directions[i];
      if (y+yMod < 0 || y+yMod >= matrix.length || x+xMod < 0 || x+xMod >= matrix[y].length) return false;

      if (visited.has(`${y}+${x}+${i}`)) return true;
      visited.add(`${y}+${x}+${i}`)

      if (obsSet.has(`${y+yMod}+${x+xMod}`)) {
        i = incDir(i);
      } else {
        x += xMod;
        y += yMod;
      }
    }
  }

  let result = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y].charAt(x);
      if (cell !== '^' && cell !== '#') {
        obsSet.add(`${y}+${x}`);
        if (followPath(startPos.y, startPos.x, 0)) result++;
        obsSet.delete(`${y}+${x}`);
      }
    }
  }

  console.log(result);
}

main2();
