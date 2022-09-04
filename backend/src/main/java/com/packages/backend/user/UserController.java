package com.packages.backend.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

  @GetMapping("/user/find/email/{email}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
    User user = userService.findUserByEmail(email);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping("/user/find/id/{id}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
    User user = userService.findUserById(id);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @PutMapping("/user/update")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<User> updateUser(@RequestBody User user) {
    User updateUser = userService.updateUser(user);
    return new ResponseEntity<>(updateUser, HttpStatus.OK);
  }

  @DeleteMapping("/user/delete")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<?> deleteUser(@RequestBody User user) {
    userService.deleteUserByEmail(user.getEmail());
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
