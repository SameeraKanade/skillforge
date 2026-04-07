import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

interface Result {
  id: number;
  username: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  submittedAt: string;
}

const categories = [
  "Quantitative Aptitude",
  "Logical Reasoning",
  "Verbal Ability",
];

const Performance = () => {

  const [chartData, setChartData] = useState<any[]>([]);
  const [avgScore, setAvgScore] = useState(0);
  const [lastTest, setLastTest] = useState<Result | null>(null);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) return;

    fetch(`http://localhost:8080/api/results/user/${username}`)
      .then(res => res.json())
      .then(data => {
        console.log("RESULTS:", data); // 🔥 DEBUG
        processData(data);
      });
  }, [username]);

  // ✅ Normalize category safely
  const normalizeCategory = (cat: string) => {
    if (!cat) return "General";

    const c = cat.trim().toLowerCase();

    if (c.includes("aptitude")) return "Quantitative Aptitude";
    if (c.includes("logical")) return "Logical Reasoning";
    if (c.includes("verbal")) return "Verbal Ability";

    return "General";
  };

  const processData = (results: Result[]) => {
    if (!results || results.length === 0) return;

    const map: any = {
      "Quantitative Aptitude": { total: 0, count: 0 },
      "Logical Reasoning": { total: 0, count: 0 },
      "Verbal Ability": { total: 0, count: 0 },
    };

    let totalScore = 0;

    results.forEach(r => {
      const category = normalizeCategory(r.quizTitle);

      if (map[category]) {
        map[category].total += r.score;
        map[category].count++;
        totalScore += r.score;
      }
    });

    const formatted = categories.map(cat => ({
      name: cat,
      score: map[cat].count === 0
        ? 0
        : Math.round(map[cat].total / map[cat].count)
    }));

    setChartData(formatted);
    setAvgScore(Math.round(totalScore / results.length));
    setTotalAttempts(results.length);

    // ✅ FIXED: latest test selection
    const latest = results.reduce((prev, current) => {
      return new Date(prev.submittedAt) > new Date(current.submittedAt)
        ? prev
        : current;
    });

    setLastTest(latest);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h2 className="text-2xl font-bold text-center mb-8">
        📊 Your Performance Analysis
      </h2>

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
          <h3>Average Score</h3>
          <p className="text-3xl font-bold">{avgScore}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          <h3>Last Test</h3>
          {lastTest ? (
            <p>
              {normalizeCategory(lastTest.quizTitle)} <br />
              <span className="text-lg font-bold">
                {lastTest.score}/
                {
                  lastTest.totalQuestions && lastTest.totalQuestions > 0
                    ? lastTest.totalQuestions
                    : lastTest.score // 🔥 fallback fix
                }
              </span>
            </p>
          ) : <p>No test</p>}
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl shadow">
          <h3>Total Attempts</h3>
          <p className="text-3xl font-bold">{totalAttempts}</p>
        </div>

      </div>

      {/* 🔥 CHART */}
      <div className="bg-white p-6 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="score">
              {chartData.map((entry, index) => (
                <Cell key={index}
                  fill={
                    entry.name === "Quantitative Aptitude" ? "#3b82f6" :
                    entry.name === "Logical Reasoning" ? "#22c55e" :
                    "#a855f7"
                  }
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Performance;