function coinChange(coins, amount) {
  let amounts = new Array(amount)
  for(let i in amount) amount[i] = 0

  for(let i = 0; i < coins.length; i++) {
    for(let j = coins[i]; j < amount; j++) {
      amounts[j] = Math.min(amounts[j], amounts[j - coins[i]] + 1)
    }
  }

  return amounts[amount - 1]
}

const data = [1,2,5]

const res = coinChange(data, 11)
console.log(res)