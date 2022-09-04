package com.packages.backend.objects;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ObjectRepository extends JpaRepository<Object, Long> {

    void deleteObjectById(Long id);

    Optional<Object> findObjectById(Long id);
}
