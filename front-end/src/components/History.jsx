import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) =>
        console.error("History fetch error:", err)
      );
  }, []);

  const completedTasks = history.filter(
    (task) => task.status === "Completed"
  );

  const failedTasks = history.filter(
    (task) => task.status === "Failed"
  );

  return (
    <main style={{ flex: 1, overflowY: "auto" }}>
      <section className="dashboard">

        <div className="column">
          <h2>✅ Completed Tasks</h2>

          {completedTasks.map((task) => (
            <HistoryCard
              key={task._id}
              task={task}
            />
          ))}
        </div>

        <div className="column">
          <h2>❌ Failed Tasks</h2>

          {failedTasks.map((task) => (
            <HistoryCard
              key={task._id}
              task={task}
            />
          ))}
        </div>

      </section>
    </main>
  );
}

export default History;