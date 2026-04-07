package com.sameera.backend.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sameera.backend.dto.RecommendationDTO;

@Service
public class RecommendationService {

    public RecommendationDTO generateRecommendation(String category, double percentage) {

        String difficulty;

        if (percentage < 40) {
            difficulty = "Easy";
        } 
        else if (percentage <= 70) {
            difficulty = "Medium";
        } 
        else {
            difficulty = "Hard";
        }

        List<String> topics;

        if (category.equalsIgnoreCase("Quant")) {
            topics = Arrays.asList(
                "Percentages",
                "Profit & Loss",
                "Arithmetic"
            );
        } 
        else if (category.equalsIgnoreCase("Logical")) {
            topics = Arrays.asList(
                "Series",
                "Coding-Decoding",
                "Puzzles"
            );
        } 
        else {
            topics = Arrays.asList(
                "Reading Comprehension",
                "Vocabulary",
                "Grammar"
            );
        }

        return new RecommendationDTO(category, difficulty, topics);
    }
}