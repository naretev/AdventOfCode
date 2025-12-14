import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const [aStr, bStr, cStr] = groups[0];
  const program = groups[1][0].split(': ')[1].split(',').map(n => Number(n));

  let A = Number(aStr.split(': ')[1]);
  let B = Number(bStr.split(': ')[1]);
  let C = Number(cStr.split(': ')[1]);

  const comboVal = (n: number): number => {
    if (n === 4) return A;
    if (n === 5) return B;
    if (n === 6) return C;
    return n;
  }

  const resultArr = new Array<number>();

  let pointer = 0;
  outer: while (pointer < program.length) {
    const opcode = program[pointer];
    const operand = program[pointer+1];

    switch (opcode) {
      case 0:
        A = Math.floor(A / Math.pow(2, comboVal(operand)));
        break;
      case 1:
        B = B ^ operand;
        break;
      case 2:
        B = comboVal(operand) % 8
        break;
      case 3:
        if (A !== 0) {
          pointer = operand;
          continue outer;
        }
      case 4:
        B = B ^ C
        break;
      case 5:
        resultArr.push(comboVal(operand) % 8)
        break;
      case 6:
        B = Math.floor(A / Math.pow(2, comboVal(operand)));
        break;
      case 7:
        C = Math.floor(A / Math.pow(2, comboVal(operand)));
        break;
    }
    
    pointer += 2;
  }

  console.log(resultArr.join());
}

// Brute force manual solve part 2
const main2 = async () => {
  const groups = await readLines();

  const [aStr, bStr, cStr] = groups[0];
  const program = groups[1][0]
    .split(': ')[1]
    .split(',')
    .map((n) => BigInt(n));

  let resultArr = new Array<BigInt>();

  let index = BigInt(236580836017000);
  let A = BigInt(0);
  let B = BigInt(0);
  let C = BigInt(0);

  while (true) {
    A = index
    B = BigInt(bStr.split(': ')[1]);
    C = BigInt(cStr.split(': ')[1]);

    const comboVal = (n: bigint): bigint => {
      if (n === BigInt(4)) return A;
      if (n === BigInt(5)) return B;
      if (n === BigInt(6)) return C;
      return n;
    };

    resultArr = new Array<BigInt>();

    let pointer = 0;
    outer: while (pointer < program.length) {
      const opcode = program[pointer];
      const operand = program[pointer + 1];

      switch (opcode) {
        case BigInt(0):
          A = A / (BigInt(2) ** comboVal(operand));
          break;

        case BigInt(1):
          B = B ^ operand;
          break;

        case BigInt(2):
          B = comboVal(operand) % BigInt(8);
          break;

        case BigInt(3):
          if (A !== BigInt(0)) {
            pointer = Number(operand);
            continue outer;
          }
          break;

        case BigInt(4):
          B = B ^ C;
          break;

        case BigInt(5):
          resultArr.push(comboVal(operand) % BigInt(8));
          break;

        case BigInt(6):
          B = A / (BigInt(2) ** comboVal(operand));
          break;

        case BigInt(7):
          C = A / (BigInt(2) ** comboVal(operand));
          break;
      }

      pointer += 2;
    }

    if (resultArr.join() === program.join()) break;

    if (resultArr[resultArr.length-1] === program[program.length-1]
      && resultArr[resultArr.length-2] === program[program.length-2]
      && resultArr[resultArr.length-3] === program[program.length-3]
      && resultArr[resultArr.length-4] === program[program.length-4]
      && resultArr[resultArr.length-5] === program[program.length-5]
      && resultArr[resultArr.length-6] === program[program.length-6]
      && resultArr[resultArr.length-7] === program[program.length-7]
      && resultArr[resultArr.length-8] === program[program.length-8]
      && resultArr[resultArr.length-9] === program[program.length-9]
      && resultArr[resultArr.length-10] === program[program.length-10]
      && resultArr[resultArr.length-11] === program[program.length-11]
    ) console.log('Partial solve', resultArr, index);

    index += BigInt(1);
  }

  console.log(resultArr.join(), program.join());
  console.log(index);
};

