import * as readline from 'readline';

export const readLines = async (): Promise<string[][]> => {
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
      } else if (input.toLowerCase() === 'next') {
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
