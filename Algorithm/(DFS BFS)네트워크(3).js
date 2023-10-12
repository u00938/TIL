// https://school.programmers.co.kr/learn/courses/30/lessons/43162

// DFS 문제
// 연결되어있고 방문하지 않았으면 방문하기
// 
function solution(n, computers) {
  let visited = [false];
  let answer = 0;

  function dfs(i) {
      visited[i] = true;
      for(let j = 0; j <= computers[i].length - 1; j++) {
          if(computers[i][j] === 1 && !visited[j]){
              dfs(j);
          }
      }
  }
  
  for (let i = 0; i <= computers.length - 1; i++) {
      if (!visited[i]) {
          dfs(i)
          answer++;
      }
  }
  return answer;
}