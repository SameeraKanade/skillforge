package com.sameera.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.sameera.backend.repository.ResultRepository;

@Service
public class AdminDashboardService {

    private final ResultRepository repo;

    public AdminDashboardService(ResultRepository repo) {
        this.repo = repo;
    }

    public Map<String, Object> getDashboardData() {

        Map<String, Object> data = new HashMap<>();

        data.put("students", repo.countStudents());
        data.put("quizzes", repo.countQuizzes());
        data.put("avgScore", repo.avgScore());
        data.put("completed", repo.completedCount());
        data.put("weakTopics", repo.weakTopics());
        data.put("recent", repo.findTop5ByOrderBySubmittedAtDesc());

        return data;
    }
}