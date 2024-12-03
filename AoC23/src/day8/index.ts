
export const solution = (inputs: string[][]) => {
  const map = new Map<string, string[]>();

  const instructions = inputs[0][0];

  for (let i = 0; i < inputs[1].length; i++) {
    const str = inputs[1][i];
    
    const [key, value] = str.split(' = ');
    map.set(key, value.replace('(', '').replace(')', '').split(', '));
  }

  const followInstructions = (ins: string, i: number, position: string) => {
    if (i === ins.length) return position;

    const currOptions = map.get(position) || [];
    if (ins.charAt(i) === 'L') {
      return followInstructions(ins, i+1, currOptions[0])
    } else {
      return followInstructions(ins, i+1, currOptions[1])
    }
  }

  let position = 'AAA';
  let iterations = 0;
  while (position !== 'ZZZ') {
    iterations++;
    position = followInstructions(instructions, 0, position);
  }

  console.log(iterations * instructions.length);
}
