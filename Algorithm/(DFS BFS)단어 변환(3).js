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

// 조금 이해함
// 계속 한글자씩 다른것들 전부 일시 배열에 밀어넣고(이게 한 단계를 의미) 방문한건 패스, 
// 큐 하나 다 비면 단계 점검 끝난거고
// 단계 올라갈때마다(begin으로부터..) 카운트 올리고 큐 채우는거임