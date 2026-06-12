export const apps = [
    { id: "payments", name: "Payments Gateway" },
    { id: "orders", name: "Orders Fulfillment" },
    { id: "analytics", name: "Metrics Analytics" },
  ];
  
  export const graphs: Record<string, { nodes: any[]; edges: any[] }> = {
    payments: {
      nodes: [
        { id: "1", position: { x: 100, y: 150 }, data: { label: "Web Portal", status: "Healthy", value: 50 } },
        { id: "2", position: { x: 400, y: 150 }, data: { label: "Payment API", status: "Healthy", value: 75 } },
        { id: "3", position: { x: 700, y: 150 }, data: { label: "Postgres DB", status: "Healthy", value: 100 } },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3" },
      ],
    },
    orders: {
      nodes: [
        { id: "1", position: { x: 100, y: 150 }, data: { label: "Order Client", status: "Healthy", value: 60 } },
        { id: "2", position: { x: 400, y: 150 }, data: { label: "RabbitMQ Broker", status: "Degraded", value: 45 } },
        { id: "3", position: { x: 700, y: 150 }, data: { label: "Orders Cache", status: "Healthy", value: 90 } },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3" },
      ],
    },
    analytics: {
      nodes: [
        { id: "1", position: { x: 100, y: 150 }, data: { label: "Log Event Collector", status: "Healthy", value: 35 } },
        { id: "2", position: { x: 400, y: 150 }, data: { label: "Clickhouse Warehouse", status: "Healthy", value: 65 } },
        { id: "3", position: { x: 700, y: 150 }, data: { label: "Grafana Interface", status: "Down", value: 10 } },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3", animated: true },
      ],
    },
  };
  
  export const getApps = async () => {
    return new Promise<typeof apps>((resolve) => {
      setTimeout(() => resolve(apps), 400);
    });
  };
  
  export const getGraph = async (appId: string) => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const graph = graphs[appId as keyof typeof graphs];
        if (!graph) return reject(new Error("Graph structural configuration not found"));
        resolve(graph);
      }, 500);
    });
  };
  
  // Bonus Requirement: Dynamic downstream modifier updates persistence back into global memory
  export const updateMockNodeData = async (appId: string, nodeId: string, updatedFields: any) => {
    return new Promise<void>((resolve) => {
      const graph = graphs[appId];
      if (graph) {
        graph.nodes = graph.nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, ...updatedFields } };
          }
          return node;
        });
      }
      resolve();
    });
  };