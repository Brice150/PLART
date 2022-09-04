package com.packages.backend.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class MessageService {
  private final MessageRepository messageRepository;

  @Autowired
  public MessageService(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
  }

  public Message addMessage(Message message) {
    message.setIsRead(false);
    message.setDate(new Date());
    return messageRepository.save(message);
  }

  public List<Message> findAllMessages() {
    return messageRepository.findAll();
  }

  public Message updateMessage(Message message) {
    return messageRepository.save(message);
  }

  public Message findMessageById(Long id) {
    return messageRepository.findMessageById(id)
      .orElseThrow(() -> new MessageNotFoundException("Message by id " + id + " was not found"));
  }

  @Transactional
  public void deleteMessageById(Long id) {
    messageRepository.deleteMessageById(id);
  }
}

