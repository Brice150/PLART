package com.packages.backend.messages;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
public class MessageController {
  private final MessageService messageService;

  public MessageController(MessageService messageService) {
    this.messageService = messageService;
  }

  @PostMapping("/add")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<Message> addMessage(@RequestBody Message message) {
    Message newMessage = messageService.addMessage(message);
    return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
  }

  @PutMapping("/update")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<Message> updateMessage(@RequestBody Message message) {
    Message updateMessage = messageService.updateMessage(message);
    return new ResponseEntity<>(updateMessage, HttpStatus.OK);
  }

  @DeleteMapping("/delete/{id}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<?> deleteMessage(@PathVariable("id") Long id) {
    messageService.deleteMessageById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}

