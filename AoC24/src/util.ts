import * as readline from 'readline';

export const readLines = async (): Promise<string[][]> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const inputs: string[][] = new Array();
    inputs[0] = new Array();
    let index = 0;
    console.log("Enter multiple lines (type 'next' to create a new group or 'exit' to finish):");

    rl.on('line', (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
      } else if (input.toLowerCase() === 'next') {
        index++;
        inputs[index] = new Array();
      } else {
        inputs[index].push(input);
      }
    });

    rl.on('close', () => {
      console.log('Input structure:')
      console.log(inputs.map(input => input.length));
      resolve(inputs);
    });
  });
}
