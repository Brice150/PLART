package com.packages.backend.admin;

import com.packages.backend.messages.Message;
import com.packages.backend.objects.Object;
import com.packages.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<User, Long> {
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

  @Query("SELECT m FROM Message m")
  List<Message> findAllMessages();

  @Query("SELECT o FROM Object o WHERE o.fkUser.id = :fkUser")
  List<Object> findAllObjectsByFk(@Param("fkUser") Long fkUser);

  @Query("SELECT u FROM User u")
  List<User> findAllUsers();

  @Query("SELECT u FROM User u WHERE u.email = :email")
  Optional<User> findUserByEmail(@Param("email") String email);

  @Query("SELECT o FROM Object o WHERE o.id = :id")
  Optional<Object> findObjectById(@Param("id") Long id);
}
