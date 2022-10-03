package com.packages.backend.repository;

import com.packages.backend.messages.Message;
import com.packages.backend.messages.MessageRepository;
import com.packages.backend.user.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
public class MessageRepoTest {

  @Autowired
  private MessageRepository underTest;
  @Autowired
  private UserRepository userRepository;

  @AfterEach
  void tearDown() {
    userRepository.deleteAll();
    underTest.deleteAll();
  }

  /*
  @Test
  void shouldFindMessageById() {
    User user1 = new User();
    User user2 = new User();
    user1.setId(1L);
    user1.setId(2L);
    Message message = new Message(
      "content",new Date(),"user1","user2",user1,user2
    );
    userRepository.save(user1);
    userRepository.save(user2);
    underTest.save(message);
    Optional<Message> messageFound = underTest.findMessageById(message.getId());
    assertThat(messageFound.isPresent()).isTrue();
  }
  */

  @Test
  void shouldNotFindMessageById() {
    Optional<Message> messageFound = underTest.findMessageById(10L);
    assertThat(messageFound.isPresent()).isFalse();
  }

  /*
  @Test
  void shouldDeleteCategoryById() {
    User user1 = new User();
    User user2 = new User();
    user1.setId(1L);
    user1.setId(2L);
    Message message = new Message(
      "content",new Date(),"user1","user2",user1,user2
    );
    userRepository.save(user1);
    userRepository.save(user2);
    underTest.save(message);
    underTest.deleteMessageById(message.getId());
    assertThat(underTest.findMessageById(message.getId()).isPresent()).isFalse();
  }
  */
}
