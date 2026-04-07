import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      });

      const data = await response.json();

      if (data.id) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Registration failed");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >

        <div className="mb-8 text-center">

          <Link to="/" className="inline-flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>

            <span className="text-2xl font-bold text-foreground">
              SkillForge
            </span>

          </Link>

        </div>

        <div className="card-elevated p-8">

          <h2 className="mb-1 text-2xl font-bold text-foreground">
            Create Account
          </h2>

          <p className="mb-6 text-sm text-muted-foreground">
            Start your learning journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>

              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>

              </div>

            </div>

            <div className="space-y-2">

              <Label>Role</Label>

              <RadioGroup value={role} onValueChange={setRole} className="flex gap-4">

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="student" id="r-student" />
                  <Label htmlFor="r-student" className="cursor-pointer font-normal">
                    Student
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="admin" id="r-admin" />
                  <Label htmlFor="r-admin" className="cursor-pointer font-normal">
                    Admin
                  </Label>
                </div>

              </RadioGroup>

            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>

          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default Register;