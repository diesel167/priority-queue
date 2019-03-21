const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if(maxSize){
			this.maxSize=maxSize;
        }
        else{
            this.maxSize=30;
        }
        this.heap=new MaxHeap();
	}

	push(data, priority) {
        if(this.heap.size()>=this.maxSize){
            alert('Max size');
        }
        else{
            this.heap.push(data,priority);
        }
	}

	shift() {
        if(this.heap.isEmpty()){
            alert('Empty');
        }
        else{
            let rem = this.heap.pop();
            return rem;
        }
	}

	size() {
        return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
