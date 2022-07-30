import { useState, useCallback } from "react";
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

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
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
  const addNode = useCallback( () => {
    const id = `${++nodeCount}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200
      },
      data: {
        label: `Node ${id}`
      }
    }
    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
    <>
      <button onClick={addNode}>Add Node</button>
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
