console.log('Starting async-basics');

setTimeout(() => {
  console.log('inside of callback');
}, 1000);

setTimeout(() => {
  console.log('second set timeout');
}, 0);




console.log('async-basics finished');