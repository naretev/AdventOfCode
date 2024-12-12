import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const matrix = groups[0];

  let result = 0;
  const visited = new Set();

  const dirs = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]

  const exploreCrop = (startX: number, startY: number) => {
    let perimeter = 0;
    const cropSet =  new Set();

    const q = new Array<{x: number, y: number}>();
    q.push({x: startX, y: startY})

    const crop = matrix[startY].charAt(startX);

    while (q.length > 0) {
      const {x, y} = q.shift() || {x: 0, y: 0};

      if (visited.has(`${x}+${y}`)) {
        continue;
      }

      cropSet.add(`${x}+${y}`);
      visited.add(`${x}+${y}`);

      for (let i = 0; i < dirs.length; i++) {
        const {xMod, yMod} = dirs[i];
        const newX = x+xMod;
        const newY = y+yMod;

        if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[newY].length && matrix[newY].charAt(newX) === crop) {
          q.push({x: newX, y: newY});
        } else {
          perimeter++;
        }
      }
    }

    result += cropSet.size * perimeter;
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      if (!visited.has(`${x}+${y}`)) exploreCrop(x, y);
    }
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const matrix = groups[0];

  let result = 0;
  const visited = new Set();

  const dirs = [
    {xMod: 0, yMod: -1},
    {xMod: 1, yMod: 0},
    {xMod: 0, yMod: 1},
    {xMod: -1, yMod: 0},
  ]

  const exploreCrop = (startX: number, startY: number) => {
    let perimeter = 0;
    const perimeterMap = new Map<string, number[]>(); 
    const cropSet =  new Set();

    const q = new Array<{x: number, y: number}>();
    q.push({x: startX, y: startY})
    const crop = matrix[startY].charAt(startX);

    while (q.length > 0) {
      const {x, y} = q.shift() || {x: 0, y: 0};

      if (visited.has(`${x}+${y}`)) {
        continue;
      }

      cropSet.add(`${x}+${y}`);
      visited.add(`${x}+${y}`);

      for (let i = 0; i < dirs.length; i++) {
        const {xMod, yMod} = dirs[i];
        const newX = x+xMod;
        const newY = y+yMod;

        if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[newY].length && matrix[newY].charAt(newX) === crop) {
          q.push({x: newX, y: newY});
        } else {
          perimeter++;
          perimeterMap.set(`X=${newX}+${i}`, [...perimeterMap.get(`X=${newX}+${i}`) || [], newY]);
          perimeterMap.set(`Y=${newY}+${i}`, [...perimeterMap.get(`Y=${newY}+${i}`) || [], newX]);
        }
      }
    }

    perimeterMap.forEach((perimeterIndecies) => {
      perimeterIndecies.sort((a, b) => a - b);

      for (let i = 0; i < perimeterIndecies.length-1; i++) {
        if (perimeterIndecies[i] === perimeterIndecies[i+1]-1) perimeter--;
      }
    })

    result += cropSet.size * perimeter;
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      if (!visited.has(`${x}+${y}`)) exploreCrop(x, y);
    }
  }

  console.log(result);
}

main2();
