// Mongoose warning message troubleshooting
// Jest의 기본 Test 환경은 jsdom
// Mongoose는 jsdom을 지원하지 않는다.
// Jest의 기본 Test 환경을 node로 바꿔준다. 

module.exports = {
  testEnvironment: "node"
}