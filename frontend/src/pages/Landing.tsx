import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, BarChart3, BookOpen, Sparkles, ArrowRight, Zap, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const features = [
  { icon: Brain, title: "Adaptive Quizzes", desc: "AI adjusts difficulty in real-time based on your performance" },
  { icon: BarChart3, title: "Performance Analytics", desc: "Detailed insights into your strengths and weak areas" },
  { icon: BookOpen, title: "AI Study Plan", desc: "Personalized daily roadmap tailored to your goals" },
  { icon: Sparkles, title: "Smart Recommendations", desc: "AI-powered topic suggestions to maximize your score" },
];

const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "50K+", label: "Questions Solved" },
  { value: "95%", label: "Improvement Rate" },
  { value: "4.9★", label: "User Rating" },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SkillForge</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
                <Sparkles className="h-4 w-4" />
                AI-Powered Learning Platform
              </div>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground lg:text-5xl xl:text-6xl">
                AI-Driven Adaptive Learning for{" "}
                <span className="text-primary">Aptitude Tests</span>
              </h1>
              <p className="mb-8 max-w-lg text-lg text-muted-foreground">
                Master quantitative aptitude, logical reasoning, and verbal ability with our
                intelligent adaptive engine that learns how you learn.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/register">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Login to Dashboard</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img src={heroImage} alt="AI Learning Illustration" className="w-full rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/50 py-12">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground">Why SkillForge?</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our AI engine adapts to your unique learning style, ensuring maximum improvement in minimum time.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-elevated p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="gradient-hero rounded-2xl p-12 text-center text-primary-foreground">
            <Target className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-3 text-3xl font-bold">Ready to Ace Your Aptitude Tests?</h2>
            <p className="mx-auto mb-8 max-w-xl opacity-90">
              Join thousands of students who improved their scores with SkillForge's AI-powered learning.
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/register">
                Start Learning Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">SkillForge</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SkillForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
