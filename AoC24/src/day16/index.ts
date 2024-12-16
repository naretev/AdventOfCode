import { PriorityQueue, readLines } from "../util"

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

  let result = 0;

  const findLoswestScore = (startX: number, startY: number) => {
    const priorityQ = new PriorityQueue<{x: number, y: number, cost: number, dir: number}>((val1, val2) => val1.cost < val2.cost);

    priorityQ.push({x: startX, y: startY, cost: 0, dir: 1});
    const visited = new Set();

    while (!priorityQ.isEmpty()) {
      const {x, y, cost, dir} = priorityQ.pop() || {x: 0, y: 0, cost: 0, dir: 0}
      if (matrix[y][x] === 'E') return cost;

      if (visited.has(`${x}+${y}`)) continue;
      visited.add(`${x}+${y}`);

      for (let i = 0; i < dirs.length; i++) {
        const {xMod, yMod} = dirs[i];
        if (matrix[y+yMod][x+xMod] === '#') continue;

        const turnPenalty = i === dir ? 0 : 1000;
        const newCost = cost + 1 + turnPenalty;
        priorityQ.push({x: x+xMod, y: y+yMod, cost: newCost, dir: i})
      }
    }

    return 0;
  }
  
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 'S') result = findLoswestScore(x, y);
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

  let result = 0;

  const historyMap = new Map<string, {cost: number, x: number, y: number, dir: number}[]>();
  
  const findLoswestScore = (startX: number, startY: number) => {
    const priorityQ = new PriorityQueue<{x: number, y: number, cost: number, dir: number, prevX: number, prevY: number, prevDir: number}>((val1, val2) => val1.cost < val2.cost);

    priorityQ.push({x: startX, y: startY, cost: 0, dir: 1, prevX: startX, prevY: startY, prevDir: 1});

    while (!priorityQ.isEmpty()) {
      const {x, y, cost, dir, prevX, prevY, prevDir} = priorityQ.pop() || {x: 0, y: 0, cost: 0, dir: 0, prevX: 0, prevY: 0, prevDir: 0}

      if (historyMap.has(`${x}+${y}+${dir}`)) {
        const history = historyMap.get(`${x}+${y}+${dir}`) || [];
        if (history[0].cost < cost) continue;
        if (history[0].cost > cost) console.log("uh oh")

        historyMap.set(`${x}+${y}+${dir}`, [...history, {x: prevX, y: prevY, cost, dir: prevDir}])
        continue;
      } else {
        historyMap.set(`${x}+${y}+${dir}`, [{x: prevX, y: prevY, dir: prevDir, cost}]);
      }

      if (matrix[y][x] === 'E') continue;

      for (let i = 0; i < dirs.length; i++) {
        const {xMod, yMod} = dirs[i];
        if (matrix[y+yMod][x+xMod] === '#') continue;

        if (i === dir) {
          const newCost = cost + 1;
          priorityQ.push({x: x+xMod, y: y+yMod, cost: newCost, dir: i, prevX: x, prevY: y, prevDir: dir})
        } else {
          const newCost = cost + 1000;
          priorityQ.push({x, y, cost: newCost, dir: i, prevX: x, prevY: y, prevDir: dir})
        }
      }
    }
  }

  const findNumberOfTiles = (startX: number, startY: number): number => {
    const visitedSet = new Set();
    const resultSet = new Set();
    resultSet.add(`${startX}+${startY}`);

    let minCost = Infinity;
    
    for (let i = 0; i < dirs.length; i++) {
      const [start] = historyMap.get(`${startX}+${startY}+${i}`) || [];

      if (start !== undefined) minCost = Math.min(minCost, start.cost);
    }

    for (let i = 0; i < dirs.length; i++) {
      const [start] = historyMap.get(`${startX}+${startY}+${i}`) || [];

      if (start === undefined || start.cost > minCost) continue;

      const q = new Array<{x: number, y: number, dir: number}>();
      q.push({x: start.x, y: start.y, dir: start.dir});

      while (q.length > 0) {
        const {x, y, dir} = q.shift() || {x: 0, y: 0, dir: 0};

        if (visitedSet.has(`${x}+${y}+${dir}`)) continue;
        visitedSet.add(`${x}+${y}+${dir}`)
        
        resultSet.add(`${x}+${y}`);
        const history = historyMap.get(`${x}+${y}+${dir}`) || [];

        for (let j = 0; j < history.length; j++) {
          const h = history[j];

          q.push({x: h.x, y: h.y, dir: h.dir});
        }
      }
    }

    return resultSet.size;
  }
  
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 'S') findLoswestScore(x, y);
    }
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 'E') result = findNumberOfTiles(x, y);
    }
  }

  console.log(result);
}

main2();
