import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Typography, Card, CardContent, Grid, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper 
} from '@mui/material';

function App() {
  const pods = [
    { name: 'frontend-pod-1', status: 'Running' },
    { name: 'backend-pod-1', status: 'CrashLoopBackOff' },
  ];

  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://localhost:8000/metrics");
        const data = res.data.split("\n");
        const cpuLine = data.find(line => line.includes("cpu_usage"));
        const memoryLine = data.find(line => line.includes("memory_usage"));

        if (cpuLine) {
          setCpu(parseFloat(cpuLine.split(" ")[1]));
        }
        if (memoryLine) {
          setMemory(parseFloat(memoryLine.split(" ")[1]));
        }
      } catch (err) {
        console.error("Ошибка при получении метрик:", err);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Панель управления DevOps
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">GitHub Actions</Typography>
              <Typography>Последний билд: Успешно</Typography>
              <Button variant="contained" sx={{ mt: 2 }}>Перейти</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Kubernetes Pods</Typography>
              <Typography>Всего: {pods.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Системные метрики</Typography>
              <Typography>CPU: {cpu}%</Typography>
              <Typography>Память: {memory}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 4 }}>Pods</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pod Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pods.map((pod, index) => (
              <TableRow key={index}>
                <TableCell>{pod.name}</TableCell>
                <TableCell>{pod.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
