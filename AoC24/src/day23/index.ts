import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  const now = Date.now();
  
  const inputs = groups[0].map(s => s.split('-'));

  let resultSet = new Set();

  const connectionMap = new Map<string, Set<string>>();

  for (let i = 0; i < inputs.length; i++) {
    const [node1, node2] = inputs[i];

    if (connectionMap.has(node1)) {
      connectionMap.get(node1)!.add(node2);
    } else {
      const set = new Set<string>()
      set.add(node2);
      connectionMap.set(node1, set);
    }

    if (connectionMap.has(node2)) {
      connectionMap.get(node2)!.add(node1);
    } else {
      const set = new Set<string>()
      set.add(node1);
      connectionMap.set(node2, set)
    }
  }

  // console.log(connectionMap)

  connectionMap.forEach((connections, node) => {
    if (node.startsWith('t')) {
      for (const node1 of connections) {
        for (const node2 of connections) {
          if (node1 !== node2 && ((connectionMap.get(node1)?.has(node2) || connectionMap.get(node2)?.has(node1)))) {
            const result = [node, node1, node2].sort()
            resultSet.add(result.join('-'));
          }
        }
      }
    }
  });

  console.log(resultSet.size);
  const after = Date.now();
  console.log(`ms: ${after - now}`);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  const now = Date.now();
  
  const inputs = groups[0].map(s => s.split('-'));

  const connectionMap = new Map<string, string[]>();

  for (let i = 0; i < inputs.length; i++) {
    const [node1, node2] = inputs[i];

    connectionMap.set(node1, [node2, ...connectionMap.get(node1) || []]);
    connectionMap.set(node2, [node1, ...connectionMap.get(node2) || []]);
  }

  const getAllCombinations = (input: string[], size: number, resultArr: string[][] = [], state: string[] = [], index: number = 0) => {
    if ((input.length - index) + state.length < size) return resultArr;
    if (index === input.length || state.length === size) {
      resultArr.push(state);
      return resultArr;
    }

    getAllCombinations(input, size, resultArr, [...state, input[index]], index+1,)
    getAllCombinations(input, size, resultArr, state, index+1,)

    return resultArr;
  }

  let mostEdges = 0;

  connectionMap.forEach((val) => {
    mostEdges = Math.max(mostEdges, val.length);
  })

  let size = mostEdges;
  let validKey = '';
  while (true) {
    const resultMap = new Map<string, number>();
    connectionMap.forEach((connections, node) => {
      if (connections.length >= size) {
        const input = [...connections, node].sort();
        const combinations = getAllCombinations(input, size);

        for (const combination of combinations) {
          const key = combination.join(',');
          resultMap.set(key, (resultMap.get(key) || 0) + 1);
        }
      }
    });

    resultMap.forEach((val, key) => {
      const keyLength = key.split(',').length
      if (keyLength === val) {
        validKey = key;
      }
    })

    if (validKey !== '') break;
    size--;
  }

  console.log(validKey);
  const after = Date.now();
  console.log(`ms: ${after - now}`);
}

main2();
