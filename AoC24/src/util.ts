import * as readline from 'readline';

export const readLines = async (): Promise<string[][]> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const groups: string[][] = new Array();
    groups[0] = new Array();
    let index = 0;
    console.log("Enter multiple lines (type '' to create a new group or 'exit' to finish):");

    rl.on('line', (input) => {
      if (input.toLowerCase() === 'exit') {
        rl.close();
      } else if (input.toLowerCase() === '') {
        index++;
        groups[index] = new Array();
      } else {
        groups[index].push(input);
      }
    });

    rl.on('close', () => {
      console.log('Input structure:')
      console.log(groups.map(input => input.length));
      resolve(groups);
    });
  });
}

const top = 0;
const parent = (i: number): number => ((i + 1) >>> 1) - 1;
const left = (i: number): number => (i << 1) + 1;
const right = (i: number): number => (i + 1) << 1;

export class PriorityQueue<T> {
  private _heap: T[];
  private _comparator: (a: T, b: T) => boolean;

  constructor(comparator: (a: T, b: T) => boolean = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size(): number {
    return this._heap.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  peek(): T | undefined {
    return this._heap[top];
  }

  push(...values: T[]): number {
    values.forEach((value) => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;

    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  replace(value: T): T | undefined {
    if (this.isEmpty()) return undefined;

    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }

  private _greater(i: number, j: number): boolean {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  private _swap(i: number, j: number): void {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  private _siftUp(): void {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }

  private _siftDown(): void {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      const maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
