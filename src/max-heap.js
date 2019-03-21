const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root=null;
        this.parentNodes=[];
	}

	push(data, priority) {
	    let node=new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}



	pop() {
		if(this.root!==null){
		    //let a=this.root.data;
		    let det=this.detachRoot();
		    if(det!==null){
                this.restoreRootFromLastInsertedNode(det);
                this.shiftNodeDown(this.root);
            }
            return det.data;
        }
	}

	detachRoot() {
	    //copy root node
	    let a=this.root;
	    //reset root
		this.root=null;
        let temp=[];
        this.parentNodes.forEach((node)=>{
            if(node!==a)
                temp.push(node);
        });
        this.parentNodes=temp;

		return a;
	}

	restoreRootFromLastInsertedNode(detached) {
        let isEmpty=(det)=>{
            for(let key in det){
                return false
            }
            return true
        };
	    if(this.parentNodes.length>0&&!isEmpty(detached)){
            this.root=this.parentNodes.pop();
            this.root.left=detached.left;
            this.root.right=detached.right;
            if(detached.left!==null){
                detached.left.parent=this.root;
            }
            if(detached.right!==null){
                detached.right.parent=this.root;
            }
            if(this.root.parent!==detached && this.parentNodes.indexOf(this.root.parent)<0){
                this.parentNodes.unshift(this.root.parent);
            }
            else if(this.root.parent===detached){
                this.parentNodes.unshift(this.root);
            }
            this.root.remove();
        }
	}

	size() {
        let size=0;
        if(this.root!==null){
            size++;
            let loop=(node)=> {
                if(node!==null){
                    if(node.right!==null){
                        size++;
                        loop(node.right);
                    }
                    if(node.left!==null){
                        size++;
                        loop(node.left);
                    }
                }
            };
            loop(this.root);
        }

        return size;
	}

	isEmpty() {
        if(this.size()===0){
            return true;
        }
        else{
            return false
        }
	}

	clear() {
		this.root=null;
		this.parentNodes=[];
	}

	insertNode(node) {
		if(this.root===null){
		    this.root=node;
		    this.parentNodes.push(node);
        }
        else{
            this.parentNodes[0].appendChild(node);
            if(this.parentNodes[0].left!==null&&this.parentNodes[0].right!==null){
                this.parentNodes.shift();
            }
            this.parentNodes.push(node); //add node to parentNodes at the 0 position
        }
	}

	shiftNodeUp(node) {
	   if(node.parent!==null && node.priority>node.parent.priority){
            if(this.parentNodes.indexOf(node.parent)>=0){
                let parent=this.parentNodes.indexOf(node.parent);
                let toshift=this.parentNodes.indexOf(node);
                //swap
                let temp;
                temp=parent;
                parent=toshift;
                toshift=temp;
                this.parentNodes[parent]=node.parent;
                this.parentNodes[toshift]=node;
            }
            else{
                this.parentNodes[this.parentNodes.indexOf(node)]=node.parent;
            }
   	        node.swapWithParent();
            this.shiftNodeUp(node);
        }
        else if(node.parent==null){
            this.root=node;
        }
    }

    shiftNodeDown(node) {
	    if(node!==null){
            if((node.left!==null && node.right!==null && node.left.priority>node.priority &&node.left.priority>node.right.priority)||
                (node.left!==null && node.right==null && node.left.priority>node.priority)){
                if(this.parentNodes.indexOf(node)>=0){
                    let parent=this.parentNodes.indexOf(node);
                    let toshift=this.parentNodes.indexOf(node.left);
                    //swap
                    let temp;
                    temp=parent;
                    parent=toshift;
                    toshift=temp;
                    this.parentNodes[parent]=node;
                    this.parentNodes[toshift]=node.left;
                }
                else if(this.parentNodes.indexOf(node.left)>=0){
                    this.parentNodes[this.parentNodes.indexOf(node.left)]=node;
                }
                node.left.swapWithParent();
                if(node===this.root){
                    this.root=node.parent;
                }
                this.shiftNodeDown(node);
            }
            else if((node.left!==null && node.right!==null && node.right.priority>node.priority &&  node.left.priority<node.right.priority)||
                (node.right!==null && node.left==null && node.right.priority>node.priority)){
                if(this.parentNodes.indexOf(node)>=0){
                    let parent=this.parentNodes.indexOf(node);
                    let toshift=this.parentNodes.indexOf(node.right);
                    //swap
                    let temp;
                    temp=parent;
                    parent=toshift;
                    toshift=temp;
                    this.parentNodes[parent]=node;
                    this.parentNodes[toshift]=node.right;
                }
                else if(this.parentNodes.indexOf(node.right)>=0){
                    this.parentNodes[this.parentNodes.indexOf(node.right)]=node;
                }
                node.right.swapWithParent();
                if(node===this.root){
                    this.root=node.parent;
                }
                this.shiftNodeDown(node);
            }
        }
	}
}

module.exports = MaxHeap;
