import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  const now = Date.now();
  
  const inputs = groups

  let result = 0;

  const keys = []
  const locks = []

  for (let i = 0; i < inputs.length; i++) {
    const matrix = inputs[i];

    if (matrix[0] === '#####') {
      keys.push(matrix)
    } else {
      locks.push(matrix);
    }
  }

  for (let i = 0; i < locks.length; i++) {
    const lock = locks[i];
    nextKey: for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      for (let y = 0; y < lock.length; y++) {
        for (let x = 0; x < lock[y].length; x++) {
          if (lock[y].charAt(x) === "#" && key[y].charAt(x) === "#") {
            continue nextKey;
          }
        }
      }
      result++;
    }
  }

  console.log(result);
  const after = Date.now();
  console.log(`ms: ${after - now}`);
}

main1();
