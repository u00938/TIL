// https://school.programmers.co.kr/learn/courses/30/lessons/43163

// 최단 -> BFS

function solution(begin, target, words) {
  if (!words.includes(target)) return 0;
  
  let answer = 0;
  const visited = [];
  const queue = [];
  let temp = [];
  
  queue.push(begin);
  
  while (queue.length) {
      const word = queue.shift();
      if (visited.includes(word)) continue;
      if (word === target) return answer;
      
      visited.push(word);
      
      for (let i = 0; i < words.length; i++) {
          const notEqual = [...words[i]].reduce((acc, cur, idx) => cur !== word[idx] ? acc += 1 : acc, 0);
          
          if (notEqual === 1) temp.push(words[i]);
      }
      
      if (queue.length < 1) {
          answer ++;
          queue.push(...temp);
          temp = [];
      }
  }
  
  return answer;
}

// 이해가 될랑말랑 하고있음
// 현재 단어와 1개 알파벳만 다른 것들씩 큐에 넣고 빼고 하다가 큐가 비었으면 다음 레벨의 단어들을 큐에 넣어준다
// @_@ 
