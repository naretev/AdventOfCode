import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const matrix = groups[0];

  const dirs = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]

  let result = 0;

  const findScore = (startX: number, startY: number, ) => {
    const resultSet = new Set();
    const q = new Array<{x: number, y: number}>();
    q.push({x: startX, y: startY})

    while (q.length > 0) {
      const {x, y} = q.shift() || {x: 0, y: 0};
      const currVal = Number(matrix[y].charAt(x));

      if (currVal === 9) {
        resultSet.add(`${x}${y}`);
        continue;
      }

      for (let i = 0; i < dirs.length; i++) {
        const {xMod, yMod} = dirs[i];
        const newX = x+xMod;
        const newY = y+yMod;

        if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[newY].length && Number(matrix[newY].charAt(newX)) === currVal+1) {
          q.push({x: newX, y: newY});
        }
      }
    }
    result += resultSet.size;
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y].charAt(x) === '0') {
        findScore(x, y)
      }
    }
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const matrix = groups[0];

  const dirs = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]

  let result = 0;

  const findRating = (startX: number, startY: number, ) => {
    const q = new Array<{x: number, y: number}>();
    q.push({x: startX, y: startY})

    while (q.length > 0) {
      const {x, y} = q.shift() || {x: 0, y: 0};
      const currVal = Number(matrix[y].charAt(x));

      if (currVal === 9) {
        result++;
        continue;
      }

      for (let i = 0; i < dirs.length; i++) {
        const {xMod, yMod} = dirs[i];
        const newX = x+xMod;
        const newY = y+yMod;

        if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[newY].length && Number(matrix[newY].charAt(newX)) === currVal+1) {
          q.push({x: newX, y: newY});
        }
      }
    }
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y].charAt(x) === '0') {
        findRating(x, y)
      }
    }
  }

  console.log(result);
}

main2();
