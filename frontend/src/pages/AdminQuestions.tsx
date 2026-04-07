import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminQuestions = () => {

  const [questions, setQuestions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);

  const [category, setCategory] = useState("Quant");
  const [difficulty, setDifficulty] = useState("Easy");
  const [text, setText] = useState("");
  const [options, setOptions] = useState("");
  const [correct, setCorrect] = useState(0);

  const handleAddQuestion = async () => {

  try {

    const response = await axios.post(
      "http://localhost:8080/api/questions",
      {
        category,
        difficulty,
        text,
        options,
        correct
      }
    );

    // update UI
    setQuestions([...questions, response.data]);

    // reset form
    setText("");
    setOptions("");
    setCorrect(0);

    // close popup
    setShowForm(false);

  } catch (error) {

    console.error("Error saving question:", error);
    alert("Failed to save question");

  }

};

  // Fetch questions
  useEffect(() => {

    axios
      .get("http://localhost:8080/api/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error loading questions:", err));

  }, []);

  // Delete question
  const handleDelete = (id: number) => {

    axios
      .delete(`http://localhost:8080/api/questions/${id}`)
      .then(() => {

        setQuestions(questions.filter((q) => q.id !== id));

      })
      .catch((err) => console.error("Delete error:", err));

  };

 
  // Filtering
  const filtered = questions.filter((q) => {

    if (search && !q.text.toLowerCase().includes(search.toLowerCase())) return false;
    if (topicFilter !== "all" && q.category !== topicFilter) return false;
    if (diffFilter !== "all" && q.difficulty !== diffFilter) return false;

    return true;

  });

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h1 className="text-2xl font-bold text-foreground">
          Question Bank
        </h1>

        <Button className="gap-2" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" /> Add Question
        </Button>

      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">

        <div className="relative flex-1 min-w-[200px]">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />

        </div>

        <Select value={topicFilter} onValueChange={setTopicFilter}>

          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Topic" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">All Topics</SelectItem>
            <SelectItem value="Quant">Quant</SelectItem>
            <SelectItem value="Logical">Logical</SelectItem>
            <SelectItem value="Verbal">Verbal</SelectItem>

          </SelectContent>

        </Select>

        <Select value={diffFilter} onValueChange={setDiffFilter}>

          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>

          </SelectContent>

        </Select>

      </div>

      {/* Table */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-elevated overflow-hidden"
      >

        <Table>

          <TableHeader>

            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>

          </TableHeader>

          <TableBody>

            {filtered.map((q) => (

              <TableRow key={q.id}>

                <TableCell className="max-w-[400px] truncate text-sm">
                  {q.text}
                </TableCell>

                <TableCell>{q.category}</TableCell>

                <TableCell>

                  <span
                    className={
                      q.difficulty === "Easy"
                        ? "badge-easy"
                        : q.difficulty === "Medium"
                        ? "badge-medium"
                        : "badge-hard"
                    }
                  >
                    {q.difficulty}
                  </span>

                </TableCell>

                <TableCell className="text-right">

                  <div className="flex justify-end gap-1">

                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDelete(q.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                  </div>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </motion.div>

      {/* Add Question Popup */}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">

            <h2 className="text-lg font-semibold">Add Question</h2>

            <Input
              placeholder="Question text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Input
              placeholder='Options JSON ["A","B","C","D"]'
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />

            <Input
              type="number"
              placeholder="Correct option index (0-3)"
              value={correct}
              onChange={(e) => setCorrect(Number(e.target.value))}
            />

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Quant">Quant</SelectItem>
                <SelectItem value="Logical">Logical</SelectItem>
                <SelectItem value="Verbal">Verbal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex justify-end gap-2">

              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>

              <Button onClick={handleAddQuestion}>
                Save
              </Button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default AdminQuestions;