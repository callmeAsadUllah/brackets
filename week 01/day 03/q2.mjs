function countChar(str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (obj[char]) {
      obj[char]++;
    } else {
      obj[char] = 1;
    }
  }
  return obj;
}

console.log(countChar("hello"));
