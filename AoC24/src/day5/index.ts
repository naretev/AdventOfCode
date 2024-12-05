import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const rules = groups[0];

  const ruleMap = new Map<number, number[]>();

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i].split('|');

    ruleMap.set(Number(rule[0]), [Number(rule[1]), ...ruleMap.get(Number(rule[0])) ?? []])
  }

  const updates = groups[1];

  let result = 0;

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i].split(',');
    
    update: for (let j = update.length-1; j >= 0; j--) {
      const ruleSet = new Set(ruleMap.get(Number(update[j])) ?? []);
      for (let k = j; k >= 0; k--) {
        const updatePart = Number(update[k]);
        if (ruleSet.has(updatePart)) {
          break update;
        }
      }
      if (j === 0) result += Number(update[Math.floor(update.length/2)]);
    }
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  
  const rules = groups[0];

  const ruleMap = new Map<number, number[]>();

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i].split('|');

    ruleMap.set(Number(rule[0]), [Number(rule[1]), ...ruleMap.get(Number(rule[0])) ?? []])
  }
  
  const updates = groups[1];

  let result = 0;

  updates: for (let i = 0; i < updates.length; i++) {
    const update = updates[i].split(',');
    
    let correctOrder = true;
    for (let j = update.length-1; j >= 0; j--) {
      const ruleSet = new Set(ruleMap.get(Number(update[j])) ?? []);
      for (let k = j; k >= 0; k--) {
        const updatePart = Number(update[k]);
        if (ruleSet.has(updatePart)) {
          correctOrder = false
        }
      }
    }
    
    if (correctOrder) continue updates;

    update.sort((a, b) => {
      const ruleSet = new Set(ruleMap.get(Number(a)) ?? []);

      if (ruleSet.has(Number(b))) {
        return 1;
      } else {
        return -1;
      }
    })

    result += Number(update[Math.floor(update.length/2)]);
  }

  console.log(result);
}

main2();
