package com.packages.backend.admin;

import com.packages.backend.messages.Message;
import com.packages.backend.messages.MessageService;
import com.packages.backend.objects.ObjectService;
import com.packages.backend.user.User;
import com.packages.backend.user.UserService;
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

  private final UserService userService;
  private final MessageService messageService;
  private final ObjectService objectService;
  public static final String FILEDIRECTORY = "src/main/resources/objectFiles";
  public static final String IMAGEDIRECTORY = "src/main/resources/objectImages";

  public AdminController(UserService userService, MessageService messageService, ObjectService objectService) {
    this.userService = userService;
    this.messageService = messageService;
    this.objectService = objectService;
  }

  @GetMapping("/user/all")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAllUsers();
    for (User user: users) {
      user.setMessagesReceived(null);
      user.setMessagesSended(null);
      user.setObjects(null);
      user.setPassword(null);
      user.setTokens(null);
    }
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @DeleteMapping("/user/delete/{email}")
  public ResponseEntity<?> deleteUser(@PathVariable("email") String email) {
    userService.deleteUserByEmail(email);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping("/message/all")
  public ResponseEntity<List<Message>> getAllMessages() {
    List<Message> messages = messageService.findAllMessages();
    return new ResponseEntity<>(messages, HttpStatus.OK);
  }

  @DeleteMapping("/message/delete/{id}")
  public ResponseEntity<?> deleteMessage(@PathVariable("id") Long id) {
    messageService.deleteMessageById(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/object/delete/{id}")
  public ResponseEntity<?> deleteObjectById(@PathVariable("id") Long id) throws IOException {
    String filename = objectService.findObjectById(id).getFileToDownload();
    String imagename = objectService.findObjectById(id).getImage();
    Path filePath = get(FILEDIRECTORY).normalize().resolve(filename);
    if (imagename != null) {
      Path imagePath = get(IMAGEDIRECTORY).normalize().resolve(imagename);
      if (Files.exists(imagePath)) {
        Files.delete(imagePath);
      }
    }
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
