
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class Solution {

    private static final int ALPHABET_SIZE = 26;
    private static final int GRAPH_CONTAINS_A_CYCLE = -1;
    private Map<Integer, List<Integer>> graph;
    private int[] indegree;
    private int totalNodes;

    public int largestPathValue(String colors, int[][] edges) {
        totalNodes = colors.length();
        createGraph(edges);
        initializeIndegree(edges);
        return breadthFirstSearchForLargestPathValue(colors);
    }

    private int breadthFirstSearchForLargestPathValue(String colors) {
        int[][] maxColorFrequencyAtNode = new int[totalNodes][ALPHABET_SIZE];
        Queue<Integer> queue = new LinkedList<>();
        for (int node = 0; node < totalNodes; ++node) {
            if (indegree[node] == 0) {
                queue.add(node);
            }
        }

        int maxFrequency = 0;
        int totalVisitedNodes = 0;

        while (!queue.isEmpty()) {

            int current = queue.poll();
            ++totalVisitedNodes;
            ++maxColorFrequencyAtNode[current][colors.charAt(current) - 'a'];
            maxFrequency = Math.max(maxFrequency, maxColorFrequencyAtNode[current][colors.charAt(current) - 'a']);

            if (!graph.containsKey(current)) {
                continue;
            }

            for (int next : graph.get(current)) {
                updateColorFrequency(maxColorFrequencyAtNode, current, next);
                if (--indegree[next] == 0) {
                    queue.add(next);
                }
            }
        }

        return totalVisitedNodes == totalNodes ? maxFrequency : GRAPH_CONTAINS_A_CYCLE;
    }

    private void updateColorFrequency(int[][] maxColorFrequencyAtNode, int current, int next) {
        for (int color = 0; color < ALPHABET_SIZE; ++color) {
            maxColorFrequencyAtNode[next][color] = Math.max(maxColorFrequencyAtNode[next][color], maxColorFrequencyAtNode[current][color]);
        }
    }

    private void createGraph(int[][] edges) {
        graph = new HashMap<>();
        for (int[] edge : edges) {
            int from = edge[0];
            int to = edge[1];
            graph.computeIfAbsent(from, neighbours -> new ArrayList<>()).add(to);
        }
    }

    private void initializeIndegree(int[][] edges) {
        indegree = new int[totalNodes];
        for (int[] edge : edges) {
            ++indegree[edge[1]];
        }
    }
}
