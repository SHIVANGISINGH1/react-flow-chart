import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  useReactFlow,
  ReactFlowProvider,
} from "react-flow-renderer";
import "./App.css";


function Input() {
  return (
    <div style={{width: "100%", height: "100%"}}>
        <textarea type="text" placeholder="type.." style={{height: "80%", width: "85%", marginTop: "0.3rem", outline: "none", border: "none", padding: "none"}}></textarea>
    </div>
  )
}
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
    className:"abc",
    style: {background: "red"}
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <Input/> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  {
    id: "4",
    data: { label: <div>Default Node4</div> },
    position: { x: 50, y: 700 },
  },
  {
    id: "5",
    data: { label: <div>Default Node5</div> },
    position: { x: 300, y: 200 },
  },
  {
    id: "6",
    data: { label: <div>Default Node6</div> },
    position: { x: 450, y: 500 },
  },
  {
    id: "7",
    data: { label: <div>Default Node7</div> },
    position: { x: 500, y: 600 },
  }
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  
];


function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [shape, setShape] = useState("rectangle");
  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edg) => applyEdgeChanges(changes, edg)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((edgs) => addEdge(connection,edges)),
    [setEdges]
  );
  
  let nodeCount = 10;
  

  const reactFlowInstance = useReactFlow();

  const addNode = useCallback( (value) => {
    const id = `${++nodeCount}`;
    
    var Style = "";
    if (value == "circle") {
      Style = {
        width: "100px",
        height: "100px",
        backgroundColor: "#eab8ef",
        borderRadius: "50%",
      };
    } else if (value == "triangle") {
      Style = {
        backgroundColor: "#003BDE",
	      clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
	      width: "100px",
	      height: "100px"
      };
    } else if (value == "rectangle") {
      Style = {
        background: "purple",
      };
    }
    else if (value == "square") {
      Style = {
        height: "100px",
        width: "100px",
        background: "red"
      }
    }
    else if (value == "trapezium") {
      Style = {
        width: "200px",
        height: "200px",
        background: "red",
        clipPath: "polygon(0 0, 100% 0, 84% 41%, 16% 41%)"
      }
    }
    const newNode = {
      id,
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200
      },
      data: {
        label: <Input/>
      },
      style: Style
    }
    reactFlowInstance.addNodes(newNode);
  }, []);
  
  // useEffect(() => { 
  //   addNode();  
  // }, [shape])

  const addField = (value) => {
    setShape(value);
    addNode(value);
  }
  return (
    <>
      <button onClick={() => addField("triangle")}>Add Triangle</button>
      <button onClick={() => addField("circle")}>Add Circle</button>
      <button onClick={() => addField("rectangle")}>Add Rectangle</button>
      <button onClick={() => addField("square")}>Add Square</button>
      <button onClick={() => addField("trapezium")}>Add Trapezium</button>
      <ReactFlow
        style={{ width: "100vw", height: "90vh" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
