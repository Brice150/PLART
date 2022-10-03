package com.packages.backend.repository;

import com.packages.backend.objects.Object;
import com.packages.backend.objects.ObjectRepository;
import com.packages.backend.user.User;
import com.packages.backend.user.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
public class ObjectRepoTest {

  @Autowired
  private ObjectRepository underTest;
  @Autowired
  private UserRepository userRepository;

  @AfterEach
  void tearDown() {
    userRepository.deleteAll();
    underTest.deleteAll();
  }

  /*
  @Test
  void shouldFindObjectById() {
    User user1 = new User();
    user1.setId(1L);
    Object object = new Object(
      "name","description","category","fileToDownload","image","nickname",user1
    );
    userRepository.save(user1);
    underTest.save(object);
    Optional<Object> objectFound = underTest.findObjectById(object.getId());
    assertThat(objectFound.isPresent()).isTrue();
  }
  */

  @Test
  void shouldNotFindObjectById() {
    Optional<Object> objectFound = underTest.findObjectById(10L);
    assertThat(objectFound.isPresent()).isFalse();
  }

  /*
  @Test
  void shouldDeleteObjectById() {
    User user1 = new User();
    user1.setId(1L);
    Object object = new Object(
      "name","description","category","fileToDownload","image","nickname",user1
    );
    userRepository.save(user1);
    underTest.save(object);
    underTest.deleteObjectById(object.getId());
    assertThat(underTest.findObjectById(object.getId()).isPresent()).isFalse();
  }
  */
}
