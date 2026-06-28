import { useEffect, useState } from "react";

function SettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!user)
    return <h2>Loading...</h2>;

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
      }}
    >
      <h1>⚙️ Settings</h1>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <h2>Profile</h2>

        <p>
          Username: {user.username}
        </p>

        <p>
          Email: {user.email}
        </p>
      </div>

     <div
  style={{
    marginTop: "30px",
  }}
>
  <h2>Account</h2>

  <button
    onClick={logout}
    style={{
      background: "#E11D48",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Logout
  </button>

  <p
    style={{
      color: "#94A3B8",
      marginTop: "20px",
    }}
  >
    Task Tracker v1.0
  </p>
</div>

      
    </div>
  );
}

export default SettingsPage;