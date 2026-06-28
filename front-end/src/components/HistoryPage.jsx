import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main style={{ flex: 1, overflowY: "auto" }}>
      <div
        style={{
          padding: "35px"
        }}
      >
        <h1>Task History</h1>

        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gap: "15px"
          }}
        >
          {history.length === 0 ? (
  <h3
    style={{
      color: "#94A3B8",
    }}
  >
    No task history available
  </h3>
) : (
  history.map((task) => (
    <HistoryCard
      key={task._id}
      task={task}
    />
  ))
)}
        </div>
      </div>
    </main>
  );
}

export default HistoryPage;