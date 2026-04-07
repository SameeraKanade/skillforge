import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Results = () => {
  const location = useLocation();

  const { score, total, percentage } = location.state || {
    score: 0,
    total: 0,
    percentage: 0,
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Quiz Completed!
        </h1>
        <p className="text-muted-foreground">
          Here is your performance summary
        </p>
      </motion.div>

      {/* 🔥 Dynamic Score Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="stat-card text-center">
          <p className="text-3xl font-bold text-foreground">
            {score}/{total}
          </p>
          <p className="text-sm text-muted-foreground">Score</p>
        </div>

        <div className="stat-card text-center">
          <p className="text-3xl font-bold text-foreground">
            {percentage}%
          </p>
          <p className="text-sm text-muted-foreground">Accuracy</p>
        </div>

        <div className="stat-card text-center">
          <p className="text-3xl font-bold text-foreground">
            {percentage >= 70 ? "Good" : "Needs Improvement"}
          </p>
          <p className="text-sm text-muted-foreground">Performance</p>
        </div>
      </div>

      {/* 🔥 Simple Feedback */}
      <div className="card-elevated p-6 text-center">
        {percentage >= 80 && (
          <p className="text-success font-semibold">
            Excellent work! You have strong conceptual clarity.
          </p>
        )}

        {percentage >= 50 && percentage < 80 && (
          <p className="text-primary font-semibold">
            Good attempt! Focus on weaker topics to improve.
          </p>
        )}

        {percentage < 50 && (
          <p className="text-destructive font-semibold">
            Keep practicing. Review fundamentals and try again.
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" asChild>
          <Link to="/categories">Take Another Quiz</Link>
        </Button>

        <Button className="gap-2" asChild>
          <Link to="/recommendations">
            <ArrowRight className="h-4 w-4" />
            View AI Recommendations
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Results;