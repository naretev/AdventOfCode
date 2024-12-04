
export const solution1 = (inputs: string[][]) => {
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

export const solution2 = (inputs: string[][]) => {
  const map = new Map<string, string[]>();

  const instructions = inputs[0][0];

  const startPos: string[] = [];
  for (let i = 0; i < inputs[1].length; i++) {
    const str = inputs[1][i];
    
    const [key, value] = str.split(' = ');
    map.set(key, value.replace('(', '').replace(')', '').split(', '));
    if (key.endsWith('A')) startPos.push(key);
  }

  const hasEndPosition = (pos: string[]): boolean => {
    for (let i = 0; i < pos.length; i++) {
      if (pos[i].endsWith('Z')) return true;
    }
    return false;
  }

  let iterations = 0;

  const followInstructions = (ins: string, i: number, pos: string[]) => {
    if (i === ins.length) return pos;

    const nextPos: string[] = [];
    for (let j = 0; j < pos.length; j++) {
      const currOptions = map.get(pos[j]) || [];
      if (ins.charAt(i) === 'L') {
        nextPos.push(currOptions[0]);
      } else {
        nextPos.push(currOptions[1]);
      }
    }

    return followInstructions(ins, i+1, nextPos);
  }

  const iterationsToEndPos = []
  let positions = [...startPos];
  while (iterationsToEndPos.length < startPos.length) {
    iterations++;
    positions = followInstructions(instructions, 0, positions);

    if (hasEndPosition(positions)) {
      iterationsToEndPos.push(iterations);
    }
  }

  iterationsToEndPos.sort((a, b) => b - a)

  let index = 0;
  let prediction = 0;
  outer: while (true) {
    index++;
    prediction = iterationsToEndPos[0] * index;

    for (let i = 1; i < iterationsToEndPos.length; i++) {
      if (prediction % iterationsToEndPos[i] !== 0) {
        break;
      }
      if (i === iterationsToEndPos.length-1) break outer;
    }
  }

  console.log(prediction * instructions.length);
}
