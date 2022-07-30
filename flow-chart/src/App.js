
import { useState } from "react";
import ReactFlow, {Background} from "react-flow-renderer";

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
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  {
    id: "4",
    data: { label: ""},
    position: {x: 600, y: 100},
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
  {id: "e1-4", source: "3", target: "4"}
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return <ReactFlow style = {{width: "100vw", height: "80vh"}} nodes={nodes} edges={edges} fitView>
    <Background/>
  </ReactFlow>;
}


function App() {
  return (
    <div className="App">
      <Flow/>
    </div>
  );
}

export default App;
