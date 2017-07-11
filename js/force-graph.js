/*
  Force Layout 
  Requires a 
  Expects data in Node and Links
*/
function ForceGraph(initCanvas) {

  // vars 
  let canvas = initCanvas, context, 
      origData, forceGraph
  

  let nodes = [
    {"id": "Database", "group": 1},
    {"id": "Clients", "group": 1},
    {"id": "Services", "group": 1},    
    {"id": "Ingestion", "group": 1},
    {"id": "Data Science", "group": 1},
    {"id": "Data Warehouse", "group": 1}
  ]

  let links = [
    {"source": "Clients", "target": "Services", "value": 1},
    {"source": "Services", "target": "Database", "value": 1},
    {"source": "Ingestion", "target": "Database", "value": 1},
    {"source": "Data Science", "target": "Database", "value": 1},
    {"source": "Data Warehouse", "target": "Database", "value": 1}
  ]
  


  // init app load
  function init() {
    console.log("APP init")

    context = canvas.getContext("2d")

    // init layout    
    
    setCoreNodePositions()
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

  // in our graph, we want the core nodes in fixed positions
  function setCoreNodePositions() {
    nodes.map( (item, index) => {
      let centerPosX = canvas.width / 2
      let centerPosY = canvas.height / 2
      let defaultDistance = 200

      switch (item.id) {
        case 'Clients':
          item.fx = centerPosX - defaultDistance
          item.fy = centerPosY
          break;
        
        case 'Services':
          item.fx = centerPosX
          item.fy = centerPosY
          break;

        case 'Database':
          item.fx = centerPosX + defaultDistance
          item.fy = centerPosY
          break;

        case 'Ingestion':
          item.fx = centerPosX + defaultDistance
          item.fy = centerPosY - defaultDistance
          break;

      }
    })
  }
  
  function initForceGraph() {
    console.log("initForceGraph")

    // define simulation 
    forceGraph = d3.forceSimulation()

    // apply forces
    forceGraph      
      .force("link", d3.forceLink())
      .force("charge", d3.forceManyBody())
      // .force("collide", d3.forceCollide())
      .force("center", d3.forceCenter(canvas.width / 2, canvas.height / 2))
        
    forceGraph
      .force("charge")
      .strength(-200)

    // apply nodes
    forceGraph
      .nodes(nodes)
      .on("tick", renderGraph)
      
    // setup / define link force
    forceGraph
      .force("link")
      .id( (data) => { return data.id } )
      .distance( 200 )
      .links(links) 
    
  
  }

  function renderGraph() {
    // clear to redraw
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw links
    context.beginPath();
    links.forEach(drawLink);
    context.strokeStyle = "#aaa";
    context.stroke();

    // draw nodes
    context.beginPath();
    nodes.forEach(drawNode)
    context.fill();   
  }

  function drawLink(linkData) {
    context.moveTo(linkData.source.x, linkData.source.y);
    context.lineTo(linkData.target.x, linkData.target.y);
  }

  function drawNode(nodeData) {
    // todo - draw icon / shape
    context.moveTo(nodeData.x, nodeData.y);
    context.arc(nodeData.x, nodeData.y, 10, 0, 2 * Math.PI);

    // text
    context.fillText(nodeData.id, nodeData.x, nodeData.y)
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

  // auto init (constructor)
  init()

  // public api 
  return {
    init: init
  }
};

