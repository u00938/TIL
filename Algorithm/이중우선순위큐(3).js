// https://school.programmers.co.kr/learn/courses/30/lessons/42628

function solution(operations) {
  const queue = [];
  for (let op of operations) {
      const opArr = op.split(' ');
      if (opArr[0] === 'I') {
          queue.unshift(opArr[1]);
      } else {
          const target = Math[opArr[1] === '1' ? 'max' : 'min'](...queue);
          queue.splice(queue.indexOf(target.toString()), 1);
      }
  }
  return queue.length ? [Math.max(...queue), Math.min(...queue)] : [0, 0];
}

// 큐는 shift, unshift 사용하기 (선입선출)