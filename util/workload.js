import Toast from 'react-native-toast-message';

const fibonacci = (n) => {
  if (n <= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
};

const generateLargeStrings = (count, size) => {
  const largeStrings = [];

  for (let i = 0; i < count; i++) {
    largeStrings.push(Array(size).fill('A').join(''));
  }

  return largeStrings;
};

const showCpuWorkloadCompletedMessage = () => {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: 'CPU Workload Completed',
    visibilityTime: 3000,
    autoHide: true,
    bottomOffset: 50,
  });
};

const showRamWorkloadCompletedMessage = () => {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: 'RAM Workload Completed',
    visibilityTime: 3000,
    autoHide: true,
    bottomOffset: 50,
  });
};

const runCpuWorkload = async () => {
  const n = 44; 
  const startTime = Date.now();
  const result = fibonacci(n);
  const endTime = Date.now();

  console.log('Fibonacci result:', result);
  console.log('Computation time:', (endTime - startTime) / 1000, 'seconds');
};

const runCpuWorkloadFixedTime = async (duration) => {
  const n = 38; // A smaller Fibonacci number that can be computed quickly
  let count = 0;
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    fibonacci(n);
    count++;
  }

  console.log('Computed', count, 'Fibonacci numbers in 10 seconds');

  const elapsedTime = Date.now() - startTime;
  const remainingTime = 10000 - elapsedTime;

  setTimeout(showCpuWorkloadCompletedMessage, remainingTime); // Show message after the remaining time
};


const runRamWorkload = async (duration) => {
  const count = 1000;
  const size = 10000;
  let largeStrings = [];
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    largeStrings = generateLargeStrings(count, size);
  }

  console.log('Generated', largeStrings.length, 'large strings');

  const remainingTime = 10000 - duration;

  setTimeout(showRamWorkloadCompletedMessage, remainingTime); // Show message after the remaining time
};


export { runCpuWorkload, runRamWorkload, runCpuWorkloadFixedTime };
