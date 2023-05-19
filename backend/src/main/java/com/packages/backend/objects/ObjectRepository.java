package com.packages.backend.objects;

import com.packages.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ObjectRepository extends JpaRepository<Object, Long> {

  void deleteObjectById(Long id);

  @Query("SELECT u FROM User u WHERE u.id = :userId")
  Optional<User> findObjectCreator(@Param("userId") Long userId);

  Optional<Object> findObjectById(Long id);
}
