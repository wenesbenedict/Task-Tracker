import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import StatsCard from "./StatsCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setTasks(data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

  const addTask = async () => {
  console.log("ADD BUTTON CLICKED");

  if (!newTask.trim()) return;

  try {
    const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:5000/tasks",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
          body: JSON.stringify({
            text: newTask,
          }),
        }
      );

      const createdTask = await response.json();

      setTasks([...tasks, createdTask]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const markCompleted = async (id) => {
    const task = tasks.find((t) => t._id === id);

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: task.text,
        status: "Completed",
      }),
    });

    setTasks(
      tasks.map((task) =>
        task._id === id
          ? { ...task, status: "Completed" }
          : task
      )
    );
  };

  const markFailed = async (id) => {
    const task = tasks.find((t) => t._id === id);

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: task.text,
        status: "Failed",
      }),
    });

    setTasks(
      tasks.map((task) =>
        task._id === id
          ? { ...task, status: "Failed" }
          : task
      )
    );
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(
      tasks.filter((task) => task._id !== id)
    );
  };

  const editTask = async (task) => {
    const updatedText = prompt(
      "Edit task:",
      task.text
    );

    if (
      !updatedText ||
      updatedText.trim() === ""
    )
      return;

    await fetch(
      `http://localhost:5000/tasks/${task._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: updatedText,
          status: task.status,
        }),
      }
    );

    setTasks(
      tasks.map((t) =>
        t._id === task._id
          ? { ...t, text: updatedText }
          : t
      )
    );
  };

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const failedTasks = tasks.filter(
    (task) => task.status === "Failed"
  );

  return (
    <main style={{ flex: 1, overflowY: "auto" }}>
      <section
        style={{
          padding: "25px 35px",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={addTask}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            background: "#E11D48",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Add Task
        </button>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          padding: "25px 35px",
        }}
      >
        <StatsCard
          title="Total Tasks"
          value={tasks.length}
        />

        <StatsCard
          title="Pending"
          value={pendingTasks.length}
        />

        <StatsCard
          title="Completed"
          value={completedTasks.length}
        />
      </section>

      <section className="dashboard">
        <div className="column">
          <h2>📝 Pending</h2>

          {pendingTasks.length === 0 ? (
  <p style={{ color: "#94A3B8" }}>
    No pending tasks
  </p>
) : (
  pendingTasks.map((task) => (
    <TaskCard
      key={task._id}
      task={task}
      priority="medium"
      onComplete={markCompleted}
      onFail={markFailed}
      onDelete={deleteTask}
      onEdit={editTask}
    />
  ))
)}
        </div>

        <div className="column">
          <h2>❌ Failed</h2>

         {failedTasks.length === 0 ? (
  <p style={{ color: "#94A3B8" }}>
    No failed tasks
  </p>
) : (
  failedTasks.map((task) => (
    <TaskCard
      key={task._id}
      task={task}
      priority="high"
    />
  ))
)}
        </div>

        <div className="column">
          <h2>✅ Completed</h2>

          {completedTasks.length === 0 ? (
  <p style={{ color: "#94A3B8" }}>
    No completed tasks
  </p>
) : (
  completedTasks.map((task) => (
    <TaskCard
      key={task._id}
      task={task}
      priority="low"
    />
  ))
)}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;