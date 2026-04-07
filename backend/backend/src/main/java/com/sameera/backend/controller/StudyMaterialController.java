package com.sameera.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sameera.backend.model.StudyMaterial;
import com.sameera.backend.repository.StudyMaterialRepository;

@RestController
@RequestMapping("/api/material")
@CrossOrigin(origins = "http://localhost:8081")
public class StudyMaterialController {

    private final StudyMaterialRepository repo;

    public StudyMaterialController(StudyMaterialRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<StudyMaterial> getAllMaterials() {
        return repo.findAll();
    }

    @PostMapping
    public StudyMaterial addMaterial(@RequestBody StudyMaterial material) {
        return repo.save(material);
    }

    @DeleteMapping("/{id}")
    public void deleteMaterial(@PathVariable Long id) {
        repo.deleteById(id);
    }
}