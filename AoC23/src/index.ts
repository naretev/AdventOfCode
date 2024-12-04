import * as readline from 'readline';
import { solution1, solution2 } from './day8';

const readLines = async (): Promise<string[][]> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const result: string[][] = new Array();
    result[0] = new Array();
    let index = 0;
    console.log("Enter multiple lines (type 'next' to create a new group or 'exit' to finish):");

    rl.on('line', (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
      } else if (input.toLowerCase() === '') {
        index++;
        result[index] = new Array();
      } else {
        result[index].push(input);
      }
    });

    rl.on('close', () => {
      resolve(result);
    });
  });
}

// const main = async () => {
//   const inputs = await readLines();

//   const regex = /(mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\))/g;
//   const string = inputs[0];

//   let str: string[] = [];

//   for (let i = 0; i < string.length; i++) {
//     const x =  string[i].match(regex);
//     if (x)
//     str = [...str, ...x];
//   }

//   console.log(str);

//   let result = 0;
//   let active = true;
//   for (let i = 0; i < str.length; i++) {
//     const element = str[i];
//     console.log(element)
//     if (element === 'do()') {
//       active = true;
//     } else if (element === "don't()") {
//       active = false;
//     } else if (active) {
//       const numbers = element.replace('mul(', '').replace(')', '').split(',');
//       result += parseInt(numbers[0], 10) * parseInt(numbers[1], 10);
//     }
//   }

//   console.log(result)
// }


const main = async () => {
    const inputs = await readLines();
  
    solution2(inputs);
}

main();
