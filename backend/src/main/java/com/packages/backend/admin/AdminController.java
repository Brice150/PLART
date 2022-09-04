package com.packages.backend.admin;

import com.packages.backend.messages.Message;
import com.packages.backend.messages.MessageService;
import com.packages.backend.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
public class AdminController {

  private final AdminService adminService;
  private final MessageService messageService;

  public AdminController(AdminService adminService, MessageService messageService) {
    this.adminService = adminService;
    this.messageService = messageService;
  }

  @GetMapping("/admin/user/all")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = adminService.findAllUsers();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @DeleteMapping("/admin/user/delete/{email}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
  public ResponseEntity<?> deleteUser(@PathVariable("email") String email) {
    adminService.deleteUserByEmail(email);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/admin/message/all")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
  public ResponseEntity<List<Message>> getAllMessages() {
    List<Message> messages = messageService.findAllMessages();
    return new ResponseEntity<>(messages, HttpStatus.OK);
  }

  @GetMapping("/admin/message/find/{id}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
  public ResponseEntity<Message> getMessageById(@PathVariable("id") Long id) {
    Message message = messageService.findMessageById(id);
    return new ResponseEntity<>(message, HttpStatus.OK);
  }
}
