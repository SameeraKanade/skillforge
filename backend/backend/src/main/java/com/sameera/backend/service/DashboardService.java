package com.sameera.backend.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sameera.backend.dto.DashboardDTO;
import com.sameera.backend.repository.ResultRepository;

@Service
public class DashboardService {

    private final ResultRepository resultRepository;

    public DashboardService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public DashboardDTO getDashboardData(String email) {

        long quizzes = resultRepository.countByEmail(email);

        Double avg = resultRepository.averageScoreByEmail(email);
        double avgScore = avg != null ? avg : 0;

        int progress = (int) avgScore;

        return new DashboardDTO(quizzes, avgScore, progress);
    }

    public String getWeakTopic(String email) {

    List<Object[]> topics = resultRepository.findWeakTopics(email);

    if (topics.isEmpty()) {
        return "None";
    }

    return topics.get(0)[0].toString();
}
}