// 동적 계획법(Dynamic Programming)
// 메모리를 적절히 사용하여 수행 시간의 효율성을 비약적으로 향상하는 방법이다. 
// 이미 계산된 결과(작은 문제)는 별도의 메모리 영역에 저장하여 다시 계산하지 않도록 한다.

// 문제가 다음의 조건을 만족할 때 동적 계획법을 사용할 수 있다.
// 1. 최적 부분 구조: 큰 문제를 작은 문제로 나눌 수 있으며 작은 문제의 답을 모아서 큰 문제를 해결할 수 있다. 
// 2. 중복되는 부분 문제: 동일한 작은 문제를 반복적으로 해결해야 한다. 

// 메모이제이션(Memoization)은 다이나믹 프로그래밍을 구현하는 방법의 하나로, 한 번 계산한 결과를 메모리 공간에 메모한다.
// 같은 문제를 다시 호출하면 메모했던 결과를 그대로 가져온다.
// 값을 기록해 놓는다는 점에서 캐싱(Caching)이라 하기도 한다. 


// DP의 등장 배경은 피보나치 수열을 통해 알 수 있다.
// 피보나치 수열은 제2항까지는 1, 제3항부터는 바로 앞의 두 항을 더한 수로 정의된다. 
// (0, 1, 1, 2, 3, 5, 8, 13, 21 ...)
// 보통 재귀를 통해 표현하는데, 아래는 피보나치 수열의 n번째 수를 구하는 함수이다.

function fibonacci(n) {
  if (n <= 1) {
	  return n;
  }
 return fibonacci(n - 1) + fibonacci(n - 2);
}

// 그러나 위 방식으로 하면 이미 진행됐던 연산이 중복되어 실행될 수 있다. 이 결점을 보완하기 위해 동적 계획법이 고안되었다.
// 동적 계획법의 원리는 처음 진행되는 연산은 기록해 두고, 이미 진행했던 연산이라면 다시 연산하는 것이 아니라 기록되어 있는 값을 가져오는 것이다.

// 탑다운
const dpTopDown = [0];

function fibonacciTopDown(num) {
  if (num <= 2) return 1;
  if (dpTopDown[num]) return dpTopDown[num];
  dpTopDown[num] = fibonacciTopDown(num - 1) + fibonacciTopDown(num - 2);
  return dpTopDown[num];
}

// 바텀업: 주로 반복문을 사용하여 구현한다.
const dpBottopUp = [0, 1, 1];

function fibonacciBottopUp(num) {
  for (let i = 3; i <= num; i++) {
    dpBottopUp[i] = dpBottopUp[i - 1] + dpBottopUp[i - 2];
  }
  return dpBottopUp[num];
}

// 주어진 문제가 동적 계획법 유형임을 파악하는 것이 중요하다.. 
// 그리디, 구현, 완전 탐색 등의 아이디어로 문제를 해결할 수 있는지 검토하고 다른 알고리즘으로 풀이 방법이 떠오르지 않으면 동적 계획법을 고려해본다.