// Attempt at automating part 2, probably only works for my input
const main3 = async () => {
  const groups = await readLines();

  const [aStr, bStr, cStr] = groups[0];
  const program = groups[1][0]
    .split(': ')[1]
    .split(',')
    .map((n) => BigInt(n));

  let result = BigInt(0);

  const runProgram = (A: bigint): BigInt[] => {
    let B = BigInt(0);
    let C = BigInt(0);

    const comboVal = (n: bigint): bigint => {
      if (n === BigInt(4)) return A;
      if (n === BigInt(5)) return B;
      if (n === BigInt(6)) return C;
      return n;
    };

    const output = new Array<BigInt>();

    let pointer = 0;
    while (pointer < program.length) {
      const opcode = program[pointer];
      const operand = program[pointer + 1];

      switch (opcode) {
        case BigInt(0):
          A = A / (BigInt(2) ** comboVal(operand));
          break;
        case BigInt(1):
          B = B ^ operand;
          break;
        case BigInt(2):
          B = comboVal(operand) % BigInt(8);
          break;
        case BigInt(3):
          if (A !== BigInt(0)) {
            pointer = Number(operand);
            continue;
          }
          break;
        case BigInt(4):
          B = B ^ C;
          break;
        case BigInt(5):
          output.push(comboVal(operand) % BigInt(8));
          break;
        case BigInt(6):
          B = A / (BigInt(2) ** comboVal(operand));
          break;
        case BigInt(7):
          C = A / (BigInt(2) ** comboVal(operand));
          break;
      }

      pointer += 2;
    }

    return output;
  }

  const compareOutput = (output: BigInt[]): number => {
    if (output.length !== program.length) return -1;
    let count = 0;
    let index = output.length-1;

    while (output[index] === program[index] && index >= 0) {
      count++;
      index--;
    }

    return count;
  }

  let leftPointer = BigInt(1);
  let rightPointer = BigInt(2**3);

  while (runProgram(rightPointer).length <= program.length) {
    leftPointer *= BigInt(2);
    rightPointer *= BigInt(2);
  }

  let lastHighestScore = -2;
  let highestScore = -1;
  let divideRate = 2**6; // or 1000
  while (true) {
    if (highestScore === lastHighestScore) divideRate *= 2**3; // or 2
    lastHighestScore = highestScore;

    let scanRate = (rightPointer - leftPointer) / BigInt(divideRate);
    if (scanRate === BigInt(0)) scanRate = BigInt(1);

    console.log("The current scan rate: ", Number(scanRate), " and divide rate: ", divideRate);
    console.log("The highest score found: ", highestScore);
    console.log('------------------------------------------------------')
    
    let scanner = leftPointer;
    while (scanner < rightPointer) {
      const output = runProgram(scanner);
      const score = compareOutput(output);
      if (score > highestScore) {
        highestScore = score;
        divideRate = 2**3; // or 1000
        leftPointer = scanner - scanRate*BigInt(2) // or 1
        if (leftPointer < BigInt(0)) leftPointer = BigInt(0);
        break;
      }

      scanner += scanRate;
    }

    if (highestScore === program.length) {
      result = scanner;
      console.log("The current scan rate: ", Number(scanRate), " and divide rate: ", divideRate);
      console.log("The highest score found: ", highestScore);
      console.log('------------------------------------------------------')
      break;
    }
    
    if (highestScore !== lastHighestScore) {
      scanner = rightPointer
      while (leftPointer < scanner) {
        const output = runProgram(scanner);
        const score = compareOutput(output);
        if (score > highestScore) {
          rightPointer = scanner + scanRate*BigInt(2) // or 1
          break;
        }

        scanner -= scanRate;
      }
    }
  }

  console.log("Result: ", result);
};

main3();
