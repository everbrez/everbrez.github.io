// a + b => ((a & b) << 1) + (a ^ b)
function sum(a, b) {
  if (a === 0) return b
  if (b === 0) return a
  return sum((a & b) << 1, a ^ b)
}