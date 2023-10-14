// https://school.programmers.co.kr/learn/courses/30/lessons/42898

// 뭘까
// 테스트는 통과했는데 채점하면서 한 문제 빼고 다 실패가 뜸
// 혹시나 해서 테스트 케이스에 m = 5, n = 4, puddles = [[]] 결과값 35 넣었는데 통과함 
// 생각한 로직은 맞게 짠듯

// 찾아보니 js로는 풀 수 없는 문제라고 함
// 이제 뭐지! 왜지??ㄷㄷ

function solution(m, n, puddles) {
  const dp = new Array(n + 1).fill().map(x => new Array(m + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
          const puddle = puddles.some(x => String(x) === String([i, j]));
          
          if (i === 1 || j === 1) {
              // 직선 경로는 모두 1 또는 0만
              dp[i][j] = puddle ? 0 : 1;
              continue;
          }

          if (puddle) {
              dp[i][j] = 0;
              continue;
          }

          dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
  }
  
  return dp[n][m];
}