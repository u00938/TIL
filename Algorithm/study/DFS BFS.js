// 그래프를 탐색하는 방법에는 크게 깊이 우선 탐색(DFS)과 너비 우선 탐색(BFS)이 있다. 
// 여기서 그래프란, 정점(node)과 그 정점을 연결하는 간선(edge)으로 이루어진 자료구조의 일종이다. 
// 그래프를 탐색한다는 것은 하나의 정점으로부터 차례대로 모든 정점들을 한번씩 방문하는 것을 말한다. 

// 깊이 우선 탐색(DFS, Depth-First Search)
// : 최대한 깊이 내겨간 뒤, 더이상 깊이 갈 곳이 없을 경우 옆으로 이동 
// 다음 분기(branch)로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방식이다.
// 예를 들어 미로찾기를 할 때 최대한 한 방향으로 갈 수 있을 때까지 쭉 가다가 더이상 갈 수 없게 되면 다시 가장 가까운 갈림길로 돌아와서 
// 그 갈림길부터 다시 다른방향으로 탐색을 진행하는 것. 

// 1. 모든 노드를 방문하고자 하는 경우
// 2. 깊이 우선 탐색이 너비 우선 탐색보다 좀 더 간단함
// 3. 검색 속도 자체는 너비 우선 탐색에 비해 느림

// //

// 너비 우선 탐색(BFS, Breadth-First Search)
// : 최대한 넓게 이동한 다음, 더 이상 갈 수 없을 때 아래로 이동
// 인접한 노드를 먼저 탐색하는 방법. 
// 주로 두 노드 사이의 최단 경로를 찾고 싶을 때 이 방법을 선택한다.
// 예를 들어 지구 상에 존재하는 모든 친구 관계를 그래프로 표현한 후 Sam과 Eddie 사이에 존재하는 경로를 찾는 경우 
// DFS의 경우 모든 친구 관계를 다 살펴봐야 할 수도 있음 / BFS의 경우 Sam과 가까운 관계부터 탐색

// //

// DFS(깊이우선탐색): 스택 또는 재귀함수로 구현
// BFS(너비우선탐색): 큐를 이용해 구현

// //

* 그래프의 모든 정점을 방문하는 것이 주요한 문제
상관 없음. 둘 중 편한 것

* 경로의 특징을 저장해둬야 하는 문제
예를 들어 각 정점에 숫자가 적혀있고 a부터 b까지 가는 경로를 구하는데 경로에 같은 숫자가 있으면 안되는 등
각각의 경로마다 특징을 저장해둬야 할 때는 DFS(깊이우선탐색)
BFS는 경로의 특징을 가지지 못한다

* 최단거리 구해야 하는 문제 
미로찾기 등 최단거리를 구해야 할 경우 BFS(너비우선탐색)가 유리하다.
DFS로 경로를 탐색하는 경우 처음으로 발견되는 해답이 최단거리가 아닐 수 있음
DFS로 현재 노드에서 가까운 곳부터 찾기 때문에 경로 탐색 시 먼저 찾아지는 해답이 곧 최단거리이기 때문 

* 검색 대상 그래프가 정말 크다면 DFS(깊이우선탐색) 고려

* 검색 대상의 규모가 크지 않고, 검색 시작 지점으로부터 원하는 대상이 별로 멀지 않다면 BFS(너비우선탐색) 고려


const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "G", "H", "I"],
  D: ["B", "E", "F"],
  E: ["D"],
  F: ["D"],
  G: ["C"],
  H: ["C"],
  I: ["C", "J"],
  J: ["I"],
};

// DFS(깊이우선탐색): 한개의 스택, 한개의 큐 사용
// 자기 자신과 연결되었던 노드들 먼저 탐색하기 때문에 스택을 사용한다.
const dfs = (graph, startNode) => {
  let needVisitStack = []; // 탐색을 해야 할 노드들
  let visitedQueue = []; // 탐색을 마친 노드들

  needVisitStack.push(startNode);

  // 탐색을 해야 할 노드가 남아 있다면
  while (needVisitStack.length !== 0) {
    const node = needVisitStack.pop();
    if (!visitedQueue.includes(node)) {
      visitedQueue.push(node);
      needVisitStack = [...needVisitStack, ...graph[node]];
    }
  }

  return visitedQueue;
};

console.log(dfs(graph, "A"));
// ["A", "C", "I", "J", "H", "G", "B", "D", "F", "E"]

//
// BFS(너비우선탐색): 두개의 큐 사용
// 이전 노드와 연결된 노드들을 먼저 탐색해야 함.
const bfs = (graph, startNode) => {
  let visited = []; // 탐색을 마친 노드들
  let needVisit = []; // 탐색해야할 노드들

  needVisit.push(startNode); // 노드 탐색 시작

  while (needVisit.length !== 0) { // 탐색해야할 노드가 남아있다면
    const node = needVisit.shift(); // queue이기 때문에 선입선출, shift()를 사용한다.
    if (!visited.includes(node)) { // 해당 노드가 탐색된 적 없다면
      visited.push(node); 
      needVisit = [...needVisit, ...graph[node]];
    }
  }
  return visited;
};

console.log(bfs(graph, "A"));
// ["A", "B", "C", "D", "G", "H", "I", "E", "F", "J"]