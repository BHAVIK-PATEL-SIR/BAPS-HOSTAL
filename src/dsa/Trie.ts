export class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    data: any | null; // Store metadata like link or category

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.data = null;
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string, data: any) {
        let current = this.root;
        const normalizedWord = word.toLowerCase();

        for (const char of normalizedWord) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }
        current.isEndOfWord = true;
        current.data = data;
    }

    search(prefix: string): any[] {
        let current = this.root;
        const normalizedPrefix = prefix.toLowerCase();
        const results: any[] = [];

        // 1. Navigate to the node representing the prefix
        for (const char of normalizedPrefix) {
            if (!current.children.has(char)) {
                return []; // Prefix not found
            }
            current = current.children.get(char)!;
        }

        // 2. DFS to find all words starting with this prefix
        this.collectAllWords(current, results);
        return results;
    }

    private collectAllWords(node: TrieNode, results: any[]) {
        if (node.isEndOfWord) {
            results.push(node.data);
        }

        for (const childNode of node.children.values()) {
            this.collectAllWords(childNode, results);
        }
    }
}
