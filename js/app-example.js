
class App {
  
  constructor() {
    console.log("APP STARTED")

    this.canvas = document.querySelector("canvas")
    this.context = this.canvas.getContext("2d")

    // init view    
    this.resizeCanvas()
    window.addEventListener('resize', (e) => this.resizeCanvas())

    this.initSimulation()
  
    // load data
    d3.json("/js/data.json", (error, graph) => {
       if (error) throw error
       this.loadData(graph)
    })
  }

  initSimulation() {
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id( function(d) { return d.id; } ))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.canvas.width / 2, this.canvas.height / 2));
  }

  loadData(graph) {
    console.log("loadData", graph)
    // save graph
    this.graph = graph

    this.simulation
      .nodes(this.graph.nodes)
      .on("tick", () => this.drawGraph())

    this.simulation
      .force("link")
      .links(graph.links)

    d3
      .select(this.canvas)
      .call(
        d3.drag()
          .container(this.canvas)
          .subject( () => this.dragsubject() )
          .on("start", () => this.dragstarted() )
          .on("drag", () => this.dragged() )
          .on("end", () => this.dragended() )
      );

  }

  dragsubject() {
    return this.simulation.find(d3.event.x, d3.event.y);
  }

  dragstarted() {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  dragended() {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  drawLink(d) {
    this.context.moveTo(d.source.x, d.source.y);
    this.context.lineTo(d.target.x, d.target.y);
  }

  drawNode(d) {
    this.context.moveTo(d.x + 10, d.y);
    this.context.arc(d.x, d.y, 10, 0, 2 * Math.PI);
  }

  drawGraph() {
  
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.beginPath();
    this.graph.links.forEach( (data) => this.drawLink(data) );
    this.context.strokeStyle = "#aaa";
    this.context.stroke();

    this.context.beginPath();
    this.graph.nodes.forEach( (data) => this.drawNode(data) );
    this.context.fill();
    this.context.strokeStyle = "#fff";
    this.context.stroke();
  }

  // reset width / height of canvas (keep fullscreen)
  resizeCanvas() {
    console.log("Resize");
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    if(this.graph) this.drawGraph()
  }

};

// On load start the app.
document.addEventListener('DOMContentLoaded', () => { new App() } );


var node = {
  name: '',
  icon: 'svg-path',
  type: 'mongo / scala / js / ',
  // node.data - the associated data, as specified to the constructor.
  // node.depth - zero for the root node, and increasing by one for each descendant generation.
  // node.height - zero for leaf nodes, and the greatest distance from any descendant leaf for internal nodes.
  // node.parent - the parent node, or null for the root node.
  // node.children - an array of child nodes, if any; undefined for leaf nodes.
  // node.value 
}

// Force Directed Graph is just nodes and links

// hierarchy graph requires structured data

//q's hierarch data as graph?  