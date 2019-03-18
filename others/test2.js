/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let left = 0
  let right = nums.length - 1
  let center

  if(nums[left] < nums[right]) return nums[left]

  while(left < right) {
    center = left + ((right - left) >> 1)
    if(nums[center] > nums[center + 1]) return nums[center + 1]
    if(nums[center] < nums[left] ) {
      right = center
    }
    else left = center + 1
  }

  return nums[left]
};

console.log(findMin([1,2]))