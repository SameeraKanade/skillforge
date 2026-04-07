import { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/dashboard")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* TOP CARDS */}
      <div className="grid grid-cols-4 gap-4">

        <Card title="Students" value={data.students} color="blue" />
        <Card title="Quizzes" value={data.quizzes} color="green" />
        <Card title="Avg Score" value={`${Math.round(data.avgScore || 0)}%`} color="purple" />
        <Card title="Completed" value={data.completed} color="orange" />

      </div>

      {/* WEAK TOPICS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-3">Weak Topic Trends</h3>

        {data.weakTopics.length === 0 ? (
          <p>No data</p>
        ) : (
          data.weakTopics.map((item: any, index: number) => (
            <p key={index}>
              {item[0]} → {item[1]} attempts
            </p>
          ))
        )}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-3">Recent Activity</h3>

        {data.recent.map((r: any) => (
          <div key={r.id} className="border-b py-2">
            {r.username} scored {r.score} in {r.quizTitle}
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;

// 🔥 CARD COMPONENT
const Card = ({ title, value, color }: any) => {

  const colors: any = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500"
  };

  return (
    <div className={`${colors[color]} text-white p-4 rounded-xl shadow`}>
      <p>{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};