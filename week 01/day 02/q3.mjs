let count = 0;

const arr = [1, 4, 4, 53, 7, 53, 54, 35, 7];

for (let i = 0; i < arr.length; i++) {
  count = 0;
  for (let j = 0; j < arr.length; j++) {
    if (i !== j && arr[i] === arr[j]) {
      count++;
    }
  }
  if (count === 0) {
    console.log(arr[i]);
  }
}
