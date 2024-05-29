// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] % 2 === 0) {
//     arr.splice(i, 1)
//     i--
//   }
// }

// console.log('arr :>> ', arr);

let timer = null
let list = []
let lastTimeStampt = 0
let currentTimeStampt = 0

const update = () => {
  console.log('list :>> ', list);
  list = []
  lastTimeStampt = new Date().getTime()
  timer = null
}

const handleUpdate = (num) => {
  list.push(num)
  console.log('num :>> ', num);
  if (timer) {
    return
  }
  currentTimeStampt = new Date().getTime()
  if (currentTimeStampt - lastTimeStampt > 5000) {
    update()
    return
  }
  timer = setTimeout(() => {
    update()
  }, 5000 - (currentTimeStampt - lastTimeStampt))
}

const test = () => {
  let i = 0
  setInterval(() => {
    handleUpdate(i++)
  }, 1000);
}

test()