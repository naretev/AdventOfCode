import { readLines } from "../util"

const main = async () => {
  const inputs = await readLines();

  const regex = /(mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\))/g;
  const input = inputs[0];

  let str: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const matches =  input[i].match(regex);
    if (matches) str = [...str, ...matches];
  }

  let result = 0;
  let active = true;
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
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

main();
