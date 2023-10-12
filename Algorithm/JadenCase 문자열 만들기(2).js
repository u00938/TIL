// https://school.programmers.co.kr/learn/courses/30/lessons/12951

function solution(s) {
  const arr = s.split(' ');
  return arr.map(x => typeof x[0] === 'string' 
          ? x[0].toUpperCase() + x.substring(1).toLowerCase() 
          : x.toLowerCase()
                ).join(' ');
}