import {
  LayoutDashboard,
  History,
  Settings
} from "lucide-react";

function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <aside className="sidebar">
      <h1 className="logo">Task Tracker</h1>

      <nav>
        <button
          className={
            currentPage === "dashboard"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() =>
            setCurrentPage("dashboard")
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          className={
            currentPage === "history"
              ? "nav-btn active"
              : "nav-btn"
          }
          onClick={() =>
            setCurrentPage("history")
          }
        >
          <History size={20} />
          History
        </button>

        <button
  className={
    currentPage === "settings"
      ? "nav-btn active"
      : "nav-btn"
  }
  onClick={() =>
    setCurrentPage("settings")
  }
>
  <Settings size={20} />
  Settings
</button>
      </nav>
    </aside>
  );
}

export default Sidebar;