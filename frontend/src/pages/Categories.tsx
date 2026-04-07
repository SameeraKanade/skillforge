import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Brain, MessageSquare, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const categories = [
  {
    key: "Quant",
    icon: Calculator,
    title: "Quantitative Aptitude",
    desc: "Numbers, algebra, geometry, arithmetic — build your calculation mastery.",
    difficulty: "Medium",
    accuracy: 72,
    topics: 18,
  },
  {
    key: "Logical",
    icon: Brain,
    title: "Logical Reasoning",
    desc: "Patterns, sequences, puzzles, deductions — sharpen your analytical thinking.",
    difficulty: "Hard",
    accuracy: 65,
    topics: 14,
  },
  {
    key: "Verbal",
    icon: MessageSquare,
    title: "Verbal Ability",
    desc: "Grammar, comprehension, vocabulary — master language skills.",
    difficulty: "Easy",
    accuracy: 80,
    topics: 12,
  },
];
const diffBadge = (d: string) =>
  d === "Easy" ? "badge-easy" : d === "Medium" ? "badge-medium" : "badge-hard";

const Categories = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Choose Category</h1>
      <p className="text-sm text-muted-foreground">Select a category to start an adaptive quiz</p>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {categories.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card-elevated p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <c.icon className="h-6 w-6 text-primary" />
            </div>
            <span className={diffBadge(c.difficulty)}>{c.difficulty}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">{c.desc}</p>
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-semibold text-foreground">{c.accuracy}%</span>
            </div>
            <Progress value={c.accuracy} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mb-4">{c.topics} topics available</p>
          <div className="flex gap-2">
            <Button className="flex-1 gap-1" size="sm" asChild>
  <Link to={`/quiz/${c.key}`}>
    <ArrowRight className="h-3 w-3" /> Start Quiz
  </Link>
</Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/study-material"><BookOpen className="h-3 w-3" /></Link>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Categories;
