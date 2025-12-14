import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  let result = 0;
  
  for (let i = 0; i < groups.length; i++) {
    const input = groups[i];
    const [buttonA, aValues] = input[0].split(': ');
    const aVals = aValues.split(', ');
    const A = {X: Number(aVals[0].split('+')[1]), Y: Number(aVals[1].split('+')[1])};

    const [buttonB, bValues] = input[1].split(': ');
    const bVals = bValues.split(', ');
    const B = {X: Number(bVals[0].split('+')[1]), Y: Number(bVals[1].split('+')[1])};

    
    const [prize, pValues] = input[2].split(': ');
    const pVals = pValues.split(', ');
    const P = {X: Number(pVals[0].split('=')[1]), Y: Number(pVals[1].split('=')[1])};

    let X1 = 0;
    let Y1 = 0;

    let aIndex = 1;
    let cost = Infinity;
    while (X1 < P.X && Y1 < P.Y && aIndex < 100) {
      const X2 = P.X - X1;
      const Y2 = P.Y - Y1;

      if (X2 / B.X === Y2 / B.Y) {
        console.log("A presses:", aIndex-1, "B presses:", X2 / B.X)
        cost = Math.min(cost, (aIndex-1)*3 + X2 / B.X);
      }

      X1 = aIndex * A.X
      Y1 = aIndex * A.Y
      aIndex++;
    }

    if (cost !== Infinity) {result += cost; console.log(cost)}
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  let result = 0;
  
  for (let i = 0; i < groups.length; i++) {
    const input = groups[i];
    const [buttonA, aValues] = input[0].split(': ');
    const aVals = aValues.split(', ');
    const A = {X: Number(aVals[0].split('+')[1]), Y: Number(aVals[1].split('+')[1])};

    const [buttonB, bValues] = input[1].split(': ');
    const bVals = bValues.split(', ');
    const B = {X: Number(bVals[0].split('+')[1]), Y: Number(bVals[1].split('+')[1])};

    
    const [prize, pValues] = input[2].split(': ');
    const pVals = pValues.split(', ');
    const P = {
      X: Number(pVals[0].split('=')[1]) + 10000000000000,
      Y: Number(pVals[1].split('=')[1]) + 10000000000000
    };

    const m1 = A.Y / A.X;
    const m2 = B.Y / B.X;

    if (m1 === m2) {
      continue;
    }

    const intersectX = (m1 * P.X - P.Y) / (m1 - m2);

    const intersectY = m2 * intersectX;

    if (intersectX > 0 && intersectX < P.X && intersectY > 0 && intersectY < P.Y
    ) {
      let X1 = 0;
      let Y1 = 0;
  
      let aIndex = Math.round((P.X - intersectX) / A.X - 10);
      const aIndexCeiling = aIndex + 20
      let cost = Infinity;
      while (X1 < P.X && Y1 < P.Y && aIndex < aIndexCeiling) {
        const X2 = P.X - X1;
        const Y2 = P.Y - Y1;
  
        if (X2 / B.X === Y2 / B.Y) {
          if (aIndex % 1 === 0 && X2 / B.X % 1 === 0) {
            cost = Math.min(cost, (aIndex-1)*3 + X2 / B.X);
          }
        }

        X1 = aIndex * A.X
        Y1 = aIndex * A.Y
        aIndex++;
      }

      if (cost !== Infinity) result += cost;
    }
  }

  console.log(`${result}`);
}

main2();
