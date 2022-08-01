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
import { Rectangle, Circle, Diamonds, Square } from "tabler-icons-react";
import "./App.css";

const Input = ({color}) => {


  return (
    <div style={{ width: "100%", height: "100%" }}>
      <textarea
        type="text"
        placeholder="type.."
        style={{
          height: "80%",
          width: "85%",
          marginTop: "0.3rem",
          outline: "none",
          border: "none",
          padding: "none",
          background: color
        }}
      ></textarea>
    </div>
  );
}
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
    className: "abc",
    style: { background: "red" },
  },
];

const initialEdges = [];

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
    (connection) => setEdges((edgs) => addEdge(connection, edges)),
    [setEdges]
  );

  let nodeCount = 10;

  const reactFlowInstance = useReactFlow();

  const addNode = useCallback((value, color) => {
    const id = `${++nodeCount}`;

    var Style = "";
    if (value == "circle") {
      Style = {
        width: "100px",
        height: "100px",
        backgroundColor: "#eab8ef",
        borderRadius: "50%",
      };
    } else if (value == "diamond") {
      Style = {
        backgroundColor: color,
        clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
        width: "100px",
        height: "100px",
      };
    } else if (value == "rectangle") {
      Style = {
        background: color,
      };
    } else if (value == "square") {
      Style = {
        height: "100px",
        width: "100px",
        background: color,
      };
    }

    const newNode = {
      id,
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200,
      },
      data: {
        label: <Input color={color}/>,
      },
      style: Style,
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const addField = (value,color) => {
    setShape(value);
    addNode(value,color);
  };
  return (
    <div className="flowchartWrapper">
      <div className="buttons-class">
        <button onClick={() => addField("diamond", "rgb(184 196 228)")}>
          <Diamonds style={{ height: "100%", width: "100%" }} />
        </button>
        <button onClick={() => addField("circle", "#eab8ef")}>
          <Circle style={{ height: "100%", width: "100%" }} />
        </button>
        <button onClick={() => addField("rectangle", "#b0d1a3")}>
          <Rectangle style={{ height: "100%", width: "100%" }} />
        </button>
        <button onClick={() => addField("square", "rgb(140 168 209)")}>
          <Square style={{ height: "100%", width: "100%" }} />
        </button>
      </div>
      <ReactFlow
        style={{
          width: "100vw",
          height: "90vh",
          background: "rgb(215 197 234)",
        }}
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
    </div>
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
