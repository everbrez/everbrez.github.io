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
}

class Node {
 constructor(data, left = null, right = null) {
   this.data = data
   this.left = left
   this.right = right
 } 
}