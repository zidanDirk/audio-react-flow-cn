import React from 'react';
import { Handle } from 'reactflow';
import { tw } from 'twind';
import { shallow } from 'zustand/shallow';

import { useStore } from '../store';

// 添加 selector
const selector = (id) => (store) => ({
    setFrequency: (e) => store.updateNode(id, { frequency: +e.target.value }),
    setType: (e) => store.updateNode(id, { type: e.target.value }),
});

export default function Osc({ id, data }) {
    // 使用 useStore
    const { setFrequency, setType } = useStore(selector(id), shallow);

    return (
        <div className={tw('rounded-md bg-white shadow-xl')}>
            <p className={tw('rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm')}>振荡器节点</p>

            <label className={tw('flex flex-col px-2 py-1')}>
            <span className={tw('text-xs font-bold mb-2')}>频率</span>
            <input
                className="nodrag"
                type="range"
                min="10"
                max="1000"
                value={data.frequency}
                // 添加 onChange 事件
                onChange={setFrequency}
            />
            <span  className={tw('text-right text-xs')}>{data.frequency}赫兹</span>
            </label>
            <hr className={tw('border-gray-200 mx-2')} />
            <label className={tw('flex flex-col px-2 pt-1 pb-4')}>
            <p className={tw('text-xs font-bold mb-2')}>波形</p>
            
            <select 
                className="nodrag" 
                value={data.type}  
                // 添加 onChange 事件
                onChange={setType}>
                <option value="sine">正弦波</option>
                <option value="triangle">三角波</option>
                <option value="sawtooth">锯齿波</option>
                <option value="square">方波</option>
            </select>
            </label>
        <Handle className={tw('w-2 h-2')} type="source" position="bottom" />
        </div>
    );
};