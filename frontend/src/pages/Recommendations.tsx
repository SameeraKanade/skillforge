import { useEffect, useState } from "react";

interface Result {
  quizTitle: string;
  score: number;
}

const Recommendations = () => {

  const [difficulty, setDifficulty] = useState("");
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) return;

    fetch(`http://localhost:8080/api/results/user/${username}`)
      .then(res => res.json())
      .then(data => analyze(data));
  }, [username]);

  const normalizeCategory = (cat: string) => {
    if (cat === "Aptitude") return "Quantitative Aptitude";
    if (cat === "Verbal") return "Verbal Ability";
    return cat;
  };

  const analyze = (results: Result[]) => {

    if (!results || results.length === 0) return;

    let total = results.length;
    let totalScore = results.reduce((sum, r) => sum + r.score, 0);
    let avg = totalScore / total;

    // 🔥 Difficulty logic
    if (avg >= 70) setDifficulty("Hard");
    else if (avg >= 40) setDifficulty("Medium");
    else setDifficulty("Easy");

    // 🔥 Weak topics
    const map: any = {};

    results.forEach(r => {
      const key = normalizeCategory(r.quizTitle);

      if (!map[key]) map[key] = { total: 0, count: 0 };

      map[key].total += r.score;
      map[key].count++;
    });

    const weak = Object.keys(map)
      .map(k => ({
        name: k,
        avg: map[k].total / map[k].count
      }))
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 2)
      .map(k => k.name);

    setWeakTopics(weak);

    // 🔥 Message
    if (avg >= 70) setMessage("You are doing great! Try harder challenges 🚀");
    else if (avg >= 40) setMessage("Keep practicing to improve consistency 👍");
    else setMessage("Focus on basics and practice daily 📚");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      <h2 className="text-2xl font-bold text-center">
        🤖 AI Recommendations
      </h2>

      {/* DIFFICULTY */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-2">
          Recommended Difficulty Level
        </h3>
        <p className="text-gray-500 mb-2">
          Based on your performance:
        </p>

        <span className={`px-4 py-1 rounded-full text-white font-semibold ${
          difficulty === "Hard" ? "bg-red-500" :
          difficulty === "Medium" ? "bg-yellow-500" :
          "bg-green-500"
        }`}>
          {difficulty}
        </span>
      </div>

      {/* WEAK TOPICS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-3">
          Topics to Focus On
        </h3>

        {weakTopics.length === 0 ? (
          <p className="text-gray-500">No data yet</p>
        ) : (
          <ul className="list-disc ml-5 text-red-500">
            {weakTopics.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
      </div>

      {/* STUDY PLAN */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-3">
          Study Plan Adjustment
        </h3>

        <p className="text-gray-600">
          {message}
        </p>
      </div>

    </div>
  );
};

export default Recommendations;