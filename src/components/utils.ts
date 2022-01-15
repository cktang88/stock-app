export enum Positive {
  TRUE,
  FALSE,
  NONE,
}

export function prettifyVal(val: string): [string, Positive] {
  try {
    let n = Number(val);
    if (Number.isNaN(n)) {
      throw Error("Not a number");
    }
    const pos = n == 0 ? Positive.NONE : n > 0 ? Positive.TRUE : Positive.FALSE;
    n = Math.round(n / 1_000_000);
    return [n.toLocaleString("en-US") + " M", pos];
  } catch (e) {
    val = val == "None" ? "-" : val;
    return [val, Positive.NONE];
  }
}

// function prettifyVal2(val: string): [string, Positive] {
//   try {
//     let n = Number(val);
//     const pos = n == 0 ? Positive.NONE : n > 0 ? Positive.TRUE : Positive.FALSE;
//     return [humanFormat(n).replace("G", "B"), pos]; // billion
//   } catch (e) {
//     val = val == "None" ? "-" : val;
//     return [val, Positive.NONE];
//   }
// }
