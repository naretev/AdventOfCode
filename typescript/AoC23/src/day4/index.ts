import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const input = groups[0];

  // console.log(input)

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const [card, numbers] = input[i].split(': ');
    const [winningNumsRaw, myNumsRaw] = numbers.split(' | ');
    const winningNums = winningNumsRaw.split(' ').map(n => Number(n));
    const myNums = myNumsRaw.split(' ').map(n => Number(n));


    let wins = 0;
    for (let j = 0; j < myNums.length; j++) {
      for (let k = 0; k < winningNums.length; k++) {
        if (myNums[j] !== 0 && myNums[j] === winningNums[k]) wins++;
      }
    }
// console.log(card)
    // console.log(winningNums, myNums);
    // console.log("wins " + wins)
    if (wins === 0) continue;

    let points = 1;
    for (let j = 1; j < wins; j++) {
      points *= 2;
    }

    // console.log("points " + points)
    result += points;
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const inputs1 = groups[0];
  const inputs2 = groups[1];
  const inputs3 = groups[2];

  let result = 0;

  for (let i = 0; i < inputs1.length; i++) {
    const element = inputs1[i];
    
  }

  console.log(result);
}

main1();
