import * as readline from 'readline';

export const readLines = async (): Promise<string[][]> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const groups: string[][] = new Array();
    groups[0] = new Array();
    let index = 0;
    console.log("Enter multiple lines (type '' to create a new group or 'exit' to finish):");

    rl.on('line', (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
      } else if (input.toLowerCase() === '') {
        index++;
        groups[index] = new Array();
      } else {
        groups[index].push(input);
      }
    });

    rl.on('close', () => {
      console.log('Input structure:')
      console.log(groups.map(input => input.length));
      resolve(groups);
    });
  });
}
