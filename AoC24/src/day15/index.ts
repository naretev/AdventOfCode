import { readLines } from "../util"

const framerate = 1000/4
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const input1 = groups[0];
  const input2 = groups[1];

  const matrix = new Array<Array<string>>();

  for (let i = 0; i < input1.length; i++) {
    matrix[i] = [...input1[i]];
  }

  const instructions = input2.join('');

  const dirs = {
    ['^']: {xMod: 0, yMod: -1},
    ['>']: {xMod: 1, yMod: 0},
    ['v']: {xMod: 0, yMod: 1},
    ['<']: {xMod: -1, yMod: 0},
  }
  
  let result = 0;

  const followInstructions = async (x: number, y: number) => {
    for (let i = 0; i < instructions.length; i++) {
      const direction = instructions[i] as 'v' | '>' | '<' | '^';

      const { xMod, yMod } = dirs[direction];
      
      if (matrix[y+yMod][x+xMod] === '.') {
        matrix[y][x] = '.';
        matrix[y+yMod][x+xMod] = '@';
        x = x+xMod;
        y = y+yMod;
      } else if (matrix[y+yMod][x+xMod] === 'O') {
        let index = 1;
        while (matrix[y+yMod*index][x+xMod*index] === 'O') index++;

        if (matrix[y+yMod*index][x+xMod*index] === '.') {
          matrix[y+yMod*index][x+xMod*index] = 'O';
          matrix[y+yMod][x+xMod] = '@';
          matrix[y][x] = '.';
          x = x+xMod;
          y = y+yMod;
        }
      }

      // Uncomment for debugging
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log(direction,direction,direction,direction,direction,direction,direction,direction,direction);
      // console.log('');
      // matrix.forEach((v) => console.log(v.join('')))

      // await delay(framerate);
    }
  }

  outer: for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === '@') {
        followInstructions(x, y)
        break outer;
      }
    }
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 'O') result += y*100 + x
    }
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const input1 = groups[0];
  const input2 = groups[1];

  const matrix: string[][] = Array.from({length: input1.length}, () => Array(input1[0].length*2).fill(''))

  for (let y = 0; y < input1.length; y++) {
    for (let x = 0; x < input1[y].length; x++) {
      switch (input1[y].charAt(x)) {
        case '#':
          matrix[y][x*2] = '#'
          matrix[y][x*2+1] = '#'
          break;
        case 'O':
          matrix[y][x*2] = '['
          matrix[y][x*2+1] = ']'
          break;
        case '.':
          matrix[y][x*2] = '.'
          matrix[y][x*2+1] = '.'
          break;
        case '@':
          matrix[y][x*2] = '@'
          matrix[y][x*2+1] = '.'
          break;
      }
    }
  }
  
  const instructions = input2.join('');

  const dirs = {
    ['^']: {xMod: 0, yMod: -1},
    ['>']: {xMod: 1, yMod: 0},
    ['v']: {xMod: 0, yMod: 1},
    ['<']: {xMod: -1, yMod: 0},
  }
  
  let result = 0;

  const followInstructions = async (x: number, y: number) => {
    for (let i = 0; i < instructions.length; i++) {
      const direction = instructions[i] as 'v' | '>' | '<' | '^';
      const { xMod, yMod } = dirs[direction];
      
      if (matrix[y+yMod][x+xMod] === '.') {
        matrix[y][x] = '.';
        matrix[y+yMod][x+xMod] = '@';
        x = x+xMod;
        y = y+yMod;
      } else if ('[]'.includes(matrix[y+yMod][x+xMod])) {
        const obs = matrix[y+yMod][x+xMod];

        if (direction === '<' || direction === '>') {
          let index = 1;
          while ('[]'.includes(matrix[y+yMod*index][x+xMod*index])) index += 2;

          if (matrix[y+yMod*index][x+xMod*index] === '.') {
            for (let j = index; j > 0; j--) {
              if (j % 2 === 0) {
                matrix[y+yMod*j][x+xMod*j] = obs
              } else {
                matrix[y+yMod*j][x+xMod*j] = '[]'.replace(obs, '');
              }
            }

            matrix[y+yMod][x+xMod] = '@';
            matrix[y][x] = '.';
            x = x+xMod;
            y = y+yMod;
          }
        } else {
          const obsArr = new Array<{x: number, y: number}>()

          const canMove = (x: number, y: number, yMod: number): boolean => {
            if (matrix[y][x] === ']') x--;
            obsArr.push({x, y});

            if (matrix[y+yMod][x] === '#' || matrix[y+yMod][x+1] === '#') {
              return false;
            }

            let b = true;

            if (matrix[y+yMod][x] === '[') {
              return canMove(x, y+yMod, yMod);
            }
            
            if (matrix[y+yMod][x] === ']') {
              b = b && canMove(x, y+yMod, yMod);
            }
            if (matrix[y+yMod][x+1] === '[') {
              b = b && canMove(x+1, y+yMod, yMod);
            }

            return b
          }

          if (canMove(x, y+yMod, yMod)) {
            obsArr.forEach(({x, y}) => {
              matrix[y][x] = '.'
              matrix[y][x+1] = '.'
            })
            obsArr.forEach(({x, y}) => {
              matrix[y+yMod][x] = '['
              matrix[y+yMod][x+1] = ']'
            })

            matrix[y+yMod][x+xMod] = '@';
            matrix[y][x] = '.';
            x = x+xMod;
            y = y+yMod;
          }
        }
      }

      // Uncomment for debugging
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log('');
      // console.log(direction,direction,direction,direction,direction,direction,direction,direction,direction);
      // console.log('');
      // matrix.forEach((v) => console.log(v.join('')))

      // await delay(framerate);
    }
  }

  outer: for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === '@') {
        followInstructions(x, y)
        break outer;
      }
    }
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === '[') result += y*100 + x
    }
  }

  console.log(result);
}

main2();
