# DSA — 4-week Staff screen plan

You are not competing with new grads on leetcode volume. You need to look fluent and not freeze. 60–90 minutes, often graphs + concurrency.

## Cadence

- **Weeks 1–2:** arrays/hash, two pointers, heaps. 1 timed medium/day.
- **Week 3:** graphs/BFS/DFS/topo, union-find. 1 graph/day.
- **Week 4:** concurrency + review. Talk out loud on 2 problems/day.

Language: **Kotlin**. Say complexity first.

## 12 problems and what they test

| # | Problem | Tests |
|---|---|---|
| 1 | Two sum / prefix sums | Hash maps under pressure |
| 2 | Longest substring without repeat | Sliding window |
| 3 | Merge intervals | Sorting + greedy (calendar, sync windows) |
| 4 | Top K frequent | Heap vs count sort |
| 5 | LRU cache | Design + linked hashmap (caching embeddings / images) |
| 6 | Number of islands | DFS/BFS on grids |
| 7 | Course schedule | Cycle detection / topo (task graphs, agent hops) |
| 8 | Word ladder | BFS shortest path |
| 9 | Dijkstra / network delay | Weighted graphs |
| 10 | Union-find (accounts merge) | Disjoint sets |
| 11 | Producer-consumer / bounded buffer | Concurrency (WorkManager mental model) |
| 12 | Rate limiter (token bucket) | Design + math (API and sync) |

For 11–12, write Kotlin coroutines (`Channel`, `Mutex`) and mention ANR if you accidentally hop to `Dispatchers.Main`.

## How you open every problem (script)

“I’ll restate constraints, pick a brute force, then the target complexity, then code, then tests including empty input.”

If stuck at minute 8: smaller example, then invariant. Do not silently rewrite.

## Kotlin snippets to have cold

- `ArrayDeque` BFS  
- `PriorityQueue`  
- `HashMap` grouping  
- `Mutex` + `withContext(Dispatchers.IO)`
