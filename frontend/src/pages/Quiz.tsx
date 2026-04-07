import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Bookmark, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Question {
  id: number;
  difficulty: string;
  text: string;
  options: string;
  correct: number;
}

const Quiz = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>([]);
  const [bookmarked, setBookmarked] = useState<boolean[]>([]);
  const [timer, setTimer] = useState(600);

  // ✅ Fetch Questions
  useEffect(() => {
    if (!category) return;

    axios
      .get<Question[]>(`http://localhost:8080/api/questions/${category}`)
      .then((res) => {
        setQuestions(res.data);
        setSelected(Array(res.data.length).fill(null));
        setBookmarked(Array(res.data.length).fill(false));
        setCurrent(0);
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, [category]);

  // ✅ Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (questions.length === 0) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading questions...
      </div>
    );
  }

  const q = questions[current];

  const mins = Math.floor(timer / 60);
  const secs = timer % 60;

  const handleSelect = (i: number) => {
    const next = [...selected];
    next[current] = i;
    setSelected(next);
  };

  const toggleBookmark = () => {

  const next = [...bookmarked];
  next[current] = !next[current];
  setBookmarked(next);

  // ✅ SAVE TO LOCALSTORAGE
  const existing = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  const questionData = {
    question: q.text,
    category: category,
    difficulty: q.difficulty
  };

  const alreadyExists = existing.some(
    (item: any) => item.question === q.text
  );

  if (!alreadyExists) {
    const updated = [...existing, questionData];
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  }
};

  let parsedOptions: string[] = [];

  try {
    parsedOptions = JSON.parse(q.options);
  } catch {
    console.error("Invalid options JSON");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <span>Question {current + 1}/{questions.length}</span>

        <div className="flex items-center gap-4">
          <button onClick={toggleBookmark}>
            <Bookmark className={bookmarked[current] ? "fill-blue-500" : ""} />
          </button>

          <div>
            <Clock className="inline mr-1" />
            {String(mins).padStart(2, "0")}:
            {String(secs).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* QUESTION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="p-6 border rounded"
        >
          <p className="mb-4">{q.text}</p>

          {parsedOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`block w-full text-left p-3 mb-2 border rounded ${
                selected[current] === i
                  ? "bg-blue-100 border-blue-500"
                  : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION */}
      <div className="flex justify-between">

        <Button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
          <ChevronLeft /> Previous
        </Button>

        {current < questions.length - 1 ? (

          <Button onClick={() => setCurrent(current + 1)}>
            Next <ChevronRight />
          </Button>

        ) : (

          // ✅ FINAL SUBMIT
         // 🔥 FINAL SUBMIT BUTTON (UPDATED)

<Button
  onClick={async () => {

    // ✅ SCORE CALCULATION (NO NEGATIVE MARKING)
    let score = 0;

    questions.forEach((q, index) => {
      if (selected[index] === q.correct) {
        score++;
      }
    });

    const totalQuestions = questions.length;

    // ✅ GET USER
    const username = localStorage.getItem("username");

    if (!username) {
      alert("⚠️ Please login first");
      return;
    }

    // ✅ CATEGORY MAPPING
    let quizTitle = "";

if (category?.toLowerCase() === "aptitude") {
  quizTitle = "Quantitative Aptitude";
} else if (category?.toLowerCase() === "logical") {
  quizTitle = "Logical Reasoning";
} else if (category?.toLowerCase() === "verbal") {
  quizTitle = "Verbal Ability";
} else {
  quizTitle = "General";
}

    try {
      // ✅ API CALL
      await axios.post("http://localhost:8080/api/results", {
        userId: 1,
        username: username,
        quizTitle: quizTitle,
        totalQuestions: totalQuestions,
        score: score,
        weakTopic: "General",
        completed: true
      });

      // ✅ SUCCESS
      alert(`✅ Quiz Submitted!\nScore: ${score}/${totalQuestions}`);

      navigate("/performance");

    } catch (err) {
      console.error("Error saving result:", err);
      alert("❌ Failed to submit quiz");
    }

  }}
>
  <Flag /> Submit Quiz
</Button>
        )}

      </div>

    </div>
  );
};

export default Quiz;