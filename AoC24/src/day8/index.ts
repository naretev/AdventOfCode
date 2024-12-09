import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const matrix = groups[0];

  let result = 0;

  const isAntinode = (targetX: number, targetY: number): boolean => {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        const antenna = matrix[y].charAt(x);
        const sameNode = y === targetY && x === targetX;
        if (antenna !== '.' && antenna !== '#' && !sameNode) {
          const xMod = x - targetX;
          const yMod = y - targetY;
          if (x+xMod >= 0 && x+xMod < matrix[y].length && y+yMod >= 0 && y+yMod < matrix.length && matrix[y+yMod].charAt(x+xMod) === antenna) {
            return true;
          }
        }
      } 
    }

    return false;
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (isAntinode(x, y, )) result++;
    } 
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const matrix = groups[0];

  const antinodeSet = new Set();

  const markAntidotes = (targetX: number, targetY: number) => {
    const targetAntenna = matrix[targetY].charAt(targetX);
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        const antenna = matrix[y].charAt(x);
        const sameNode = y === targetY && x === targetX;
        if (antenna === targetAntenna && !sameNode) {
          const xMod = targetX - x;
          const yMod = targetY - y;
          let i = 1;
          while (x+xMod*i >= 0 && x+xMod*i < matrix[y].length && y+yMod*i >= 0 && y+yMod*i < matrix.length) {
            antinodeSet.add(`${x+xMod*i}+${y+yMod*i}`);
            i++;
          }
        }
      } 
    }
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y].charAt(x) !== '.' && matrix[y].charAt(x) !== '#') {
        markAntidotes(x, y);
      }
    } 
  }

  console.log(antinodeSet.size);
}

main2();
