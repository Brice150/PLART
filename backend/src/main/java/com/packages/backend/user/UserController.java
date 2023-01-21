package com.packages.backend.user;

import com.packages.backend.messages.Message;
import com.packages.backend.messages.MessageService;
import com.packages.backend.objects.Object;
import com.packages.backend.objects.ObjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
public class UserController {

  private final UserService userService;
  private final MessageService messageService;
  private final ObjectService objectService;

  public UserController(UserService userService, MessageService messageService, ObjectService objectService) {
    this.userService = userService;
    this.messageService = messageService;
    this.objectService = objectService;
  }

  @GetMapping("/login")
  public String login() {
    return "logged in successfully";
  }

  @GetMapping("/user/all")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAllUsers();
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    User connectedUser = userService.findUserByEmail(currentUserEmail);
    for (User user: users) {
      if (user.getMessagesReceived() != null) {
        for (int i=0; i<user.getMessagesReceived().size(); i++) {
          if (!connectedUser.getId().equals(user.getMessagesReceived().get(i).getFkSender().getId())) {
            user.getMessagesReceived().remove(i);
          }
        }
      }
      if (user.getMessagesSended() != null) {
        for (int i=0; i<user.getMessagesSended().size(); i++) {
          if (!connectedUser.getId().equals(user.getMessagesSended().get(i).getFkReceiver().getId())) {
            user.getMessagesSended().remove(i);
          }
        }
      }
      user.setPassword(null);
      user.setTokens(null);
      user.setUserRole(UserRole.HIDDEN);
    }
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @GetMapping("/user")
  public ResponseEntity<User> getConnectedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    User user = userService.findUserByEmail(currentUserEmail);
    user.setPassword(null);
    user.setTokens(null);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    User connectedUser = userService.findUserByEmail(currentUserEmail);
    if (connectedUser.getId().equals(id)) {
      User user = userService.findUserById(id);
      return new ResponseEntity<>(user, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
  }

  @PutMapping("/user")
  public ResponseEntity<User> updateUser(@RequestBody User user) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    User connectedUser = userService.findUserByEmail(currentUserEmail);
    if (connectedUser.getId().equals(user.getId())) {
      if (!connectedUser.getNickname().equals(user.getNickname())) {
        if (connectedUser.getMessagesReceived() != null) {
          for (Message message : connectedUser.getMessagesReceived()) {
            message.setToUser(user.getNickname());
            messageService.updateMessage(message);
          }
        }
        if (connectedUser.getMessagesSended() != null) {
          for (Message message : connectedUser.getMessagesSended()) {
            message.setFromUser(user.getNickname());
            messageService.updateMessage(message);
          }
        }
        if (connectedUser.getObjects() != null) {
          for (Object object : connectedUser.getObjects()) {
            object.setNickname(user.getNickname());
            objectService.updateObject(object);
          }
        }
      }
      user.setEmail(currentUserEmail);
      user.setUserRole(connectedUser.getUserRole());
      User updateUser = userService.updateUser(user);
      return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
  }

  @DeleteMapping("/user/{email}")
  public ResponseEntity<?> deleteUser(@PathVariable("email") String email) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    if (currentUserEmail.equals(email)) {
      userService.deleteUserByEmail(email);
      return new ResponseEntity<>(HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
  }
}
