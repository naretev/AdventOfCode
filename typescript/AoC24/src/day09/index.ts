import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const inputs = groups[0];
  const input = inputs[0];

  const parsedInput: number[] = []

  let blockValue = 0;
  for (let i = 0; i < input.length; i++) {
    const isEven = i % 2 === 0;
    const val = Number(input[i]);

    if (isEven) {
      for (let j = 0; j < val; j++) {
        parsedInput.push(blockValue);
      }
      blockValue++;
    } else {
      for (let j = 0; j < val; j++) {
        parsedInput.push(-1);
      }
    }
  }

  let result = 0;
  let leftIndex = 0;
  let rightIndex = parsedInput.length-1;
  let resultArray: number[] = [];
  outer: while (leftIndex <= rightIndex) {
    while (parsedInput[leftIndex] !== -1) {
      resultArray.push(parsedInput[leftIndex]);
      if (leftIndex === rightIndex) break outer;
      leftIndex++;
    }

    while (parsedInput[rightIndex] === -1) {
      if (leftIndex === rightIndex) break outer;
      rightIndex--;
    }

    const charToMove = parsedInput[rightIndex];
    resultArray.push(charToMove);

    rightIndex--;
    leftIndex++;
  }

  for (let i = 0; i < resultArray.length; i++) {
    result += Number(resultArray[i])*i;    
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const inputs = groups[0];
  const input = inputs[0];

  const parsedInput: number[] = []

  let blockValue = 0;
  for (let i = 0; i < input.length; i++) {
    const isEven = i % 2 === 0;
    const val = Number(input[i]);

    if (isEven) {
      for (let j = 0; j < val; j++) {
        parsedInput.push(blockValue);
      }
      blockValue++;
    } else {
      for (let j = 0; j < val; j++) {
        parsedInput.push(-1);
      }
    }
  }

  let result = 0;
  let rightIndex = parsedInput.length-1;
  while (rightIndex > 0) {
    let leftIndex = 0;
    let blockSize = 0;
    while (parsedInput[rightIndex] === -1) {
      rightIndex--;
    }
    const blockIndex = parsedInput[rightIndex];
    while (parsedInput[rightIndex] === blockIndex) {
      blockSize++;
      rightIndex--;
    }

    let gapSize = 0;
    while (gapSize < blockSize && leftIndex < rightIndex+2) {
      gapSize = 0;
      while (parsedInput[leftIndex] !== -1 && leftIndex < rightIndex+2) {
        leftIndex++;
      }

      while (parsedInput[leftIndex] === -1 && leftIndex < rightIndex+2) {
        leftIndex++;
        gapSize++;
      }
    }

    if (leftIndex > rightIndex+1 || gapSize < blockSize) {
      continue;
    }

    const tempLeft = leftIndex - gapSize;
    const tempRight = rightIndex + blockSize;
    for (let i = 0; i < blockSize; i++) {
      parsedInput[tempLeft+i] = parsedInput[tempRight-i];
      parsedInput[tempRight-i] = -1;
    }
  }

  for (let i = 0; i < parsedInput.length; i++) {
    if (parsedInput[i] !== -1) result += parsedInput[i]*i;
  }

  console.log(result);
}

main2();
