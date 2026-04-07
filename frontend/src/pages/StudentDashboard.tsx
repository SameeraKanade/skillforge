import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

interface Result {
  id: number;
  username: string;
  quizTitle: string;
  score: number;
  submittedAt: string;
}

const Dashboard = () => {

  const [chartData, setChartData] = useState<any[]>([]);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [lastTest, setLastTest] = useState<any>(null);

  const username = localStorage.getItem("username");

  // 🔥 FETCH USER DATA
  useEffect(() => {
    if (!username) return;

    fetch(`http://localhost:8080/api/results/user/${username}`)
      .then(res => res.json())
      .then(data => {
        processChart(data);
        calculateStats(data);
      })
      .catch(err => console.error(err));

  }, [username]);

  // 🔥 CATEGORY FIX
  const normalizeCategory = (cat: string) => {
    if (cat === "Aptitude") return "Quantitative Aptitude";
    if (cat === "Verbal") return "Verbal Ability"; // ✅ FIXED
    return cat;
  };

  // 🔥 CHART
  const processChart = (results: Result[]) => {

    const map: any = {};

    results.forEach(r => {
      const key = normalizeCategory(r.quizTitle);

      if (!map[key]) map[key] = 0;
      map[key] += r.score;
    });

    const formatted = Object.keys(map).map(key => ({
      name: key,
      score: map[key]
    }));

    setChartData(formatted);
  };

  // 🔥 STATS
  const calculateStats = (results: Result[]) => {

    const total = results.length;

    const totalScore = results.reduce((sum, r) => sum + r.score, 0);

    const avg = total === 0 ? 0 : Math.round(totalScore / total);

    setTotalQuizzes(total);
    setAvgScore(avg);
    setXp(totalScore);

    // 🔥 LAST TEST
    const latest = results.reduce((prev, current) =>
      new Date(prev.submittedAt) > new Date(current.submittedAt)
        ? prev
        : current
    );

    setLastTest(latest);
  };

  const progress = avgScore;

  const weakArea =
    chartData.length > 0
      ? chartData.reduce((min, curr) =>
          curr.score < min.score ? curr : min
        ).name
      : "";

  const strongArea =
    chartData.length > 0
      ? chartData.reduce((max, curr) =>
          curr.score > max.score ? curr : max
        ).name
      : "";

  const getLevel = () => {
    if (avgScore >= 80) return "🔥 Expert";
    if (avgScore >= 50) return "⚡ Intermediate";
    return "📘 Beginner";
  };

  const getMessage = () => {
    if (avgScore >= 70) return "Great performance 🚀";
    if (avgScore >= 40) return "Keep improving 👍";
    return "Practice more 📚";
  };

  const streak = totalQuizzes >= 3 ? "🔥 Active" : "Start Practicing";

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back 👋</h1>
          <p className="text-gray-500">Track your learning progress</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        <StatCard title="Quizzes" value={totalQuizzes} color="blue" />
        <StatCard title="Avg Score" value={`${avgScore}%`} color="green" />
        <StatCard title="XP Points" value={xp} color="purple" />
        <StatCard title="Progress" value={`${progress}%`} color="orange" />
        <StatCard title="Streak" value={streak} color="orange" />
      </div>

      {/* LAST TEST */}
      {lastTest && (
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Last Test</p>
          <p className="font-semibold">
            {normalizeCategory(lastTest.quizTitle)} - {lastTest.score}
          </p>
        </div>
      )}

      {/* MAIN */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* PROGRESS */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">

          <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>

          <div className="relative w-32 h-32">

            <svg className="w-full h-full transform -rotate-90">
              <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="10" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#3b82f6"
                strokeWidth="10"
                fill="none"
                strokeDasharray={314}
                strokeDashoffset={314 - (314 * progress) / 100}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">
              {progress}%
            </div>
          </div>

          <p className="mt-3 text-blue-600 font-semibold">{getLevel()}</p>
          <p className="text-gray-500 text-sm">{getMessage()}</p>

        </div>

        {/* CHART */}
        <div className="bg-white rounded-2xl shadow-lg p-6 col-span-2">

          <h3 className="text-lg font-semibold mb-4">
            Category-wise Performance
          </h3>

          {chartData.length === 0 ? (
            <p className="text-red-500 text-center">No attempts yet 🚫</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="score" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.name.includes("Quantitative")
                          ? "#3b82f6"
                          : entry.name.includes("Logical")
                          ? "#22c55e"
                          : "#a855f7"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartData.length > 0 && (
            <>
              <p className="text-red-500 text-center mt-2">
                Weak Area: {weakArea}
              </p>
              <p className="text-green-600 text-center">
                Strong Area: {strongArea}
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

// 🔥 CARD
const StatCard = ({ title, value, color }: any) => {
  const styles: any = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className={`p-5 rounded-xl shadow-md ${styles[color]}`}>
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};