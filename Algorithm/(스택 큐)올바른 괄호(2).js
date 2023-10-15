// https://school.programmers.co.kr/learn/courses/30/lessons/12909

function solution(s){
  let temp = [];
  for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
          temp.push(s[i]);
      } else if (s[i] === ')') {
          if (temp[temp.length - 1] === '(') {
              temp.pop();
          } else {
              temp.push(s[i]);
          }
      }
  }
  
  return temp.length > 0 ? false : true;
}

// 다른 사람 풀이
function solution(s){
  let cum = 0
  for (let paren of s) {
      cum += paren === '('? 1: -1
      if(cum < 0) {
          return false
      }
  }
  return cum === 0? true: false;
}