import { readLines } from "../util"

type NumPad = {
  ['7']: {x: 0, y: 0},
  ['8']: {x: 1, y: 0},
  ['9']: {x: 2, y: 0},
  ['4']: {x: 0, y: 1},
  ['5']: {x: 1, y: 1},
  ['6']: {x: 2, y: 1},
  ['1']: {x: 0, y: 2},
  ['2']: {x: 1, y: 2},
  ['3']: {x: 2, y: 2},
  ['0']: {x: 1, y: 3},
  ['A']: {x: 2, y: 3},
}

const numPad: NumPad = {
  ['7']: {x: 0, y: 0},
  ['8']: {x: 1, y: 0},
  ['9']: {x: 2, y: 0},
  ['4']: {x: 0, y: 1},
  ['5']: {x: 1, y: 1},
  ['6']: {x: 2, y: 1},
  ['1']: {x: 0, y: 2},
  ['2']: {x: 1, y: 2},
  ['3']: {x: 2, y: 2},
  ['0']: {x: 1, y: 3},
  ['A']: {x: 2, y: 3},
}

type ArrowPad = {
  ['^']: {x: 1, y: 0},
  ['A']: {x: 2, y: 0},
  ['<']: {x: 0, y: 1},
  ['v']: {x: 1, y: 1},
  ['>']: {x: 2, y: 1},
}

