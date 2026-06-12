export const apps = [
    {
      id: "payments",
      name: "Payments",
    },
    {
      id: "orders",
      name: "Orders",
    },
    {
      id: "analytics",
      name: "Analytics",
    },
  ];
  
  export const graphs = {
    payments: {
      nodes: [
        {
          id: "1",
          position: { x: 100, y: 100 },
          data: {
            label: "Frontend",
            status: "Healthy",
            value: 50,
          },
        },
        {
          id: "2",
          position: { x: 400, y: 100 },
          data: {
            label: "Payment API",
            status: "Healthy",
            value: 75,
          },
        },
        {
          id: "3",
          position: { x: 700, y: 100 },
          data: {
            label: "Payments DB",
            status: "Healthy",
            value: 100,
          },
        },
      ],
  
      edges: [
        {
          id: "e1-2",
          source: "1",
          target: "2",
        },
        {
          id: "e2-3",
          source: "2",
          target: "3",
        },
      ],
    },
  
    orders: {
      nodes: [
        {
          id: "1",
          position: { x: 100, y: 100 },
          data: {
            label: "Order Service",
            status: "Healthy",
            value: 60,
          },
        },
        {
          id: "2",
          position: { x: 400, y: 100 },
          data: {
            label: "Message Queue",
            status: "Degraded",
            value: 45,
          },
        },
        {
          id: "3",
          position: { x: 700, y: 100 },
          data: {
            label: "Orders DB",
            status: "Healthy",
            value: 90,
          },
        },
      ],
  
      edges: [
        {
          id: "e1-2",
          source: "1",
          target: "2",
        },
        {
          id: "e2-3",
          source: "2",
          target: "3",
        },
      ],
    },
  
    analytics: {
      nodes: [
        {
          id: "1",
          position: { x: 100, y: 100 },
          data: {
            label: "Collector",
            status: "Healthy",
            value: 35,
          },
        },
        {
          id: "2",
          position: { x: 400, y: 100 },
          data: {
            label: "Warehouse",
            status: "Healthy",
            value: 65,
          },
        },
        {
          id: "3",
          position: { x: 700, y: 100 },
          data: {
            label: "Dashboard",
            status: "Down",
            value: 10,
          },
        },
      ],
  
      edges: [
        {
          id: "e1-2",
          source: "1",
          target: "2",
        },
        {
          id: "e2-3",
          source: "2",
          target: "3",
        },
      ],
    },
  };
  
  export const getApps = async () => {
    return new Promise<typeof apps>((resolve) => {
      setTimeout(() => {
        resolve(apps);
      }, 500);
    });
  };
  
  export const getGraph = async (
    appId: string
  ) => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const graph =
          graphs[
            appId as keyof typeof graphs
          ];
  
        if (!graph) {
          reject(
            new Error("Graph not found")
          );
          return;
        }
  
        resolve(graph);
      }, 500);
    });
  };