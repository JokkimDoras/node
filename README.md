# App Graph Builder — Frontend Engineering Canvas

This repository contains a responsive, production-ready "App Graph Builder" UI built to fulfill the take-home assessment guidelines. The system combines interactive node-link diagrams, contextual structural tracking, and decoupled state synchronization architectures.

---

## Core Architectural Design Decisions

The application explicitly avoids monolithic state anti-patterns by distributing state management across three decoupled, specialized layers based on data volatility and ownership.

### 1. Separation of Concerns & State Boundaries
* **Asynchronous Server State (TanStack Query):** Remote entities (available applications and baseline architectural topologies) are owned and managed by TanStack Query. This layer handles caching, automatic query invalidation upon application environment switching, and simulated infrastructure API loading/error boundaries.
* **Localized Viewport State (ReactFlow State Engine):** Canvas coordinate updates, dragging calculations, and active transformations are managed locally inside ReactFlow's internal hooks via `useNodesState` and `useEdgesState`. Propagating continuous drag-and-drop actions to a global state machine like Zustand causes major thread choking and performance stutter. This strategy keeps canvas frame updates locked at 60 FPS.
* **Macro-Level Client State (Zustand):** Transitory global values that bridge unrelated structural segments—such as the currently focused application namespace (`selectedAppId`), active canvas elements (`selectedNodeId`), configuration panel routing states, and mobile viewport drawer states—are stored in a lightweight Zustand container.

### 2. Bidirectional Synchronization Data Pipeline
To satisfy synchronized form slider inputs while ensuring clean canvas state persistence, the `NodeInspector` hooks directly into the live viewport stream utilizing ReactFlow's functional wrapper primitives. 
* Modifying numerical configuration values triggers an instantaneous internal data patch on the active canvas element, causing both the slider and explicit numeric input fields to track each other concurrently.
* Simultaneously, changes are piped directly into an in-memory mutable mock store (`updateMockNodeData`). If an evaluator alters metrics within a profile, shifts to an alternative microservices topology, and subsequently returns, the modified profiles persist accurately across query sessions.

### 3. Strict Type Safety Overrides
ReactFlow natively marks arbitrary node payloads (`node.data`) as an unstructured fallback object collection (`Record<string, unknown>`). To strictly comply with high-level type rules without introducing hazardous explicit `any` declarations, the schema leverages structured data casting interfaces (`ServiceNodeData`) upon object retrieval. This guarantees compile-time type protection across all dynamic telemetry nodes and attribute forms.

---

## Step-by-Step Installation & Setup

Ensure you have a modern instance of **Node.js (v18+)** and a corresponding package manager installer configured on your machine.

### 1. Clone the Source Repository
```bash
git clone [https://github.com/your-username/app-graph-builder.git](https://github.com/your-username/app-graph-builder.git)
cd app-graph-builder
2. Install Project Dependencies
Bash
npm install
3. Initialize Local Development Environment
Launches the Vite local optimization compilation pipeline.

Bash
npm run dev
Open your browser and navigate to http://localhost:5173 to test the user interface.

Mandatory Project Scripts
The configuration provides identical shell scripts matching the mandatory assessment guidelines to validate type security, code formatting, and successful bundling.

npm run dev: Boots the local Vite development web server with instant module reloading.

npm run build: Executes the standalone TypeScript compiler checking sequence before packaging a compressed distribution module inside the /dist directory.

npm run preview: Spins up a local production simulation server to preview the bundled optimization assets locally.

npm run lint: Scans code files against configuration rules to isolate anti-patterns, style violations, and unreachable logic paths.

npm run typecheck: Invokes the TypeScript compilation engine with the --noEmit flag enabled, performing a full static type assessment pass over all custom layout modules.

Known Implementation Limitations
Temporary Session Multi-Tenancy: The simulated data update model utilizes global in-memory array manipulation state buffers. Structural edits remain persistent across cross-application navigation routing cycles but will revert to initial presets if the browser window executes a hard reload execution sequence.

Deletion Cascade Constraint: Deleting an infrastructure node via Backspace or Delete key triggers full object extraction from the local layout. It does not automatically cascade and dissolve orphaned edges linked to the dead node reference. Selecting those dangling edges and executing a manual delete command cleans up the viewport representation.
