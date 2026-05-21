import { useEffect, useState } from "react";
import "./App.css";

function App() {

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on page refresh
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }

  }, []);

  // Login Function
  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.detail);

        return;
      }

      // Store JWT Token
      localStorage.setItem(
        "token",
        data.access_token
      );

      // Update Auth State
      setIsLoggedIn(true);

      alert("Login successful");

      console.log(data);

      // Reset Form
      setFormData({
        email: "",
        password: ""
      });

    } catch (error) {

      console.log(error);

      alert("Something went wrong");
    }
  }

  // Protected API Request
  async function getProfile() {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/protected",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log(data);

      alert(JSON.stringify(data, null, 2));

    } catch (error) {

      console.log(error);

      alert("Failed to fetch profile");
    }
  }

  // Logout Function
  function logout() {

    localStorage.removeItem("token");

    setIsLoggedIn(false);

    alert("Logged out successfully");
  }

  return (

    <div className="container">

      <form
        className="form-box"
        onSubmit={handleSubmit}
      >

        <h1>
          {isLoggedIn ? "Dashboard" : "Login"}
        </h1>

        {/* LOGIN FORM */}
        {!isLoggedIn && (
          <>

            {/* Email */}
            <div className="input-group">

              <input
                required
                className="input-field"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                }
              />

            </div>

            {/* Password */}
            <div className="input-group">

              <input
                required
                className="input-field"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value
                  })
                }
              />

            </div>

            {/* Login Button */}
            <button
              className="btn"
              type="submit"
            >
              Login
            </button>

          </>
        )}

        {/* DASHBOARD BUTTONS */}
        {isLoggedIn && (
          <>

            {/* Get Profile */}
            <button
              className="btn"
              type="button"
              onClick={getProfile}
            >
              Get Profile
            </button>

            {/* Logout */}
            <button
              className="btn"
              type="button"
              onClick={logout}
            >
              Logout
            </button>

          </>
        )}

      </form>

    </div>
  );
}

export default App;