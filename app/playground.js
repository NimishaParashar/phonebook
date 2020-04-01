function reArrangeArray() {
  const a = [1, 2, 3, -4, -1, 4];
  const b = [],
    c = [];

  //[1, 2, 3, -4, -1, 4])).toEqual([-4, 1, -1, 2, 3, 4]);
  //b [ 1, 2, 3, 4 ] c [ -4, -1 ]
  //[ 4, -1, 3, -4, 2, 1 ]

  //[ -4, <1 empty item>, -1, <1 empty item>, 2, 3, 4 ]
  //[ -4, 1, -1, 2, <1 empty item>, 3 ]
  for (let j = 0; j < a.length; j++) {
    if (a[j] > 0) {
      b.push(a[j]);
    } else {
      c.push(a[j]);
    }
  }

  const sizePos = b.length;
  const sizeNeg = c.length;
  console.log("b", b, "c", c);
  const tempArr = new Array();
  let i = 0;
  tempArr.length = a.length;

  while (i < tempArr.length) {
    if (sizePos >= sizeNeg) {
      if (c.length > 0) {
        tempArr[i] = c.shift();
      }
      if (b.length > 0) {
        if (!tempArr[i]) {
          tempArr[i] = b.shift();
        }
        tempArr[i + 1] = b.shift();
        i++;
      }
    } else {
      if (c.length > 0) {
        tempArr[i] = c.shift();
      }
      if (b.length > 0) {
        tempArr[i + 1] = b.shift();
      }
    }
    i++;
  }

  return tempArr;
}

console.log(reArrangeArray());
