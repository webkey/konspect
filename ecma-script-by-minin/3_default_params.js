const getDefault = c => c * 2;

function compute(a, b = getDefault(a)) {
  return a + b;
}

console.log(compute(10)); // 30