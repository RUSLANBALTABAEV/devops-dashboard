from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import Gauge, generate_latest
import psutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cpu_usage = Gauge("cpu_usage", "CPU Usage Percentage")
memory_usage = Gauge("memory_usage", "Memory Usage Percentage")

@app.get("/")
def read_root():
    return {"message": "DevOps Dashboard API"}

@app.get("/metrics")
def get_metrics():
    cpu_usage.set(psutil.cpu_percent())
    memory_usage.set(psutil.virtual_memory().percent)
    return generate_latest()