package com.sameera.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sameera.backend.model.Result;

public interface ResultRepository extends JpaRepository<Result, Long> {

    // ✅ BASIC
    List<Result> findByUsername(String username);

    // 🔹 ADMIN DASHBOARD
    @Query("SELECT COUNT(DISTINCT r.username) FROM Result r")
    Long countStudents();

    @Query("SELECT COUNT(r) FROM Result r")
    Long countQuizzes();

    @Query("SELECT AVG(r.score) FROM Result r")
    Double avgScore();

    @Query("SELECT COUNT(r) FROM Result r WHERE r.completed = true")
    Long completedCount();

    @Query("SELECT r.weakTopic, COUNT(r) FROM Result r GROUP BY r.weakTopic")
    List<Object[]> weakTopics();

    List<Result> findTop5ByOrderBySubmittedAtDesc();

    // 🔥 FIXED METHODS (FOR SERVICES)

    @Query("SELECT AVG(r.score) FROM Result r")
    Double averageScoreAll();

    @Query("SELECT COUNT(r) FROM Result r WHERE r.username = :username")
    Long countByEmail(@Param("username") String username);

    @Query("SELECT AVG(r.score) FROM Result r WHERE r.username = :username")
    Double averageScoreByEmail(@Param("username") String username);

    @Query("SELECT r.weakTopic, COUNT(r) FROM Result r WHERE r.username = :username GROUP BY r.weakTopic")
    List<Object[]> findWeakTopics(@Param("username") String username);
}