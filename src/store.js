import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { updateAudioNode, removeAudioNode, connect, disconnect, isRunning, toggleAudio, createAudioNode } from './audio';

export const useStore = create((set, get) => ({
    nodes: [
        {
            id: 'a',
            type: 'osc',
            data: { frequency: 220, type: 'square' },
            position: { x: 200, y: 0 }
        },
        { 
            id: 'b', 
            type: 'amp', 
            data: { gain: 0.5 },
            position: { x: 150, y: 250 } 
        },
        { 
            id: 'c',
            type: 'out',
            position: { x: 350, y: 400 } 
        }
    ],
    edges: [],
    isRunning: isRunning(),

    toggleAudio() {
        toggleAudio().then(() => {
          set({ isRunning: isRunning() });
        });
    },

    onNodesChange(changes) {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange(changes) {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    addEdge(data) {
        const id = nanoid(6);
        const edge = { id, ...data };
        
        connect(edge.source, edge.target);
        set({ edges: [edge, ...get().edges] });
    },

    onEdgesDelete(deleted) {
        for (const item of deleted) {
            const { source, target} = item
            disconnect(source, target);
        }

    },

    updateNode(id, data) {
        updateAudioNode(id, data);
        set({
          nodes: get().nodes.map(node =>
            node.id === id
              ? { ...node, data: Object.assign(node.data, data) }
              : node
          )
        });
    },
    removeNodes(nodes) {
        for (const { id } of nodes) {
          removeAudioNode(id)
        }
    },

    createNode(type) {
        const id = nanoid();
        switch(type) {
            case 'osc': {
              const data = { frequency: 440, type: 'sine' };
              const position = { x: 0, y: 0 };
      
              createAudioNode(id, type, data);
              set({ nodes: [...get().nodes, { id, type, data, position }] });
      
              break;
            }
      
            case 'amp': {
              const data = { gain: 0.5 };
              const position = { x: 0, y: 0 };
      
              createAudioNode(id, type, data);
              set({ nodes: [...get().nodes, { id, type, data, position }] });
      
              break;
            }
        }
    }
    
}));