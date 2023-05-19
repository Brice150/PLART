package com.packages.backend.stats;

import com.packages.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface StatsRepository extends JpaRepository<User, Long> {
  @Query("SELECT count(u) FROM User u")
  Integer findUsersNumber();

  @Query("SELECT count(o) FROM Object o")
  Integer findObjectsNumber();
}
