
// class GraphNode {
//   val: string

// }

export const solution1 = (groups: string[][]) => {
  const inputs = groups[0];

  const map = new Map<string, string[]>();

  let start = '';
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    const [key, data] = input.split(': ');
    const connections = data.split(' ');
    start = key;

    map.set(key, [...map.get(key) ?? [], ...connections]);

    for (let j = 0; j < connections.length; j++) {
      map.set(connections[j], [...map.get(connections[j]) ?? [], key]);
    }
  }

  // let count = 0;
  // map.forEach((value, key) => {
  //   // if (value.length > 6) {
  //     count++;
  //     console.log(key + ': ' + value);
  //   // }
  // })

  // console.log(count);


  // const edgeSet = new Set();
  // const q = new Array(start);
  // while (q.length > 0) {
  //   const connections = map.get(q.pop() || '');

  //   for
  // }

  
}
