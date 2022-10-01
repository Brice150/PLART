package com.packages.backend.messages;

import com.packages.backend.objects.Object;
import com.packages.backend.user.User;
import com.packages.backend.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
public class MessageController {
  private final MessageService messageService;
  private final UserService userService;

  public MessageController(MessageService messageService, UserService userService) {
    this.messageService = messageService;
    this.userService = userService;
  }

  @GetMapping("/find/{id}")
  public ResponseEntity<Message> getMessageById(@PathVariable("id") Long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    User connectedUser = userService.findUserByEmail(currentUserEmail);
    Message message = messageService.findMessageById(id);
    if (connectedUser.getId().equals(message.getFkSender().getId())
      || connectedUser.getId().equals(message.getFkReceiver().getId())) {
      return new ResponseEntity<>(message, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
  }

  @PostMapping("/add")
  public ResponseEntity<Message> addMessage(@RequestBody Message message) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    User connectedUser = userService.findUserByEmail(currentUserEmail);
    if (connectedUser.getId().equals(message.getFkSender().getId())
      && !connectedUser.getId().equals(message.getFkReceiver().getId())) {
      Message newMessage = messageService.addMessage(message);
      return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
    }
    else {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
  }

  @PutMapping("/update")
  public ResponseEntity<Message> updateMessage(@RequestBody Message message) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    User connectedUser = userService.findUserByEmail(currentUserEmail);
    if (connectedUser.getId().equals(message.getFkSender().getId())) {
      Message updateMessage = messageService.updateMessage(message);
      return new ResponseEntity<>(updateMessage, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteMessage(@PathVariable("id") Long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    User connectedUser = userService.findUserByEmail(currentUserEmail);
    Message message = messageService.findMessageById(id);
    if (connectedUser.getId().equals(message.getFkSender().getId())) {
      messageService.deleteMessageById(id);
      return new ResponseEntity<>(HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
  }
}

