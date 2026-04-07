package com.sameera.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String difficulty;
    private String text;

    @Column(columnDefinition = "json")
    private String options;

    private int correct;

    public Question() {}

    public Question(String category, String difficulty, String text, String options, int correct) {
        this.category = category;
        this.difficulty = difficulty;
        this.text = text;
        this.options = options;
        this.correct = correct;
    }

    // ✅ VERY IMPORTANT: Getters

    public Long getId() { return id; }

    public String getCategory() { return category; }

    public String getDifficulty() { return difficulty; }

    public String getText() { return text; }

    public String getOptions() { return options; }

    public int getCorrect() { return correct; }

    // setters optional but good to have
}