import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const inputs = groups[0];

  const width = 101;
  const length = 103;
  const seconds = 100;

  // % is broken in JavaScript for negative values, because why wouldn't it be
  const mod = (n: number, m: number) => {
    return ((n % m) + m) % m;
  }

  let quadrant1 = 0;
  let quadrant2 = 0;
  let quadrant3 = 0;
  let quadrant4 = 0;

  for (let i = 0; i < inputs.length; i++) {
    const [posRaw, velRaw] = inputs[i].split(' ');
    const [x, y] = posRaw.split('=')[1].split(',').map(n => Number(n));
    const [xVel, yVel] = velRaw.split('=')[1].split(',').map(n => Number(n));

    const newX = mod(x + xVel*seconds, width)
    const newY = mod(y + yVel*seconds, length)

    if (newX < (Math.floor(width/2))) {
      if (newY < Math.floor(length/2)) {
        quadrant1++;
      } else if (newY > Math.floor(length/2)) {
        quadrant2++;
      }
    } else if (newX > Math.floor(width/2)) {
      if (newY < Math.floor(length/2)) {
        quadrant3++;
      } else if (newY > Math.floor(length/2)) {
        quadrant4++;
      }
    }
  }

  console.log(quadrant1*quadrant2*quadrant3*quadrant4);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const inputs = groups[0];

  const width = 101;
  const length = 103;

  // % is broken in JavaScript for negative values, because why wouldn't it be
  const mod = (n: number, m: number) => {
    return ((n % m) + m) % m;
  }

  const posArr = new Array<{x: number, y: number, xVel: number, yVel: number}>()
  
  for (let i = 0; i < inputs.length; i++) {
    const [posRaw, velRaw] = inputs[i].split(' ');
    const [x, y] = posRaw.split('=')[1].split(',').map(n => Number(n));
    const [xVel, yVel] = velRaw.split('=')[1].split(',').map(n => Number(n));

    posArr.push({x, y, xVel, yVel});
  }

  const robots = posArr.length;
  let seconds = 0;

  outer: while (true) {
    seconds++;
    const posSet = new Set<string>();

    for (let i = 0; i < robots; i++) {
      const {x, y, xVel, yVel} = posArr[i];
      
      const newX = mod(x + xVel, width);
      const newY = mod(y + yVel, length);

      posArr[i] = {x: newX, y: newY, xVel, yVel};

      posSet.add(`${newX}+${newY}`);
    }

    // Christmas tree shows up when all robots have unique positions
    if (robots === posSet.size) {
      break outer;
    }
  }

  console.log(seconds);
}

main2();
