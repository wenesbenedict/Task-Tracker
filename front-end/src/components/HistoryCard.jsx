function HistoryCard({ task }) {
  return (
    <div className="task-card">
      <h3>{task.text}</h3>

      <span
        className={`priority ${
          task.status === "Completed"
            ? "low"
            : "high"
        }`}
      >
        {task.status}
      </span>
    </div>
  );
}

export default HistoryCard;