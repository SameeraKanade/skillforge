package com.sameera.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sameera.backend.model.Question;
import com.sameera.backend.repository.QuestionRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class QuestionController {

    private final QuestionRepository repository;

    public QuestionController(QuestionRepository repository) {
        this.repository = repository;
    }

    // 🔹 Get all questions
    @GetMapping("/questions")
    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    // 🔹 Get questions by category
    @GetMapping("/questions/{category}")
    public List<Question> getByCategory(@PathVariable String category) {
        return repository.findByCategory(category);
    }

    // 🔹 Get questions by category AND difficulty
    @GetMapping("/questions/{category}/{difficulty}")
    public List<Question> getByCategoryAndDifficulty(
            @PathVariable String category,
            @PathVariable String difficulty) {

        return repository.findByCategoryAndDifficulty(category, difficulty);
    }

    // ⭐ Admin: Add new question
    @PostMapping("/questions")
    public Question addQuestion(@RequestBody Question question) {
        return repository.save(question);
    }

    // ⭐ Admin: Delete question
    @DeleteMapping("/questions/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        repository.deleteById(id);
    }
}