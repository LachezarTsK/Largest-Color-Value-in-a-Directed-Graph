
#include <queue>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
    
    static const int ALPHABET_SIZE = 26;
    static const int GRAPH_CONTAINS_A_CYCLE = -1;
    unordered_map<int, vector<int>> graph;
    vector<int> indegree;
    int totalNodes;

public:
    int largestPathValue(const string& colors, const vector<vector<int>>& edges) {
        totalNodes = colors.size();
        createGraph(edges);
        initializeIndegree(edges);
        return breadthFirstSearchForLargestPathValue(colors);
    }

private:
    //C++17: int breadthFirstSearchForLargestPathValue(string_view colors)
    int breadthFirstSearchForLargestPathValue(const string& colors) {
        vector<vector<int>> maxColorFrequencyAtNode(totalNodes, vector<int>(ALPHABET_SIZE));
        queue<int> queue;
        for (int node = 0; node < totalNodes; ++node) {
            if (indegree[node] == 0) {
                queue.push(node);
            }
        }

        int maxFrequency = 0;
        int totalVisitedNodes = 0;

        while (!queue.empty()) {

            int current = queue.front();
            queue.pop();
            ++totalVisitedNodes;
            ++maxColorFrequencyAtNode[current][colors[current] - 'a'];
            maxFrequency = max(maxFrequency, maxColorFrequencyAtNode[current][colors[current] - 'a']);

            //C++20: if(!graph.contains(current))
            if (graph.find(current) == graph.end()) {
                continue;
            }

            for (const auto& next : graph[current]) {
                updateColorFrequency(maxColorFrequencyAtNode, current, next);
                if (--indegree[next] == 0) {
                    queue.push(next);
                }
            }
        }

        return totalVisitedNodes == totalNodes ? maxFrequency : GRAPH_CONTAINS_A_CYCLE;
    }

    void updateColorFrequency(vector<vector<int>>& maxColorFrequencyAtNode, int current, int next) const {
        for (int color = 0; color < ALPHABET_SIZE; ++color) {
            maxColorFrequencyAtNode[next][color] = max(maxColorFrequencyAtNode[next][color], maxColorFrequencyAtNode[current][color]);
        }
    }

    void createGraph(const vector<vector<int>>& edges) {
        for (const auto& edge : edges) {
            int from = edge[0];
            int to = edge[1];
            graph[from].push_back(to);
        }
    }

    void initializeIndegree(const vector<vector<int>>& edges) {
        indegree.assign(totalNodes, 0);
        for (const auto& edge : edges) {
            ++indegree[edge[1]];
        }
    }
};
