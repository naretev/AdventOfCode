import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const inputs1 = groups[0];

  let result = 0;

  const find = (target: number, numbers: number[], sum: number, index: number): boolean => {
    if (numbers.length === index) return sum === target;

    return find(target, numbers, sum * numbers[index], index+1)
      || find(target, numbers, sum + numbers[index], index+1)
  }

  for (let i = 0; i < inputs1.length; i++) {
    const [sum, nums] = inputs1[i].split(": ");
    const numbers = nums.split(" ").map(n => Number(n));
    const [firstNum] = numbers.splice(0, 1);

    if (find(Number(sum), numbers, firstNum, 0)) {
      result += Number(sum);
    }
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const inputs1 = groups[0];

  let result = 0;

  const find = (target: number, numbers: number[], sum: number, index: number): boolean => {
    if (numbers.length === index) return sum === target;

    return find(target, numbers, sum * numbers[index], index+1)
      || find(target, numbers, sum + numbers[index], index+1)
      || find(target, numbers, Number(`${sum}${numbers[index]}`), index+1)
  }

  for (let i = 0; i < inputs1.length; i++) {
    const [sum, nums] = inputs1[i].split(": ");
    const numbers = nums.split(" ").map(n => Number(n));
    const [firstNum] = numbers.splice(0, 1);

    if (find(Number(sum), numbers, firstNum, 0)) {
      result += Number(sum);
    }
  }

  console.log(result);
}

main2();
