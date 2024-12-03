import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();

  const inputs = groups[0];

  const firstArr: number[] = []
  const secondArr: number[] = []

  for (let i = 0; i < inputs.length; i++) {
    const [firstElement, secondElement] = inputs[i].split('   ');
    firstArr.push(Number(firstElement));
    secondArr.push(Number(secondElement));
  }

  firstArr.sort();
  secondArr.sort();

  let result = 0;
  for (let i = 0; i < firstArr.length; i++) {
    result += Math.abs(firstArr[i] - secondArr[i]);
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();

  const inputs = groups[0];

  const firstArr: number[] = []
  const secondArr: number[] = []

  for (let i = 0; i < inputs.length; i++) {
    const [firstElement, secondElement] = inputs[i].split('   ');
    firstArr.push(Number(firstElement));
    secondArr.push(Number(secondElement));
  }

  let result = 0;
  for (let i = 0; i < firstArr.length; i++) {
    let count = 0;
    for (let j = 0; j < secondArr.length; j++) {
      if (secondArr[j] === firstArr[i]) count++;
    }
    result += firstArr[i]*count;
  }

  console.log(result);
}

main2();
