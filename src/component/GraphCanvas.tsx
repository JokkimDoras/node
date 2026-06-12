import {
    ReactFlow,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
  } from "@xyflow/react";
  
  import "@xyflow/react/dist/style.css";
  
  import { useEffect } from "react";
  
  import { useUIStore } from "../store/uiStore";
  import { useGraph } from "../hooks/useGraph";
  
  export default function GraphCanvas() {
    const selectedAppId = useUIStore(
      (state) => state.selectedAppId
    );
  
    const setSelectedNodeId = useUIStore(
      (state) => state.setSelectedNodeId
    );
  
    const {
      data,
      isLoading,
      error,
    } = useGraph(selectedAppId);
  
    const [nodes, setNodes, onNodesChange] =
      useNodesState([]);
  
    const [edges, setEdges, onEdgesChange] =
      useEdgesState([]);
  
    useEffect(() => {
      if (!data) return;
  
      setNodes(data.nodes);
      setEdges(data.edges);
    }, [data, setNodes, setEdges]);
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          Loading graph...
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          Failed to load graph
        </div>
      );
    }

    useEffect(() => {
        const handleDelete = (e: KeyboardEvent) => {
          if (
            e.key === "Delete" ||
            e.key === "Backspace"
          ) {
            if (!selectedNodeId) return;
      
            setNodes((nodes) =>
              nodes.filter(
                (node) =>
                  node.id !== selectedNodeId
              )
            );
      
            setSelectedNodeId(null);
          }
        };
      
        window.addEventListener(
          "keydown",
          handleDelete
        );
      
        return () =>
          window.removeEventListener(
            "keydown",
            handleDelete
          );
      }, [selectedNodeId]);
  
    return (
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => {
            console.log("Clicked Node:", node);
  
            setSelectedNodeId(node.id);
          }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    );
  }