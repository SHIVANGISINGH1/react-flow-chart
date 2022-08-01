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
import ExportExcelFile from "./ExportExcelFile";
import { Rectangle, Circle, Diamonds, Square } from "tabler-icons-react";
import "./App.css";

const Input = () => {
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
          background: "transparent",
        }}
      ></textarea>
    </div>
  );
};
// const initialNodes = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Input Node" },
//     position: { x: 250, y: 25 },
//     className: "abc",
//     style: { background: "red" },
//   },
// ];

const initialNodes = [
  {
    id: "6",
    position: {
      x: 1506.2017500122836,
      y: 644.8331999397706,
    },
    data: { label: <Input /> },
    style: {
      width: "100px",
      height: "100px",
      backgroundColor: "#eab8ef",
      borderRadius: "50%",
    },
    width: 100,
    height: 100,
    selected: true,
    positionAbsolute: {
      x: 1506.2017500122836,
      y: 644.8331999397706,
    },
    dragging: false,
  },
  {
    id: "5",
    position: {
      x: -87.44162963427095,
      y: 754.134139218787,
    },
    data: { label: <Input /> },
    style: {
      height: "100px",
      width: "100px",
      background: "rgb(140 168 209)",
    },
    width: 100,
    height: 100,
    selected: false,
    positionAbsolute: {
      x: -87.44162963427095,
      y: 754.134139218787,
    },
    dragging: false,
  },
  {
    id: "4",
    position: {
      x: 2026.0985661261043,
      y: 634.1773630414016,
    },
    data: { label: <Input /> },
    style: {
      height: "100px",
      width: "100px",
      background: "rgb(140 168 209)",
    },
    width: 100,
    height: 100,
    selected: false,
    positionAbsolute: {
      x: 2026.0985661261043,
      y: 634.1773630414016,
    },
    dragging: false,
  },
  {
    id: "3",
    position: {
      x: 1985.1503220228456,
      y: -364.79898607697476,
    },
    data: { label: <Input /> },
    style: {
      height: "100px",
      width: "100px",
      background: "rgb(140 168 209)",
    },
    selected: false,
    positionAbsolute: {
      x: 1985.1503220228456,
      y: -364.79898607697476,
    },
    dragging: false,
  },
  {
    id: "2",
    position: {
      x: 802.1701193732141,
      y: 169.15798741093954,
    },
    data: { label: <Input /> },
    style: {
      height: "100px",
      width: "100px",
      background: "rgb(140 168 209)",
    },
    selected: false,
    positionAbsolute: {
      x: 802.1701193732141,
      y: 169.15798741093954,
    },
    dragging: false,
  },
  {
    id: "3",
    position: {
      x: 1985.1503220228456,
      y: -364.79898607697476,
    },
    data: { label: <Input /> },
    style: {
      width: "100px",
      height: "100px",
      backgroundColor: "#eab8ef",
      borderRadius: "50%",
    },
    width: 100,
    height: 100,
    selected: false,
    positionAbsolute: {
      x: 1985.1503220228456,
      y: -364.79898607697476,
    },
    dragging: false,
  },
  {
    id: "2",
    position: {
      x: 802.1701193732141,
      y: 169.15798741093954,
    },
    data: { label: <Input /> },
    style: {
      background: "#b0d1a3",
    },
    width: 150,
    height: 64,
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: 802.1701193732141,
      y: 169.15798741093954,
    },
  },
  {
    id: "1",
    type: "input",
    data: {
      label: "Input Node",
    },
    position: {
      x: -227.15938244916458,
      y: -384.24986056779085,
    },
    className: "abc",
    style: {
      background: "red",
    },
    width: 150,
    height: 36,
    selected: false,
    positionAbsolute: {
      x: -227.15938244916458,
      y: -384.24986056779085,
    },
    dragging: false,
  },
];

const initialEdges = [
  {
    source: "1",
    sourceHandle: null,
    target: "3",
    targetHandle: null,
    id: "reactflow__edge-1-3",
  },
  {
    source: "3",
    sourceHandle: null,
    target: "2",
    targetHandle: null,
    id: "reactflow__edge-3-2",
  },
  {
    source: "3",
    sourceHandle: null,
    target: "4",
    targetHandle: null,
    id: "reactflow__edge-3-4",
  },
  {
    source: "2",
    sourceHandle: null,
    target: "6",
    targetHandle: null,
    id: "reactflow__edge-2-6",
  },
  {
    source: "6",
    sourceHandle: null,
    target: "5",
    targetHandle: null,
    id: "reactflow__edge-6-5",
  },
  {
    source: "1",
    sourceHandle: null,
    target: "5",
    targetHandle: null,
    id: "reactflow__edge-1-5",
  },
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
    (connection) => setEdges((edgs) => addEdge(connection, edgs)),
    [setEdges]
  );

  let nodeCount = 1;

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
        label: <Input color={color} />,
      },
      style: Style,
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  const addField = (value, color) => {
    setShape(value);
    addNode(value, color);
  };

  const exportData = () => {
    // nodes
    const finalArray = [];
    nodes.map((item) => {
      finalArray.push({
        id: item.id,
        position: JSON.stringify(item.position),
        data: null,
        style: JSON.stringify(item.style),
        width: item.width,
        height: item.height,
        selected: item.selected,
        positionAbsolute: JSON.stringify(item.positionAbsolute),
        dragging: item.dragging,
      });
    });

    ExportExcelFile({
      fileName: "exportflowchart_nodes",
      csvData: finalArray,
      forceExport: true,
    });

    // edges
    const edgesArray = [];
    edges.map((item) => {
      edgesArray.push({
        source: item.source,
        sourceHandle: item.sourceHandle,
        target: item.target,
        targetHandle: item.targetHandle,
        id: item.id,
      });
    });

    ExportExcelFile({
      fileName: "exportflowchart_edges",
      csvData: edgesArray,
      forceExport: true,
    });
  };

  // const importData = () => {
  //   const finalArray = [];
  //   nodes.map((item) => {
  //     finalArray.push({
  //       id: item.id,
  //       position: JSON.stringify(item.position),
  //       data: null,
  //       style: JSON.stringify(item.style),
  //       width: item.width,
  //       height: item.height,
  //       selected: item.selected,
  //       positionAbsolute: JSON.stringify(item.positionAbsolute),
  //       dragging: item.dragging,
  //     });
  //   });

  //   ExportExcelFile({
  //     fileName: "exportflowchart_nodes",
  //     csvData: finalArray,
  //     forceExport: true,
  //   });
  // };
  console.log("aaaa", nodes, edges);
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
        <button onClick={exportData}>Export</button>
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
