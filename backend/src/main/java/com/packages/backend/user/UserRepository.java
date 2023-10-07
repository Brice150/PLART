package com.packages.backend.user;

import com.packages.backend.messages.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long> {

  @Query("SELECT u FROM User u WHERE u.email = :email")
  Optional<User> findUserByEmail(@Param("email") String email);

  @Transactional
  @Modifying
  @Query("DELETE FROM Message m WHERE m.id = :id")
  void deleteMessageById(@Param("id") Long id);

  @Transactional
  @Modifying
  @Query("DELETE FROM Object o WHERE o.id = :id")
  void deleteObjectById(@Param("id") Long id);

  @Transactional
  @Modifying
  @Query("DELETE FROM User u WHERE u.email = :email")
  void deleteUserByEmail(@Param("email") String email);

  @Query("SELECT m FROM Message m WHERE m.fkSender.id = :fkUser")
  List<Message> findAllMessagesByFk(@Param("fkUser") Long fkUser);
}
