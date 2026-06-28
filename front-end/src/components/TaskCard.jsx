function TaskCard({
  task,
  priority,
  onComplete,
  onFail,
  onDelete,
  onEdit,
}) {
  return (
    <div className="task-card">
      <h3>{task.text}</h3>

      <span className={`priority ${priority}`}>
        {priority}
      </span>

      {task.status === "Pending" && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => onComplete(task._id)}
            style={{
              background: "#22C55E",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Complete
          </button>

          <button
            onClick={() => onFail(task._id)}
            style={{
              background: "#E11D48",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Fail
          </button>

          <button
            onClick={() => onDelete(task._id)}
            style={{
              background: "#64748B",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>

          <button
            onClick={() => onEdit(task)}
            style={{
              background: "#3B82F6",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;