
/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
var largestPathValue = function (colors, edges) {
    this.ALPHABET_SIZE = 26;
    this.ASCII_SMALL_CASE_A = 97;
    this.GRAPH_CONTAINS_A_CYCLE = -1;

    this.totalNodes = colors.length;
    this.graph = new Map();// Map<number, number[]>
    this.indegree = new Array(this.totalNodes).fill(0);

    createGraph(edges);
    initializeIndegree(edges);
    return breadthFirstSearchForLargestPathValue(colors);
};

/**
 * @param {string} colors
 * @return {number}
 */
function breadthFirstSearchForLargestPathValue(colors) {
    const maxColorFrequencyAtNode = Array.from(new Array(this.totalNodes), () => new Array(this.ALPHABET_SIZE).fill(0));

    //const {Queue} = require('@datastructures-js/queue');
    const queue = new Queue();//Queue<number>
    for (let node = 0; node < this.totalNodes; ++node) {
        if (this.indegree[node] === 0) {
            queue.enqueue(node);
        }
    }

    let maxFrequency = 0;
    let totalVisitedNodes = 0;

    while (!queue.isEmpty()) {

        const current = queue.dequeue();
        ++totalVisitedNodes;
        ++maxColorFrequencyAtNode[current][colors.codePointAt(current) - this.ASCII_SMALL_CASE_A];
        maxFrequency = Math.max(maxFrequency, maxColorFrequencyAtNode[current][colors.codePointAt(current) - this.ASCII_SMALL_CASE_A]);

        if (!this.graph.has(current)) {
            continue;
        }

        for (let next of this.graph.get(current)) {
            updateColorFrequency(maxColorFrequencyAtNode, current, next);
            if (--this.indegree[next] === 0) {
                queue.enqueue(next);
            }
        }
    }

    return totalVisitedNodes === this.totalNodes ? maxFrequency : this.GRAPH_CONTAINS_A_CYCLE;
}

/**
 * @param {number[][]} maxColorFrequencyAtNode
 * @param {number} current
 * @param {number} next
 * @return {void}
 */
function updateColorFrequency(maxColorFrequencyAtNode, current, next) {
    for (let color = 0; color < this.ALPHABET_SIZE; ++color) {
        maxColorFrequencyAtNode[next][color] = Math.max(maxColorFrequencyAtNode[next][color], maxColorFrequencyAtNode[current][color]);
    }
}

/**
 * @param {number[][]} edges
 * @return {void}
 */
function createGraph(edges) {
    for (let [from, to] of edges) {
        if (!this.graph.has(from)) {
            this.graph.set(from, new Array());
        }
        this.graph.get(from).push(to);
    }
}

/**
 * @param {number[][]} edges
 * @return {void}
 */
function initializeIndegree(edges) {
    for (let edge of edges) {
        ++this.indegree[edge[1]];
    }
}
