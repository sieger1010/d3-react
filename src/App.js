import React from 'react';
import './App.css';
import BarChart from './BarChart.js';

function App() {
  return (
    <div className="App">
      <section><h1>D3 Graphs in a React App</h1></section>
      <section><BarChart size={[500, 500]}/></section>
    </div>
  );
}

export default App;
