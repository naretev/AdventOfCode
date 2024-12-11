import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const nums = groups[0][0].split(' ').map(n => Number(n));
  
  const find = (num: number, depth: number): number => {
    if (depth === 25) return 1;

    if (num === 0) {
      return find(1, depth+1);
    } else if (num.toString().length % 2 === 1) {
      return find(num*2024, depth+1);
    } else {
      const string = num.toString();
      const first = Number(string.slice(0, string.length/2));
      const second = Number(string.slice(string.length/2));

      const val1 = find(first, depth+1);

      const val2 = find(second, depth+1);

      return val1 + val2;
    }
  }

  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result += find(nums[i], 0);
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const nums = groups[0][0].split(' ').map(n => Number(n));
  const memo = new Map<string, number>();

  const find = (num: number, depth: number): number => {
    if (depth === 75) return 1;
    if (memo.has(`${num}+${depth}`)) return memo.get(`${num}+${depth}`) || 0;

    if (num === 0) {
      const val = find(1, depth+1);
      memo.set(`${num}+${depth}`, val);
      return val;
    } else if (num.toString().length % 2 === 1) {
      const val = find(num*2024, depth+1);
      memo.set(`${num}+${depth}`, val);
      return val;
    } else {
      const string = num.toString();
      const first = Number(string.slice(0, string.length/2));
      const second = Number(string.slice(string.length/2));

      const val1 = find(first, depth+1);

      const val2 = find(second, depth+1);

      memo.set(`${num}+${depth}`, val1 + val2);
      return val1 + val2;
    }
  }

  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result += find(nums[i], 0);
  }

  console.log(result);
}

main2();
