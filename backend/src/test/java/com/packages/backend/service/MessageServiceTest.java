package com.packages.backend.service;

import com.packages.backend.messages.Message;
import com.packages.backend.messages.MessageRepository;
import com.packages.backend.messages.MessageService;
import com.packages.backend.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.util.Date;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class MessageServiceTest {

  @Mock
  private MessageRepository messageRepository;
  private MessageService underTest;

  @BeforeEach
  void setUp() {
    underTest = new MessageService(messageRepository);
  }

  @Test
  void shouldAddMessage() {
    Message message = new Message(
      "content",new Date(),"user1","user2",new User(),new User()
    );
    underTest.addMessage(message);
    ArgumentCaptor<Message> messageArgumentCaptor = ArgumentCaptor.forClass(Message.class);
    verify(messageRepository).save(messageArgumentCaptor.capture());
    Message capturedMessage = messageArgumentCaptor.getValue();
    assertThat(capturedMessage).isEqualTo(message);
  }

  @Test
  void shouldFindAllMessages() {
    underTest.findAllMessages();
    verify(messageRepository).findAll();
  }

  @Test
  void shouldUpdateMessage() {
    Message message = new Message(
      "content",new Date(),"user1","user2",new User(),new User()
    );
    underTest.updateMessage(message);
    ArgumentCaptor<Message> messageArgumentCaptor = ArgumentCaptor.forClass(Message.class);
    verify(messageRepository).save(messageArgumentCaptor.capture());
    Message capturedMessage = messageArgumentCaptor.getValue();
    assertThat(capturedMessage).isEqualTo(message);
  }

  /*
  @Test
  void shouldFindMessageById() {
    Message message = new Message(
      "content",new Date(),"user1","user2",new User(),new User()
    );
    underTest.addMessage(message);
    underTest.findMessageById(message.getId());
    verify(messageRepository).findMessageById(message.getId());
  }
  */

  @Test
  void shouldDeleteMessage() {
    underTest.deleteMessageById(1L);
    verify(messageRepository).deleteMessageById(1L);
  }
}
