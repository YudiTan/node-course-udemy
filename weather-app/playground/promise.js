var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a + b);
      } else {
        reject('Arguments must be numbers.')
      };
    }, 1500);
  });
};

asyncAdd(5, 6).then((result) => {
  console.log('Result:', result);
  return asyncAdd(result, 33);
}).then((result2) => {
  console.log(result2);
}).catch((errorMessage) => {
  console.log(errorMessage);
});



// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //resolve("Hey, it worked!");
//     reject("Sorry, it failed!");
//     }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log("Success:", message);
// },  (errorMessage) => {
//   console.log("Error:", errorMessage);
// }
// );
