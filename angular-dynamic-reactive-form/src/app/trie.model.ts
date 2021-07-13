export class TrieNode {
    data: string;
    endOfword: boolean = false;
    children: Map<string, TrieNode> = new Map<string, TrieNode>();
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word:string) {
        let current: TrieNode = this.root;
        for(let i = 0; i < word.length; i++){
            let char: string = word.charAt(i);
            current = (current.children.has(char)) 
                ? current.children.get(char) 
                : current = current.children.set(char, new TrieNode()).get(char);
        }
        current.endOfword = true; 
    }

    find(word: string): boolean {
        let current: TrieNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let char: string = word.charAt(i);
            let node: TrieNode  = current.children.get(char);
            if (node == null)
                return false;
            current = node;
        }
        return current.endOfword;
    }

    remove(word: string): void {
        this.delete(this.root, word, 0);
    }

    delete(current: TrieNode, word:string, index: number){
        if (index == word.length) {
            if (!current.endOfword)
                return false;
            current.endOfword = false;
            return current.children && current.children.size > 0;
        }

        let char: string = word.charAt(index);
        let node: TrieNode  = current.children.get(char);
        if (node == null)
            return false;

        let shouldDeleteCurrentNode: boolean  = this.delete(node, word, index + 1) && !node.endOfword;
        if (shouldDeleteCurrentNode) {
            current.children.delete(char);
            return current.children && current.children.size > 0;
        }
        return false;
    }
}