package com.packages.backend.admin;

import com.packages.backend.messages.Message;
import com.packages.backend.messages.MessageService;
import com.packages.backend.objects.ObjectService;
import com.packages.backend.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static java.nio.file.Paths.get;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
public class AdminController {

  private final AdminService adminService;
  private final MessageService messageService;
  private final ObjectService objectService;
  public static final String DIRECTORY = "src/main/resources/objectFiles";

  public AdminController(AdminService adminService, MessageService messageService, ObjectService objectService) {
    this.adminService = adminService;
    this.messageService = messageService;
    this.objectService = objectService;
  }

  @GetMapping("/user/all")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = adminService.findAllUsers();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @DeleteMapping("/user/delete/{email}")
  public ResponseEntity<?> deleteUser(@PathVariable("email") String email) {
    adminService.deleteUserByEmail(email);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/message/all")
  public ResponseEntity<List<Message>> getAllMessages() {
    List<Message> messages = messageService.findAllMessages();
    return new ResponseEntity<>(messages, HttpStatus.OK);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteMessage(@PathVariable("id") Long id) {
    messageService.deleteMessageById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/object/delete/{id}")
  public ResponseEntity<?> deleteObjectById(@PathVariable("id") Long id) throws IOException {
    String filename = objectService.findObjectById(id).getFileToDownload();
    Path filePath = get(DIRECTORY).normalize().resolve(filename);
    if (Files.exists(filePath)) {
      Files.delete(filePath);
    }
    else {
      throw new FileNotFoundException(filename + " was not found on the server");
    }
    objectService.deleteObjectById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
