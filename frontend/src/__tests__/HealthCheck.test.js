import axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useEffect, useState } from "react";

// простой тестовый компонент, который делает health-check
function HealthCheck() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get("/health").then(res => setStatus(res.data.status));
  }, []);

  return <div>{status ? `Status: ${status}` : "Loading..."}</div>;
}

// мокаем axios
jest.mock("axios");

test("fetches and displays health status", async () => {
  axios.get.mockResolvedValueOnce({ data: { status: "healthy" } });

  render(<HealthCheck />);

  // сначала отображается "Loading..."
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  // потом должно появиться "Status: healthy"
  await waitFor(() => {
    expect(screen.getByText(/Status: healthy/i)).toBeInTheDocument();
  });
});
