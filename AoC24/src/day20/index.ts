import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const inputs1 = groups[0];
    
  const matrix = new Array<Array<string>>();

  for (let i = 0; i < inputs1.length; i++) {
    matrix[i] = [...inputs1[i]];
  }

  const dirs = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]
  
  const bfs = (startX: number, startY: number, distanceMatrix: number[][]) => {
    const visited = new Set();
    const q = new Array<{x: number, y: number, depth: number}>();
    q.push({x: startX, y: startY, depth: 0})

    while (q.length > 0) {
      const {x, y, depth} = q.shift() || {x: 0, y: 0, depth: 0};

      if (visited.has(`${x}+${y}`)) {
        continue;
      }
      visited.add(`${x}+${y}`);

      distanceMatrix[y][x] = depth;

      for (let i = 0; i < dirs.length; i++) {
        const {xMod, yMod} = dirs[i];
        const newX = x+xMod;
        const newY = y+yMod;

        if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[newY].length && matrix[newY][newX] !== '#') {
          q.push({x: newX, y: newY, depth: depth+1});
        }
      }
    }
  }

  let startX = 0;
  let startY = 0;

  const distanceToE = Array.from({ length: matrix.length }, () => Array(matrix[0].length).fill(-1));
  const distanceToS = Array.from({ length: matrix.length }, () => Array(matrix[0].length).fill(-1));

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 'E') {
        bfs(x, y, distanceToE);
      }
      if (matrix[y][x] === 'S') {
        bfs(x, y, distanceToS);

        startX = x;
        startY = y;
      }
    }
  }

  const shortestPath = distanceToE[startY][startX];

  let result = 0;

  const points = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] !== '#') {
        points.push({ y, x });
      }
    }
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i+1; j < points.length; j++) {
      const { x: iX, y: iY } = points[i];
      const { x: jX, y: jY } = points[j];

      const xDiff = Math.abs(iX - jX);
      const yDiff = Math.abs(iY - jY);
      const cheatDistance = xDiff + yDiff;

      if (cheatDistance <= 2) {
        const iToS = distanceToS[iY][iX];
        const iToE = distanceToE[iY][iX];

        const jToS = distanceToS[jY][jX];
        const jToE = distanceToE[jY][jX];

        const pathLength = Math.min(iToS + jToE, jToS + iToE) + cheatDistance;
        const timeSaved = shortestPath - pathLength;
        if (timeSaved >= 100) result++;
      }
    }
  }

  console.log(result);
}


// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const inputs1 = groups[0];
    
  const matrix = new Array<Array<string>>();

  for (let i = 0; i < inputs1.length; i++) {
    matrix[i] = [...inputs1[i]];
  }

  const dirs = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]
  
  const bfs = (startX: number, startY: number, distanceMatrix: number[][]) => {
    const visited = new Set();
    const q = new Array<{x: number, y: number, depth: number}>();
    q.push({x: startX, y: startY, depth: 0})

    while (q.length > 0) {
      const {x, y, depth} = q.shift() || {x: 0, y: 0, depth: 0};

      if (visited.has(`${x}+${y}`)) {
        continue;
      }
      visited.add(`${x}+${y}`);

      distanceMatrix[y][x] = depth;

      for (let i = 0; i < dirs.length; i++) {
        const {xMod, yMod} = dirs[i];
        const newX = x+xMod;
        const newY = y+yMod;

        if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[newY].length && matrix[newY][newX] !== '#') {
          q.push({x: newX, y: newY, depth: depth+1});
        }
      }
    }
  }

  let startX = 0;
  let startY = 0;

  const distanceToE = Array.from({ length: matrix.length }, () => Array(matrix[0].length).fill(-1));
  const distanceToS = Array.from({ length: matrix.length }, () => Array(matrix[0].length).fill(-1));

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 'E') {
        bfs(x, y, distanceToE);
      }
      if (matrix[y][x] === 'S') {
        bfs(x, y, distanceToS);

        startX = x;
        startY = y;
      }
    }
  }

  const shortestPath = distanceToE[startY][startX];

  let result = 0;

  const points = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] !== '#') {
        points.push({ y, x });
      }
    }
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i+1; j < points.length; j++) {
      const { x: iX, y: iY } = points[i];
      const { x: jX, y: jY } = points[j];

      const xDiff = Math.abs(iX - jX);
      const yDiff = Math.abs(iY - jY);
      const cheatDistance = xDiff + yDiff;

      if (cheatDistance <= 20) {
        const iToS = distanceToS[iY][iX];
        const iToE = distanceToE[iY][iX];

        const jToS = distanceToS[jY][jX];
        const jToE = distanceToE[jY][jX];

        const pathLength = Math.min(iToS + jToE, jToS + iToE) + cheatDistance;
        const timeSaved = shortestPath - pathLength;
        if (timeSaved >= 100) result++;
      }
    }
  }

  console.log(result);
}

main2();
