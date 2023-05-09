import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from 'reactflow';

// 👇 不要忘记导入样式文件
import 'reactflow/dist/style.css';
import './index.css';

const root = document.querySelector('#root');

// React flow 需要在一个已知高度和宽度的元素内才能工作
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </div>
  </React.StrictMode>
);