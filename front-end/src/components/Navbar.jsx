function Navbar() {
  return (
    <header className="navbar">
      <div>
        <h2>Task Tracker</h2>
        <p>Manage your tasks efficiently</p>
      </div>

      <div className="profile">
<div className="profile">
  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.reload();
    }}
    style={{
      background: "#E11D48",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    Logout
  </button>
</div>      </div>
    </header>
  );
}

export default Navbar;