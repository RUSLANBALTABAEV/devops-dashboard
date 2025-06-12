import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

const SystemMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  const fetchMetrics = async () => {
    const res = await axios.get('http://localhost:8000/system/metrics');
    setMetrics(res.data);
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // обновляем каждые 5 сек
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>System Metrics</Typography>

        <Box mb={2}>
          <Typography>CPU Usage: {metrics.cpu_percent}%</Typography>
          <LinearProgress variant="determinate" value={metrics.cpu_percent} />
        </Box>

        <Box mb={2}>
          <Typography>Memory Usage: {metrics.memory_percent}%</Typography>
          <LinearProgress variant="determinate" value={metrics.memory_percent} />
        </Box>

        <Typography variant="body2">
          Total Memory: {(metrics.memory_total / (1024 ** 3)).toFixed(2)} GB
        </Typography>
        <Typography variant="body2">
          Used Memory: {(metrics.memory_used / (1024 ** 3)).toFixed(2)} GB
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SystemMetrics;