const arrowPad: ArrowPad = {
  ['^']: {x: 1, y: 0},
  ['A']: {x: 2, y: 0},
  ['<']: {x: 0, y: 1},
  ['v']: {x: 1, y: 1},
  ['>']: {x: 2, y: 1},
}

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const inputs = groups[0];

  let result = 0;

  const createString = (char: string, amount: number) => {
    let str = '';
    for (let i = 0; i < Math.abs(amount); i++) {
      str += char;
    }
    return str;
  }

  const findArrowPadInstructions = (input: string, index: number, instructions: string, position: keyof ArrowPad, resultArr: string[]) => {
    if (index === input.length) {
      resultArr.push(instructions);
      return;
    }
    const target = input.charAt(index) as keyof ArrowPad;
    
    const positionC = arrowPad[position];
    const targetC = arrowPad[target];

    const xDiff = targetC.x - positionC.x;
    const yDiff = targetC.y - positionC.y;

    const canArmMoveOutOfBounds =  (targetC.x === 0 || positionC.x === 0) && (targetC.y === 0 || positionC.y === 0);

    if (!canArmMoveOutOfBounds && xDiff !== 0 && yDiff !== 0) {
      let yIns = '';
      if (yDiff > 0) {
        yIns += createString('v', yDiff)
      }
      if (yDiff < 0) {
        yIns += createString('^', yDiff)
      }

      let xIns = '';
      if (xDiff > 0) {
        xIns += createString('>', xDiff)
      }
      if (xDiff < 0) {
        xIns += createString('<', xDiff)
      }
      
      findArrowPadInstructions(input, index+1, instructions + xIns + yIns + 'A', target, resultArr)
      findArrowPadInstructions(input, index+1, instructions + yIns + xIns + 'A', target, resultArr)
    } else {
      if (xDiff > 0) {
        instructions += createString('>', xDiff)
      }
      
      if (yDiff > 0) {
        instructions += createString('v', yDiff)
      }

      if (xDiff < 0) {
        instructions += createString('<', xDiff)
      }
      
      if (yDiff < 0) {
        instructions += createString('^', yDiff)
      }

      findArrowPadInstructions(input, index+1, instructions + 'A', target, resultArr);
    }
  }

  const findNumPadInstructions = (input: string, index: number, instructions: string, position: keyof NumPad, resultArr: string[]) => {
    if (index === input.length) {
      resultArr.push(instructions);
      return;
    }
    const target = input.charAt(index) as keyof NumPad;
    
    const positionC = numPad[position];
    const targetC = numPad[target];

    const xDiff = targetC.x - positionC.x;
    const yDiff = targetC.y - positionC.y;

    const canArmMoveOutOfBounds =  (targetC.x === 0 || positionC.x === 0) && (targetC.y === 3 || positionC.y === 3);

    if (!canArmMoveOutOfBounds && xDiff !== 0 && yDiff !== 0) {
      let yIns = '';
      if (yDiff > 0) {
        yIns += createString('v', yDiff)
      }
      if (yDiff < 0) {
        yIns += createString('^', yDiff)
      }

      let xIns = '';
      if (xDiff > 0) {
        xIns += createString('>', xDiff)
      }
      if (xDiff < 0) {
        xIns += createString('<', xDiff)
      }
      
      findNumPadInstructions(input, index+1, instructions + xIns + yIns + 'A', target, resultArr)
      findNumPadInstructions(input, index+1, instructions + yIns + xIns + 'A', target, resultArr)
    } else {
      if (xDiff > 0) {
        instructions += createString('>', xDiff)
      }
      
      if (yDiff < 0) {
        instructions += createString('^', yDiff)
      }

      if (xDiff < 0) {
        instructions += createString('<', xDiff)
      }

      if (yDiff > 0) {
        instructions += createString('v', yDiff)
      }

      findNumPadInstructions(input, index+1, instructions + 'A', target, resultArr);
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const numPadArr: string[] = []
    
    findNumPadInstructions(input, 0, '', 'A', numPadArr)

    const arrowPadArr: string[] = []

    numPadArr.forEach((instructions) => {
      findArrowPadInstructions(instructions, 0, '', 'A', arrowPadArr);
    })

    const arrowPadArr2: string[] = []

    arrowPadArr.forEach((instructions) => {
      findArrowPadInstructions(instructions, 0, '', 'A', arrowPadArr2);
    })

    arrowPadArr2.sort((a, b) => a.length - b.length);

    const numricValue = Number(input.replace('A', ''));
    const instructionLength = arrowPadArr2[0].length
    result += instructionLength * numricValue;
    console.log(result);
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const inputs = groups[0];

  let result = 0;

  const createString = (char: string, amount: number) => {
    let str = '';
    for (let i = 0; i < Math.abs(amount); i++) {
      str += char;
    }
    return str;
  }

  const arrowPadMap = new Map<string, number>();

  const findArrowPadInstructions = (instructions: string, startPos: keyof ArrowPad, depth: number): number => {
    if (arrowPadMap.has(startPos + '+' + instructions + '+' + depth)) {
      return arrowPadMap.get(startPos + '+' + instructions + '+' + depth) || 0;
    }
    if (depth === 25) {
      return instructions.length;
    }

    let length = 0;
    let position = startPos;

    for (let i = 0; i < instructions.length; i++) {
      const target = instructions.charAt(i) as keyof ArrowPad;
      
      const positionC = arrowPad[position];
      const targetC = arrowPad[target];
      
      // console.log(instructions);
      // console.log(position);
      // console.log(target);
      // console.log('-----------------')

      const xDiff = targetC.x - positionC.x;
      const yDiff = targetC.y - positionC.y;

      const canArmMoveOutOfBounds =  (targetC.x === 0 || positionC.x === 0) && (targetC.y === 0 || positionC.y === 0);

      if (!canArmMoveOutOfBounds && xDiff !== 0 && yDiff !== 0) {
        let yIns = '';
        if (yDiff > 0) {
          yIns += createString('v', yDiff)
        }
        if (yDiff < 0) {
          yIns += createString('^', yDiff)
        }

        let xIns = '';
        if (xDiff > 0) {
          xIns += createString('>', xDiff)
        }
        if (xDiff < 0) {
          xIns += createString('<', xDiff)
        }
        
        length += Math.min(findArrowPadInstructions(xIns + yIns + 'A', 'A', depth+1), findArrowPadInstructions(yIns + xIns + 'A', 'A', depth+1))
      } else {
        let ins = ''
        if (xDiff > 0) {
          ins += createString('>', xDiff)
        }
        
        if (yDiff > 0) {
          ins += createString('v', yDiff)
        }

        if (xDiff < 0) {
          ins += createString('<', xDiff)
        }
        
        if (yDiff < 0) {
          ins += createString('^', yDiff)
        }

        length += findArrowPadInstructions(ins + 'A', 'A', depth+1);
      }
      position = target;
    }

    arrowPadMap.set(startPos + '+' + instructions + '+' + depth, length);
    return length;
  }

  const findNumPadInstructions = (input: string, index: number, instructions: string, position: keyof NumPad, resultArr: string[]) => {
    if (index === input.length) {
      resultArr.push(instructions);
      return;
    }
    const target = input.charAt(index) as keyof NumPad;

    const positionC = numPad[position];
    const targetC = numPad[target];

    const xDiff = targetC.x - positionC.x;
    const yDiff = targetC.y - positionC.y;

    const canArmMoveOutOfBounds =  (targetC.x === 0 || positionC.x === 0) && (targetC.y === 3 || positionC.y === 3);

    if (!canArmMoveOutOfBounds && xDiff !== 0 && yDiff !== 0) {
      let yIns = '';
      if (yDiff > 0) {
        yIns += createString('v', yDiff)
      }
      if (yDiff < 0) {
        yIns += createString('^', yDiff)
      }

      let xIns = '';
      if (xDiff > 0) {
        xIns += createString('>', xDiff)
      }
      if (xDiff < 0) {
        xIns += createString('<', xDiff)
      }
      
      findNumPadInstructions(input, index+1, instructions + xIns + yIns + 'A', target, resultArr)
      findNumPadInstructions(input, index+1, instructions + yIns + xIns + 'A', target, resultArr)
    } else {
      if (xDiff > 0) {
        instructions += createString('>', xDiff)
      }
      
      if (yDiff < 0) {
        instructions += createString('^', yDiff)
      }

      if (xDiff < 0) {
        instructions += createString('<', xDiff)
      }

      if (yDiff > 0) {
        instructions += createString('v', yDiff)
      }

      findNumPadInstructions(input, index+1, instructions + 'A', target, resultArr);
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const numPadArr: string[] = []
    
    findNumPadInstructions(input, 0, '', 'A', numPadArr)

    console.log(numPadArr)

    let instructionLength = Infinity;

    numPadArr.forEach((instructions) => {
      console.log(instructions)
      instructionLength = Math.min(instructionLength, findArrowPadInstructions(instructions, 'A', 0));
    })

    console.log(instructionLength)

    console.log(arrowPadMap)

    const numricValue = Number(input.replace('A', ''));
    result += instructionLength * numricValue;
    console.log(result);
  }

  console.log(result);
}

main2();
