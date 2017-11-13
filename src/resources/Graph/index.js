import PriorityQueue from '../PriorityQueue'

class Graph{
  constructor( vertices={} ){
    this.vertices = vertices;
  }

  addVertex = (name, edges) =>{
    this.vertices[name] = edges;
  };

  getPath = (src , dst ) =>{
    var path = this.shortestPath(src,dst)
    path.push(src)
    path.reverse()
    var peso = 0
    for (var i = 0; i < path.length - 1; i++) {
      peso += this.vertices[path[i]][path[i+1]]
    }
    return {path:path , peso:peso}
  }

  shortestPath = (start, finish) => {
    var INFINITY = 1/0
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path = [];

        while(previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return path;
  };
}

export default Graph
