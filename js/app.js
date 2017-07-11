// load data
// parse nodes / links
// render graph
  // nodes
  // links
  // get layout working correctly
  // add / hide more nodes (collapsable)
  // images for nodes
  // text for nodes
  // nodes clickable

// zoom to section
// hightlight connected nodes

// Main App
function App() {

  // vars 
  let canvas, context, 
      origData, graph
  

  // init app load
  function init() {
    console.log("APP init")

    canvas = document.querySelector("canvas")
    context = canvas.getContext("2d")

    // init layout    
    resizeCanvas()
    window.addEventListener('resize', (e) => resizeCanvas())

    initForceGraph()

    // laod data
    // d3.json("/js/data-small.json", (error, data) => {
    //    if (error) throw error

    //   //  let hierarchy = d3.hierarchy(data)
       
    //    // parse data into Nodes / Links
    //   nodes = parseNodes(data)
    //   //  links = parseLinks(nodes)

    //    // send to forcegraph
    //   //  initForceGraph()
    // });
  }

  
  
  function initForceGraph() {
    console.log("initForceGraph") 
    graph = new ForceGraph(canvas)
  }

 






















  // takes heirarchy data and
  function parseNodes(data) {
    console.log("parseNodes", data)
    
    let items = [], count = 0

    // recursivley flatten children
    function flattenChildren(node, parent, level) {
      
      if (node.children && node.children.length > 0)
        node.children.forEach( (item) => flattenChildren(item, node, level + 1) )

      node.id = ++count
      node.level = level
      
      if(parent)
        node.parentLink = parent.name
      
      items.push(node)
    }

    flattenChildren(data, null, 0)

    // TODO


    console.log("parseNodes", items)
    return items
  }

  // takes node list and defines links
  function parseLinks(data) {
    let items = []

    // TODO

    return items
  }

  


  

  // function initSimulation() {
  //   
  // }

  // loadData(graph) {
  //   console.log("loadData", graph)
  //   // save graph
  //   this.graph = graph

  //   this.simulation
  //     .nodes(this.graph.nodes)
  //     .on("tick", () => this.drawGraph())

  //   this.simulation
  //     .force("link")
  //     .links(graph.links)

  //   d3
  //     .select(this.canvas)
  //     .call(
  //       d3.drag()
  //         .container(this.canvas)
  //         .subject( () => this.dragsubject() )
  //         .on("start", () => this.dragstarted() )
  //         .on("drag", () => this.dragged() )
  //         .on("end", () => this.dragended() )
  //     );

  // }

  // dragsubject() {
  //   return this.simulation.find(d3.event.x, d3.event.y);
  // }

  // dragstarted() {
  //   if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
  //   d3.event.subject.fx = d3.event.subject.x;
  //   d3.event.subject.fy = d3.event.subject.y;
  // }

  // dragged() {
  //   d3.event.subject.fx = d3.event.x;
  //   d3.event.subject.fy = d3.event.y;
  // }

  // dragended() {
  //   if (!d3.event.active) this.simulation.alphaTarget(0);
  //   d3.event.subject.fx = null;
  //   d3.event.subject.fy = null;
  // }

  // drawLink(d) {
  //   this.context.moveTo(d.source.x, d.source.y);
  //   this.context.lineTo(d.target.x, d.target.y);
  // }

  // drawNode(d) {
  //   this.context.moveTo(d.x + 10, d.y);
  //   this.context.arc(d.x, d.y, 10, 0, 2 * Math.PI);
  // }

  // drawGraph() {
  
  //   this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  //   this.context.beginPath();
  //   this.graph.links.forEach( (data) => this.drawLink(data) );
  //   this.context.strokeStyle = "#aaa";
  //   this.context.stroke();

  //   this.context.beginPath();
  //   this.graph.nodes.forEach( (data) => this.drawNode(data) );
  //   this.context.fill();
  //   this.context.strokeStyle = "#fff";
  //   this.context.stroke();
  // }

  // reset width / height of canvas (keep fullscreen)
  function resizeCanvas() {
    console.log("resizeCanvas");

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // TODO: Force- re-render of graph
    // if we have data, force re-render of graph
    // if(nodes) {
    //   // Todo: for redraw of graph etc
    //   setCoreNodePositions()
    //   renderGraph()
    // }
  }


  // public api 
  return {
    init: init
  }
};

// start app on domload
document.addEventListener('DOMContentLoaded', () => { 
  window.app = new App() 
  app.init()
});


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