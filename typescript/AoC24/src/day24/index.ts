import { readLines } from "../util"

type Operand = 'OR' | 'XOR' | 'AND';

// First Solution
const main1 = async () => {
  const groups = await readLines();
  const now = Date.now();
  
  const wires = groups[0];
  const gates = groups[1];

  const map = new Map<string, {value?: number, left?: string, right?: string, operand?: Operand}>();

  const startPosArr = []

  for (let i = 0; i < wires.length; i++) {
    const [key, val] = wires[i].split(': ');
    map.set(key, {value: Number(val)});

    if (key.startsWith('z')) {
      startPosArr.push(key);
    }
  }

  for (let i = 0; i < gates.length; i++) {
    const [rest, key] = gates[i].split(' -> ');
    const [left, operand, right] = rest.split(' ');
    map.set(key, {left, right, operand: operand as Operand});

    if (key.startsWith('z')) {
      startPosArr.push(key);
    }
  }

  const computeValue = (key: string): number => {
    const val = map.get(key)!
    if (val?.value !== undefined) return val.value;
    const {left, right, operand} = val;

    const value1 = computeValue(left!)
    const value2 = computeValue(right!)
    if (operand === 'AND') {
      const newValue = value1 === 1 && value2 === 1 ? 1 : 0;
      val.value = newValue
      return newValue
    } else if (operand === 'OR') {
      const newValue = value1 === 1 || value2 === 1 ? 1 : 0;
      val.value = newValue
      return newValue
    } else {
      const newValue = value1 ^ value2;
      val.value = newValue
      return newValue
    }
  }

  startPosArr.sort((a, b) => {
    const [a_, a1, a2] = a.split('');
    const [b_, b1, b2] = b.split('');

    return Number([a1, a2].join('')) - Number([b1, b2].join(''))
  })

  let result = '';
  for (let i = startPosArr.length-1; i >= 0; i--) {
    result += computeValue(startPosArr[i]);
  }

  console.log(parseInt(result, 2));
  const after = Date.now();
  console.log(`ms: ${after - now}`);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  const now = Date.now();
  
  const gates = groups[1];

  const gateList = new Array<{left: string, right: string, operand: Operand, node: string}>();

  const getNumeric = (key: string) => {
    const [_, a, b] = key.split('');

    return Number(a+b);
  }
  
  let highestZ = 'z00';
  for (let i = 0; i < gates.length; i++) {
    const [rest, node] = gates[i].split(' -> ');
    const [left, operand, right] = rest.split(' ');
    gateList.push({left, right, operand: operand as Operand, node});

    if (node.startsWith('z') && getNumeric(highestZ) < getNumeric(node)) {
      highestZ = node;
    }
  }

  const faultyNodes = new Array<string>;
  for (const { left, operand, node } of gateList) {
    const isConnectedToInputNodes = ['x', 'y'].includes(left.charAt(0));

    if (operand === 'AND') {
      if (node.startsWith('z')) {
        faultyNodes.push(node);
      } else if (getNumeric(left) > 0) {
        for (const subGate of gateList) {
          if ((subGate.left === node || subGate.right === node) && subGate.operand !== 'OR') {
            faultyNodes.push(node);
            break;
          }
        }
      }
    } else if (operand === 'XOR') {
      if (isConnectedToInputNodes) {
        if (node.startsWith('z') && getNumeric(left) > 0) {
          faultyNodes.push(node);
        }
        for (const subGate of gateList) {
          if ((subGate.left === node || subGate.right === node) && subGate.operand === 'OR') {
            faultyNodes.push(node);
            break;
          }
        }
      } else {
        if (!node.startsWith('z')) {
          faultyNodes.push(node);
        }
      }
    } else if (operand === 'OR' && node.startsWith('z') && node !== highestZ) {
      faultyNodes.push(node);
    }
  }

  console.log(faultyNodes.sort());
  const after = Date.now();
  console.log(`ms: ${after - now}`);
}

main2();
