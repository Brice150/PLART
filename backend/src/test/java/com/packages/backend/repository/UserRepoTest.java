package com.packages.backend.repository;

import com.packages.backend.user.User;
import com.packages.backend.user.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
public class UserRepoTest {

  @Autowired
  private UserRepository underTest;

  @AfterEach
  void tearDown() {
    underTest.deleteAll();
  }

  /*
  @Test
  void shouldFindUserById() {
    User user = new User(
      "nickame","email","password",UserRole.ROLE_USER
    );
    underTest.save(user);
    Optional<User> userFound = underTest.findById(user.getId());
    assertThat(userFound.isPresent()).isTrue();
  }
   */

  @Test
  void shouldNotFindUserById() {
    Optional<User> userFound = underTest.findById(10L);
    assertThat(userFound.isPresent()).isFalse();
  }

  /*
  @Test
  void shouldFindUserByEmail() {
    User user = new User(
      "nickame","email","password", UserRole.ROLE_USER
    );
    underTest.save(user);
    Optional<User> userFound = underTest.findByEmail(user.getEmail());
    assertThat(userFound.isPresent()).isTrue();
  }
   */

  @Test
  void shouldNotFindUserByEmail() {
    Optional<User> userFound = underTest.findByEmail("email");
    assertThat(userFound.isPresent()).isFalse();
  }

  /*
  @Test
  void shouldDeleteUserByEmail() {
    User user = new User(
      "nickame","email","password",UserRole.ROLE_USER
    );
    underTest.save(user);
    underTest.deleteByEmail(user.getEmail());
    assertThat(underTest.findById(user.getId()).isPresent()).isFalse();
  }
   */

}
