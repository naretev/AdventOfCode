import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const inputs1 = groups[0];

  let result = 0;

  const indexMods = [
    {xMod: 1, yMod: 1},
    {xMod: 1, yMod: 0},
    {xMod: 1, yMod: -1},
    {xMod: 0, yMod: -1},
    {xMod: -1, yMod: -1},
    {xMod: -1, yMod: 0},
    {xMod: -1, yMod: 1},
    {xMod: 0, yMod: 1},
  ];

  const countXmas = (x: number, y: number) => {
    for (let i = 0; i < indexMods.length; i++) {
      const { xMod, yMod } = indexMods[i];
      if (xmasExistsInDirection(x+xMod, y+yMod, xMod, yMod, 1)) {
        result++;
      }
    }
  }

  const xmasExistsInDirection = (x: number, y: number, xMod: number, yMod: number, depth: number): boolean => {
    if (x < 0 || x >= inputs1.length || y < 0 || y >= inputs1[x].length) return false;

    if (depth === 1 && inputs1[x].charAt(y) === 'M') {
      return xmasExistsInDirection(x+xMod, y+yMod, xMod, yMod, depth+1)
    } else if (depth === 2 && inputs1[x].charAt(y) === 'A') {
      return xmasExistsInDirection(x+xMod, y+yMod, xMod, yMod, depth+1)
    } else if (depth === 3 && inputs1[x].charAt(y) === 'S') {
      return true;
    } else {
      return false;
    }
  }

  for (let x = 0; x < inputs1.length; x++) {
    for (let y = 0; y < inputs1[x].length; y++) {
      const letter = inputs1[x].charAt(y);
      if (letter === 'X') {
        countXmas(x, y);
      }
    }
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const inputs = groups[0];

  let result = 0;

  const isXmas = (x: number, y: number): boolean => {
    if (x+1 < 0
      || x+1 >= inputs.length
      || y+1 < 0
      || y+1 >= inputs[x+1].length
      || x-1 < 0
      || x-1 >= inputs.length
      || y-1 < 0
      || y-1 >= inputs[x-1].length
    ) return false;

    return  (
      ((inputs[x+1].charAt(y+1) === 'M' && inputs[x-1].charAt(y-1) === 'S')
        || (inputs[x-1].charAt(y-1) === 'M' && inputs[x+1].charAt(y+1) === 'S'))
      && ((inputs[x+1].charAt(y-1) === 'M' && inputs[x-1].charAt(y+1) === 'S')
        || (inputs[x-1].charAt(y+1) === 'M' && inputs[x+1].charAt(y-1) === 'S'))
    )
  }

  for (let x = 0; x < inputs.length; x++) {
    for (let y = 0; y < inputs[x].length; y++) {
      const letter = inputs[x].charAt(y);
      if (letter === 'A') {
        if (isXmas(x, y)) result++;
      }
    }
  }

  console.log(result);
}

main2();
