import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const patterns = groups[0][0].split(', ');
  const targets = groups[1];

  const patternSet = new Set();
  let maxPatternLength = 0;

  for (let i = 0; i < patterns.length; i++) {
    maxPatternLength = Math.max(maxPatternLength, patterns[i].length);
    patternSet.add(patterns[i]);
  }

  let result = 0;

  for (let i = 0; i < targets.length; i++) {
    const dp = new Array<boolean>(targets.length+1).fill(false);
    dp[targets.length] = true;

    for (let j = targets.length-1; j >= 0; j--) {
      for (let k = j+1; k <= targets.length || k <= j + maxPatternLength; k++) {
        const part = targets[i].slice(j, k);
        if (patternSet.has(part) && dp[k]) {
          dp[j] = true;
        }
      }
    }

    if (dp[0]) result++;
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const patterns = groups[0][0].split(', ');
  const targets = groups[1];

  const patternSet = new Set();
  let maxPatternLength = 0;

  for (let i = 0; i < patterns.length; i++) {
    maxPatternLength = Math.max(maxPatternLength, patterns[i].length);
    patternSet.add(patterns[i]);
  }

  let result = 0;

  for (let i = 0; i < targets.length; i++) {
    const dp = new Array<number>(targets.length+1).fill(0);
    dp[targets.length] = 1;

    for (let j = targets.length-1; j >= 0; j--) {
      for (let k = j+1; k <= targets.length || k <= j + maxPatternLength; k++) {
        const part = targets[i].slice(j, k);
        if (patternSet.has(part)) {
          dp[j] += dp[k];
        }
      }
    }

    if (dp[0] > 0) result += dp[0];
  }

  console.log(result);
}

main1();
