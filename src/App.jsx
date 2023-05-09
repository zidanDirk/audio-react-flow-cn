import React from 'react';
import ReactFlow, { Background, Panel } from 'reactflow';
import { shallow } from 'zustand/shallow';
import Osc from './nodes/Osc';
import Out from './nodes/Out';
import Amp from './nodes/Amp'
import 'reactflow/dist/style.css';
import { tw } from 'twind';

import { useStore } from './store';

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onEdgesDelete: store.onEdgesDelete,
  onNodesDelete: store.removeNodes,
  createNode: store.createNode,
});

const nodeTypes = {
  osc: Osc,
  out: Out,
  amp: Amp
};

export default function App() {
  const store = useStore(selector, shallow);

  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesDelete={store.onNodesDelete}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onEdgesDelete={store.onEdgesDelete}
      onConnect={store.addEdge}
      fitView
    >
      <Panel className={tw('space-x-4')}  position="top-right">
        <button className={tw('px-2 py-1 rounded bg-white shadow')}  onClick={() => store.createNode('osc')}>添加 osc</button>
        <button className={tw('px-2 py-1 rounded bg-white shadow')}  onClick={() => store.createNode('amp')}>添加 amp</button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}