import { useState } from 'react'
import './App.css'

const context = new AudioContext();
const osc = context.createOscillator();
const amp = context.createGain();

osc.connect(amp);
amp.connect(context.destination);

osc.start();

const updateValues = (e) => {
  const freq = (e.clientX / window.innerWidth) * 1000;
  const gain = e.clientY / window.innerHeight;

  osc.frequency.value = freq;
  amp.gain.value = gain;
};


export default function App() {
  const [ isRunning, setIsRunning ] = useState(false)
  const toggleAudio = () => {
    if (context.state === 'suspended') {
      context.resume();
      setIsRunning(true)
    } else {
      context.suspend();
      setIsRunning(false)
    }
  };

  return <div
     style={{ width: '100vw', height: '100vh' }} 
     onMouseMove={updateValues} >
          <button onClick={toggleAudio}>{isRunning ? '🔊' : '🔇'}</button>
     </div>;
}