package com.sameera.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sameera.backend.model.StudyMaterial;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
}