package com.packages.backend.messages;

import com.packages.backend.user.RestrictedUserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/message")
@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
public class MessageController {
  private final MessageService messageService;

  public MessageController(MessageService messageService) {
    this.messageService = messageService;
  }

  @GetMapping("/all/{fkUser}")
  public ResponseEntity<List<Message>> getAllUserMessages(@PathVariable("fkUser") Long fkUser) {
    return new ResponseEntity<>(messageService.findAllMessagesByFk(fkUser), HttpStatus.OK);
  }

  @GetMapping("/sender/{id}")
  public ResponseEntity<RestrictedUserDTO> getMessageSender(@PathVariable("id") Long id) {
    Optional<RestrictedUserDTO> messageSender = messageService.findMessageSender(id);
    return messageSender.map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
  }

  @GetMapping("/all/number/{fkUser}")
  public ResponseEntity<Integer> getUserMessagesNumber(@PathVariable("fkUser") Long fkUser) {
    return new ResponseEntity<>(messageService.findUserMessagesNumber(fkUser), HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<Message> addMessage(@RequestBody Message message) {
    Optional<Message> newMessage = messageService.addMessage(message);
    return newMessage.map(messageAdded -> new ResponseEntity<>(messageAdded, HttpStatus.CREATED)).orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
  }

  @PutMapping()
  public ResponseEntity<Message> updateMessage(@RequestBody Message message) {
    Optional<Message> updatedMessage = messageService.updateMessage(message);
    return updatedMessage.map(messageUpdated -> new ResponseEntity<>(messageUpdated, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteMessage(@PathVariable("id") Long id) {
    return "OK".equals(messageService.deleteMessageById(id)) ?
      new ResponseEntity<>(HttpStatus.OK) :
      new ResponseEntity<>(HttpStatus.FORBIDDEN);
  }
}

