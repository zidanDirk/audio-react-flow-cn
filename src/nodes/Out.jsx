import React from 'react';
import { Handle } from 'reactflow';
import { tw } from 'twind';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function Out({ id, data }) {
  const { isRunning, toggleAudio } = useStore(selector, shallow);
  return (
    <div className={tw('rounded-md bg-white shadow-xl px-4 py-2')}>
      <Handle className={tw('w-2 h-2')} type="target" position="top" />

      <div>
        <p>输出节点</p>

        <button onClick={toggleAudio}>
          {isRunning ? (
            <span role="img" aria-label="mute">
              🔈
            </span>
          ) : (
            <span role="img" aria-label="unmute">
              🔇
            </span>
          )}
        </button>
      </div>
    </div>
  );
}