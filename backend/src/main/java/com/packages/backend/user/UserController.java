package com.packages.backend.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/login")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public String login() {
    return "logged in successfully";
  }

  @GetMapping("/user/all")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAllUsers();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @GetMapping("/user/find/{email}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
    User user = userService.findUserByEmail(email);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @PutMapping("/user/update")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<User> updateUser(@RequestBody User user) {
    User updateUser = userService.updateUser(user);
    return new ResponseEntity<>(updateUser, HttpStatus.OK);
  }

  @DeleteMapping("/user/delete/{email}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<?> deleteUser(@PathVariable("email") String email) {
    userService.deleteUserByEmail(email);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
