package com.sameera.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sameera.backend.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    
    List<Question> findByCategory(String category);
    List<Question> findByCategoryAndDifficulty(String category, String difficulty);
}