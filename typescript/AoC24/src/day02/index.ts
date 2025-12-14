import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();

  const inputs = groups[0];

  const isSafe = (numbers: number[]): boolean => {
    if (numbers.length < 2) return true;

    let isAscending = true;
    let isDescending = true;

    for (let i = 1; i < numbers.length; i++) {
      const diff = Math.abs(numbers[i-1] - numbers[i]);
      if (diff < 1 || diff > 3) return false;
      if (numbers[i-1] < numbers[i]) {
        isDescending = false;
      } else {
        isAscending = false;
      }
    }

    return isAscending || isDescending;
  }

  let result = 0;
  for (let i = 0; i < inputs.length; i++) {
    const numbers = inputs[i].split(' ').map(str => Number(str));
    if (isSafe(numbers)) result++;
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();

  const inputs = groups[0];

  const isSafe = (numbers: number[]): boolean => {
    if (numbers.length < 2) return true;

    let isAscending = true;
    let isDescending = true;

    for (let i = 1; i < numbers.length; i++) {
      const diff = Math.abs(numbers[i-1] - numbers[i]);
      if (diff < 1 || diff > 3) return false;
      if (numbers[i-1] < numbers[i]) {
        isDescending = false;
      } else {
        isAscending = false;
      }
    }

    return isAscending || isDescending;
  }

  let result = 0;
  for (let i = 0; i < inputs.length; i++) {
    const numbers = inputs[i].split(' ').map(str => Number(str));
    if (isSafe(numbers)) {
      result++;
    } else {
      for (let i = 0; i < numbers.length; i++) {
        const subArr = [...numbers];
        subArr.splice(i, 1);
        if (isSafe(subArr)) {
          result++;
          break;
        }
      }
    }
  }

  console.log(result);
}

main2();
