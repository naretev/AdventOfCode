import { readLines } from "../util"

// First Solution
const main1 = async () => {
  const groups = await readLines();
  
  const initialSecrets = groups[0];

  let result = BigInt(0);

  for (let i = 0; i < initialSecrets.length; i++) {
    let secret = BigInt(initialSecrets[i]);
    for (let i = 0; i < 2000; i++) {
      //Bigint?
      // const prevSecret = secret;

      const calc1 = secret * BigInt(64);
      secret = secret ^ calc1;
      secret = secret % BigInt(16777216);

      const calc2 = secret / BigInt(32)
      secret = secret ^ calc2
      secret = secret % BigInt(16777216);
      
      const calc3 = secret * BigInt(2048)
      secret = secret ^ calc3
      secret = secret % BigInt(16777216);
      
    }
    console.log(secret);
    result += secret
  }

  console.log(result);
}

// Second Solution
const main2 = async () => {
  const groups = await readLines();
  const now = Date.now();
  
  const initialSecrets = groups[0];

  let result = 0;

  const getNextSecret = (secret: bigint): bigint => {
    const calc1 = secret * BigInt(64);
    secret = secret ^ calc1;
    secret = secret % BigInt(16777216);

    const calc2 = secret / BigInt(32)
    secret = secret ^ calc2
    secret = secret % BigInt(16777216);
    
    const calc3 = secret * BigInt(2048)
    secret = secret ^ calc3
    secret = secret % BigInt(16777216);

    return secret;
  }

  const getPrice = (secret: bigint): number => {
    return Number(secret) % 10
  }

  const priceMap = new Map<string, number>();

  for (let i = 0; i < initialSecrets.length; i++) {
    const changeSet = new Set();

    let s0 = BigInt(initialSecrets[i]);
    let s1 = getNextSecret(s0)
    let s2 = getNextSecret(s1)
    let s3 = getNextSecret(s2)
    let s4 = getNextSecret(s3)

    for (let i = 4; i < 2000; i++) {
      s0 = s1
      s1 = s2
      s2 = s3
      s3 = s4
      s4 = getNextSecret(s4);

      const p0 = getPrice(s0)
      const p1 = getPrice(s1)
      const p2 = getPrice(s2)
      const p3 = getPrice(s3)
      const p4 = getPrice(s4)

      const c1 = p1 - p0
      const c2 = p2 - p1
      const c3 = p3 - p2
      const c4 = p4 - p3

      if (!changeSet.has(`${c1}/${c2}/${c3}/${c4}`)) {
        priceMap.set(`${c1}/${c2}/${c3}/${c4}`, (priceMap.get(`${c1}/${c2}/${c3}/${c4}`) || 0) + p4);
      }
      changeSet.add(`${c1}/${c2}/${c3}/${c4}`)
    }
  }

  priceMap.forEach((val, key) => {
    result = Math.max(result, val)
  })

  console.log(result);
  const after = Date.now();
  console.log(`ms: ${after - now}`);
}

main2();
