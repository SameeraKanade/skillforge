package com.sameera.backend.dto;

import java.util.List;

public class RecommendationDTO {

    private String category;
    private String difficulty;
    private List<String> topics;

    public RecommendationDTO(String category, String difficulty, List<String> topics) {
        this.category = category;
        this.difficulty = difficulty;
        this.topics = topics;
    }

    public String getCategory() {
        return category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public List<String> getTopics() {
        return topics;
    }
}