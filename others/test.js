function solution(str) {
  let strArr = str.split('')
  
  for(let i = 0; i < strArr.length; i++) {
    if(strArr[i] === strArr[i + 1]) {
      if(strArr[i + 1] === strArr[i + 2]) {
        strArr.splice(i, 1)
        i -= 1
        continue
      }

      if(strArr[i + 2] === strArr[i + 3] && strArr[i + 2] !== undefined) {
        strArr.splice(i + 2, 1)
        i -= 1
        continue
      }
    }

  }

  return strArr.join('')
}


const res = solution('AABBCC')
console.log(res)