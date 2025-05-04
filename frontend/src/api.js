const api = axios.create({
  baseURL: "http://localhost:8000", // Для локального запуска без Docker.
  // Или для Docker:
  // baseURL: "http://backend:8000",  // Имя сервиса из docker-compose.yml.
});