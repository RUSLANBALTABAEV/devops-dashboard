import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await axios.get("http://localhost:8000/metrics");
      const data = res.data.split("\n");
      setCpu(parseFloat(data.find((line) => line.includes("cpu_usage")).split(" ")[1]));
      setMemory(parseFloat(data.find((line) => line.includes("memory_usage")).split(" ")[1]));
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>DevOps Dashboard</h1>
      <p>CPU: {cpu}%</p>
      <p>Memory: {memory}%</p>
    </div>
  );
}

export default App;
