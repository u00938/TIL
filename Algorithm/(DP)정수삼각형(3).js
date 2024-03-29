// https://school.programmers.co.kr/learn/courses/30/lessons/43105

// 선택한 수의 합이 최대일 때를 구하기
// dp[0]이 맨 위층, dp[1]이 그 다음층(위에서 두번째 층).. 이라고 생각하기
// dp[i]마다 배열을 가지는데, 그 배열의 인덱스는 그 층의 특정 인덱스에 도달하기까지 선택한 수의 합의 최댓값
// 즉 dp[1][1]의 값은 위에서 두번째 층인 8에 도달할 때 까지 선택한 수의 최댓값인 7+8=15

// 삼각형의 크기가 N일때
// N = 1일 때 dp[0] = 7
// N = 2일 때 dp[1] = [7+3, 7+8]
// N = 3일 때 dp[2] = [7+3+8, Min(7+3+1, 7+8+1), 7+8+0]

// 일반화해보기
// dp[N-1][0]의 값은 0 -> 0 -> 0 -> 0 인덱스를 거쳐가므로 1개의 경우의 수만 존재한다.
// dp[N-1][N-1]의 값은 0 -> 1 -> 2 -> 3...의 각 행의 마지막 인덱스를 거쳐가므로 1개의 경우의 수만 존재한다.
// dp[N-1][K]의 값은 K를 도착한 모든 경우의 수 중 가장 큰 값을 구하면 된다.
// K 인덱스 위치에 도착할 수 있는 방법은 이전 층(N-2 층)의 K-1 인덱스에서 오거나, K 인덱스에서 오는 방법 2가지이다. 이 두개의 숫자 중 큰 숫자를 구한다.

// bottomup 풀이
// 1. 이 문제의 가장 작은 하위 문제는 다음 칸의 두 수 중 더 큰 수를 찾는 것 
// 2. 맨 아래 칸부터 왼쪽 오른쪽 중 큰 수를 윗칸의 숫자에 더해준다. 차례차례 더해주며 맨 윗쪽의 하위 문제까지 해결 
// 3. 첫번째 칸에 있는 숫자를 반환

function solution(triangle) {
  for (let n = triangle.length - 2; 0 <= n; n--) {
      for (let k = 0; k < triangle[n].length; k++) {
          triangle[n][k] += Math.max(triangle[n + 1][k], triangle[n + 1][k + 1]);
      }
  }
  return triangle[0][0];
}

