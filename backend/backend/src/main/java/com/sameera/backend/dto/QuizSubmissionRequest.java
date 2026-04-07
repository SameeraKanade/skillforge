package com.sameera.backend.dto;

import java.util.Map;

public class QuizSubmissionRequest {

    private Map<Integer, Integer> answers;

    public Map<Integer, Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Integer, Integer> answers) {
        this.answers = answers;
    }
}