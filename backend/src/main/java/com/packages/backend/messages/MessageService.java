package com.packages.backend.messages;

import com.packages.backend.user.RestrictedUserDTO;
import com.packages.backend.user.RestrictedUserDTOMapper;
import com.packages.backend.user.User;
import com.packages.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MessageService {
  private final MessageRepository messageRepository;
  private final UserService userService;
  private final RestrictedUserDTOMapper restrictedUserDTOMapper;

  @Autowired
  public MessageService(MessageRepository messageRepository, UserService userService, RestrictedUserDTOMapper restrictedUserDTOMapper) {
    this.messageRepository = messageRepository;
    this.userService = userService;
    this.restrictedUserDTOMapper = restrictedUserDTOMapper;
  }

  public Optional<Message> addMessage(Message message) {
    User connectedUser = userService.findConnectedUser();
    if (connectedUser.getId().equals(message.getFkSender().getId())) {
      message.setDate(new Date());
      Message newMessage = messageRepository.save(message);
      return Optional.of(newMessage);
    } else {
      return Optional.empty();
    }
  }

  public Optional<RestrictedUserDTO> findMessageSender(Long id) {
    Message message = findMessageById(id);
    User messageSender = message.getFkSender();
    return Optional.of(messageSender).map(restrictedUserDTOMapper);
  }

  public List<Message> findAllMessages() {
    List<Message> messages = messageRepository.findAll();
    Comparator<Message> messagesSort = Comparator
      .comparing(Message::getDate, Date::compareTo);
    messages.sort(messagesSort);
    return messages;
  }

  public Optional<Message> updateMessage(Message message) {
    User connectedUser = userService.findConnectedUser();
    if (connectedUser.getId().equals(message.getFkSender().getId())) {
      message.setDate(findMessageById(message.getId()).getDate());
      Message updateMessage = messageRepository.save(message);
      return Optional.of(updateMessage);
    } else {
      return Optional.empty();
    }
  }

  public Message findMessageById(Long id) {
    return messageRepository.findMessageById(id)
      .orElseThrow(() -> new MessageNotFoundException("Message by id " + id + " was not found"));
  }

  @Transactional
  public String deleteMessageById(Long id) {
    User connectedUser = userService.findConnectedUser();
    Message message = findMessageById(id);
    if (connectedUser.getId().equals(message.getFkSender().getId())) {
      messageRepository.deleteMessageById(id);
      return "OK";
    } else {
      return "FORBIDDEN";
    }
  }
}

