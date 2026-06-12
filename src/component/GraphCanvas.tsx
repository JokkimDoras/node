import {
    ReactFlow,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    type Node,
    type NodeChange,
  } from "@xyflow/react";
  import "@xyflow/react/dist/style.css";
  import { useEffect } from "react";
  import { useUIStore } from "../store/uiStore";
  import { useGraph } from "../hooks/useGraph";
  
  export default function GraphCanvas() {
    const selectedAppId = useUIStore((state) => state.selectedAppId);
    const selectedNodeId = useUIStore((state) => state.selectedNodeId);
    const setSelectedNodeId = useUIStore((state) => state.setSelectedNodeId);
  
    const { data, isLoading, error } = useGraph(selectedAppId);
  
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
    useEffect(() => {
      if (!data) return;
      setNodes(data.nodes);
      setEdges(data.edges);
      setSelectedNodeId(null);
    }, [data, setNodes, setEdges, setSelectedNodeId]);
  
    const handleNodesChangeInternal = (changes: NodeChange[]) => {
      onNodesChange(changes);
      const selectChange = changes.find((c) => c.type === "select");
      if (selectChange && selectChange.type === "select" && !selectChange.selected) {
        if (selectedNodeId === selectChange.id) {
          setSelectedNodeId(null);
        }
      }
    };
  
    const handleNodesDelete = (deletedNodes: Node[]) => {
      if (deletedNodes.some((n) => n.id === selectedNodeId)) {
        setSelectedNodeId(null);
      }
    };
  
    if (!selectedAppId) {
      return (
        <div className="flex items-center justify-center h-full text-sm font-medium text-slate-400 bg-slate-50/50 border border-dashed m-4 rounded-xl">
          Select an active application profile to generate infrastructure topologies.
        </div>
      );
    }
  
    if (isLoading) {
      return <div className="flex items-center justify-center h-full text-sm font-medium text-slate-500">Syncing structural nodes...</div>;
    }
  
    if (error) {
      return <div className="flex items-center justify-center h-full font-medium text-red-500">Failed to render topography structure.</div>;
    }
  
    return (
      <div className="w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChangeInternal}
          onEdgesChange={onEdgesChange}
          onNodesDelete={handleNodesDelete}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          fitView
        >
          {/* Typecast variant to any to bypass the library type collision entirely */}
          <Background variant={"dots" as any} gap={16} size={1} color="#cbd5e1" />
          <Controls />
        </ReactFlow>
      </div>
    );
  }