import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();

  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const inputs = groups[0];

  let matchArr: string[] = [];

  for (let i = 0; i < inputs.length; i++) {
    const matches =  inputs[i].match(regex);
    if (matches) matchArr = [...matchArr, ...matches];
  }

  let result = 0;
  for (let i = 0; i < matchArr.length; i++) {
    const element = matchArr[i];
    const numbers = element.replace('mul(', '').replace(')', '').split(',');
    result += parseInt(numbers[0], 10) * parseInt(numbers[1], 10);
  }

  console.log(result)
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();

  const regex = /(mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\))/g;
  const inputs = groups[0];

  let matchArr: string[] = [];

  for (let i = 0; i < inputs.length; i++) {
    const matches =  inputs[i].match(regex);
    if (matches) matchArr = [...matchArr, ...matches];
  }

  let result = 0;
  let active = true;
  for (let i = 0; i < matchArr.length; i++) {
    const element = matchArr[i];
    if (element === 'do()') {
      active = true;
    } else if (element === "don't()") {
      active = false;
    } else if (active) {
      const numbers = element.replace('mul(', '').replace(')', '').split(',');
      result += parseInt(numbers[0], 10) * parseInt(numbers[1], 10);
    }
  }

  console.log(result)
}

main2();
