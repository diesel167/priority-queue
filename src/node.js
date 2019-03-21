class Node {
	constructor(data, priority) {
		this.data=data;
		this.priority=priority;
		this.parent=null;
		this.left=null;
		this.right=null;
	}

	appendChild(node) {
        if(this.left===null){
            this.left=node;
            this.left.parent=this;
        }
        else if(this.right===null){
            this.right=node;
            this.right.parent=this;
        }

	}

	removeChild(node) {
        if(node===this.left){
            this.left=null;
            node.parent=null;
        }
        else if(node===this.right){
            this.right=null;
            node.parent=null;
        }
        else{
            alert('not in child');
            return 0;
        }

	}

	remove() {
        if(this.parent!==null){
            this.parent.removeChild(this);
        }
	}

	swapWithParent() {
        if(this.parent!==null){

            let parent1=this.parent;
            let parent2=this.parent.parent;
            let toswap=this;

            let left, right;
            if(parent1.right===toswap){
                left=parent1.left;
                parent1.left=toswap.left;
                if(toswap.left!==null){
                    toswap.left.parent=parent1;
                }
                toswap.left=left;
                if(left!==null){
                    left.parent=toswap;
                }
                parent1.right=toswap.right;
                if(toswap.right!==null){
                    toswap.right.parent=parent1;
                }
                toswap.right=parent1;
                parent1.parent=toswap;
            }
            else{
                right=parent1.right;
                parent1.right=toswap.right;
                if(toswap.right!==null){
                    toswap.right.parent=parent1;
                }
                toswap.right=right;
                if(right!==null){
                    right.parent=toswap;
                }
                parent1.left=toswap.left;
                if(toswap.left!==null){
                    toswap.left.parent=parent1;
                }
                toswap.left=parent1;
                parent1.parent=toswap;
            }

            if (parent2!==null){
                if(parent2.left===parent1){
                    parent2.left=toswap;
                }
                else{
                    parent2.right=toswap;
                }
                toswap.parent=parent2;
            }
            else{
                toswap.parent=null;
            }
        }
	}
}

module.exports = Node;
