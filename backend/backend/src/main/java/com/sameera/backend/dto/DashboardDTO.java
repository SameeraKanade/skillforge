package com.sameera.backend.dto;

public class DashboardDTO {

    private long quizzes;
    private double avgScore;
    private int progress;

    public DashboardDTO(long quizzes, double avgScore, int progress) {
        this.quizzes = quizzes;
        this.avgScore = avgScore;
        this.progress = progress;
    }

    public long getQuizzes() {
        return quizzes;
    }

    public double getAvgScore() {
        return avgScore;
    }

    public int getProgress() {
        return progress;
    }
}