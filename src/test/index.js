// // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// // for (let i = 0; i < arr.length; i++) {
// //   if (arr[i] % 2 === 0) {
// //     arr.splice(i, 1)
// //     i--
// //   }
// // }

// // console.log('arr :>> ', arr);

// let timer = null
// let list = []
// let lastTimeStampt = 0
// let currentTimeStampt = 0

// const update = () => {
//   console.log('list :>> ', list);
//   list = []
//   lastTimeStampt = new Date().getTime()
//   timer = null
// }

// const handleUpdate = (num) => {
//   list.push(num)
//   console.log('num :>> ', num);
//   if (timer) {
//     return
//   }
//   currentTimeStampt = new Date().getTime()
//   if (currentTimeStampt - lastTimeStampt > 5000) {
//     update()
//     return
//   }
//   timer = setTimeout(() => {
//     update()
//   }, 5000 - (currentTimeStampt - lastTimeStampt))
// }

// const test = () => {
//   let i = 0
//   setInterval(() => {
//     handleUpdate(i++)
//   }, 1000);
// }

// test()


// function b64_to_utf8(str) {
//   return decodeURIComponent(escape(atob(str)));
// }


function b64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str.replace(/ /g, '+'))));
}
function utf8_to_b64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}



const data = 'app_id=32&app_name=迭代测试2&product_id=6&product_name=光子美术中心'

const str = utf8_to_b64(data)

// const info = b64_to_utf8(str)

let url = new URL('https://lightai-pgame-refine-v1-sd.test-ultrongw.woa.com/?k=YXBwX2lkPTI2JmFwcF9uYW1lPeiPnOW4guWcunZhY+mAmueUqDcmcHJvZHVjdF9pZD02JnByb2R1Y3RfbmFtZT3lhYnlrZDnvo7mnK/kuK3lv4M=');
let k = url.searchParams.get('k');
let params = new URLSearchParams(b64_to_utf8(k));

console.log(k)

let app_id = params.get('app_id');
let app_name = params.get('app_name');
let product_id = params.get('product_id');
let product_name = params.get('product_name');

console.log(app_id);
console.log(app_name);
console.log(product_id);
console.log(product_name);



// console.log(str, info, b64_to_utf8('YXBwX2lkPTMxJmFwcF9uYW1lPei/reS7o+a1i+ivlSZwcm9kdWN0X2lkPTYmcHJvZHVjdF9uYW1lPeWFieWtkOe+juacr+S4reW/gw=='))