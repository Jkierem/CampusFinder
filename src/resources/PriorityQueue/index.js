class PriorityQueue{
  constructor( nodes=[] ){
    this._nodes=nodes
  }

  enqueue = (priority, key) => {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  }

  dequeue = () => {
    return this._nodes.shift().key;
  }

  sort = () => {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  }

  isEmpty = () => {
    return !this._nodes.length;
  };
}

export default PriorityQueue
