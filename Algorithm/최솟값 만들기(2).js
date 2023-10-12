// https://school.programmers.co.kr/learn/courses/30/lessons/12941

function solution(A,B){
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);
  
  const mul = A.map((x, idx) => x * B[idx]);
  return mul.reduce((acc, cur) => acc + cur, 0);
}