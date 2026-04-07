import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      // ✅ Handle HTTP errors (important)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // ✅ Backend returns TEXT ("student" / "admin")
      const result = await response.text();

      const username = email.split("@")[0].toLowerCase();

      if (result === "admin") {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        navigate("/admin");
      }
      else if (result === "student") {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        navigate("/dashboard");
      }
      else {
        alert("❌ Invalid email or password");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("⚠️ Unable to connect to server. Check backend/CORS.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-4">

      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your SkillForge account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;