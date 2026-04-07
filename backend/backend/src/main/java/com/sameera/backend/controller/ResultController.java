package com.sameera.backend.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sameera.backend.model.Result;
import com.sameera.backend.repository.ResultRepository;

@RestController
@RequestMapping("/api/results")
@CrossOrigin
public class ResultController {

    private final ResultRepository repo;

    public ResultController(ResultRepository repo) {
        this.repo = repo;
    }

    // ✅ SAVE RESULT
    @PostMapping
    public Result saveResult(@RequestBody Result result) {
        result.setSubmittedAt(LocalDateTime.now());
        return repo.save(result);
    }

    // ✅ USER RESULTS (Performance Page)
    @GetMapping("/user/{username}")
    public List<Result> getUserResults(@PathVariable String username) {
        return repo.findByUsername(username);
    }

    // 🔥 ADD THIS METHOD (IMPORTANT)
    @GetMapping("/user/{username}/dashboard")
    public Map<String, Object> getUserDashboard(@PathVariable String username) {

        List<Result> results = repo.findByUsername(username);

        int totalAttempts = results.size();

        int totalScore = results.stream()
                .mapToInt(Result::getScore)
                .sum();

        double avgScore = totalAttempts == 0
                ? 0
                : (double) totalScore / totalAttempts;

        double progress = avgScore * 10; // optional %

        Map<String, Object> data = new HashMap<>();
        data.put("attempts", totalAttempts);
        data.put("avgScore", avgScore);
        data.put("progress", progress);

        return data;
    }
}