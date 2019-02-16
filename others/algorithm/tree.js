class Tree {
  constructor(...props) {
    this.root = new Node(...props)
  }

  empty(tree = this.root) {
    if (tree !== null) {
      empty(tree.left)
      empty(tree.right)
      tree = null
    }
  }

  insert(data, tree = this.root) {
    if (data < tree.data) {
      if (tree.left === null) {
        tree.left = new Node(data)
      }
      this.insert(data, tree.left)
    }

    if (data > tree.data) {
      if (tree.right === null) {
        tree.right = new Node(data)
      }
      this.insert(data, tree.right)
    }
  }

  print(tree = this.root, index = 0) {
    if (tree !== null) {
      this.print(tree.left, index + 1)
      this.print(tree.right, index + 1)
      console.log(tree.data)
    }
  }
}

class Node {
 constructor(data, left = null, right = null) {
   this.data = data
   this.left = left
   this.right = right
 } 
}

const tree = new Tree(20)

for(let i = 0; i < 100; i++) {
  tree.insert(i)
}

tree.print()