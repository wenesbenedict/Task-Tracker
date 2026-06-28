import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import HistoryPage from "./components/HistoryPage";
import Login from "./components/Login";
import SettingsPage from "./components/Settings";

function App() {
  const [currentPage, setCurrentPage] =
    useState("dashboard");

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem("token")
    );

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() =>
          setIsLoggedIn(true)
        }
      />
    );
  }

  return (
    <>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div style={{ flex: 1 }}>
        <Navbar />

        {currentPage === "dashboard" && (
  <Dashboard />
)}

{currentPage === "history" && (
  <HistoryPage />
)}

{currentPage === "settings" && (
  <SettingsPage />
)}
      </div>
    </>
  );
}

export default App;