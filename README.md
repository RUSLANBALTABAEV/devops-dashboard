Project: DevOps Dashboard

Description: 
DevOps Dashboard is an educational project demonstrating a complete CI/CD cycle for containerized applications using Docker, Kubernetes, and GitHub Actions.

The goal of the project is to automate the build, delivery, and deployment of microservices (Backend and Frontend) by applying modern DevOps practices.


Project Architecture:

- Backend  
A Python / FastAPI service responsible for data processing and application logic.

- Frontend  
A React application responsible for displaying data to the user.

- CI/CD  
GitHub Actions automatically performs:
  - Docker image builds for backend and frontend.
  - Image publishing to DockerHub.
  - Automatic deployment to Kubernetes.

Containerization:

This project uses the following Docker images:

- ruslanbaltabaev/devops-dashboard-backend:v0.0.1
- ruslanbaltabaev/devops-dashboard-frontend:v0.0.1

Each service has its own Dockerfile and is configured to be published to DockerHub via GitHub Actions.

Kubernetes Deployment:

Once the Docker images are built and published, the application is deployed to a Kubernetes cluster using the following manifests:

- backend-deployment.yaml — deployment description for the Backend service.
- frontend-deployment.yaml — deployment description for the Frontend service.
- backend-service.yaml / frontend-service.yaml — services for internal and external cluster access.


DevOps Stack:

- Docker  
- Kubernetes (Minikube or Production Cluster)  
- GitHub Actions (CI/CD pipeline)  
- DockerHub (image registry)

How to Deploy:

1. Build Docker images:

docker build -t ruslanbaltabaev/devops-dashboard-backend:v0.0.1 ./backend
docker build -t ruslanbaltabaev/devops-dashboard-frontend:v0.0.1 ./frontend

2. Push images to DockerHub:

docker push ruslanbaltabaev/devops-dashboard-backend:v0.0.1
docker push ruslanbaltabaev/devops-dashboard-frontend:v0.0.1

3. Deploy to Kubernetes:

kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml


4. Verify the deployment:

kubectl get pods
kubectl get svc

Status:

- Backend and Frontend Docker images are ready.  
- GitHub Actions pipeline is configured.  
- Kubernetes manifests are ready.  
- Production deployment completed.
