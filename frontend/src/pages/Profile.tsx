import { useEffect, useState } from "react";

interface Result {
  score: number;
}

const Profile = () => {

  const [quizzes, setQuizzes] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [xp, setXp] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("username");

    if (storedEmail) setEmail(storedEmail);
    if (storedName) setName(storedName);

    if (!username) return;

    fetch(`http://localhost:8080/api/results/user/${username}`)
      .then(res => res.json())
      .then(data => calculateStats(data));

  }, [username]);

  const calculateStats = (results: Result[]) => {
    const total = results.length;
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const avg = total === 0 ? 0 : Math.round(totalScore / total);

    setQuizzes(total);
    setAvgScore(avg);
    setXp(totalScore);
  };

  // ✅ UPDATE NAME
  const handleSave = () => {
    fetch("http://localhost:8080/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email
      })
    })
    .then(res => res.json())
    .then(() => {
      alert("Profile updated ✅");
      localStorage.setItem("username", name);
    })
    .catch(() => alert("Error updating profile"));
  };

  // ✅ CHANGE PASSWORD (optional backend)
  const handlePasswordChange = () => {
    if (!newPassword) {
      alert("Enter password");
      return;
    }

    fetch("http://localhost:8080/api/auth/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password: newPassword
      })
    })
    .then(() => {
      alert("Password updated 🔒");
      setNewPassword("");
    })
    .catch(() => alert("Error updating password"));
  };

  const level = Math.floor(xp / 500);
  const progress = xp % 500;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      {/* PROFILE HEADER */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-500">{email}</p>
          <p className="text-sm text-gray-400">Joined 2025</p>
        </div>
      </div>

      {/* STATS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Learning Stats</h3>

        <div className="grid grid-cols-3 gap-4">
          <Stat title="Quizzes Taken" value={quizzes} />
          <Stat title="Avg Score" value={`${avgScore}%`} />
          <Stat title="XP Earned" value={xp} />
        </div>
      </div>

      {/* XP PROGRESS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between mb-2">
          <span>Level {level}</span>
          <span>{progress} / 500 XP</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${(progress / 500) * 100}%` }}
          />
        </div>
      </div>

      {/* LEVEL BADGE */}
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <h3 className="font-semibold mb-2">Your Level</h3>

        <p className="text-xl font-bold text-blue-600">
          {avgScore >= 80 ? "🔥 Expert" :
           avgScore >= 50 ? "⚡ Intermediate" :
           "📘 Beginner"}
        </p>
      </div>

      {/* ✨ EDIT PROFILE */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <h3 className="font-semibold">Edit Profile</h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />

          <input
            className="border p-2 rounded bg-gray-100"
            value={email}
            disabled
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition"
        >
          Save Changes
        </button>
      </div>

      {/* 🔒 CHANGE PASSWORD */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <h3 className="font-semibold">Change Password</h3>

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 rounded w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handlePasswordChange}
          className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition"
        >
          Update Password
        </button>
      </div>

    </div>
  );
};

export default Profile;

const Stat = ({ title, value }: any) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);