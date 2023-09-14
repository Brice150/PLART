package com.packages.backend.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping()
@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/login")
  public ResponseEntity<UserDTO> login() {
    return new ResponseEntity<>(userService.findConnectedUserDTO(), HttpStatus.OK);
  }

  @GetMapping("/user/all")
  public ResponseEntity<List<RestrictedUserDTO>> getAllUsers() {
    return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
  }

  @GetMapping("/user")
  public ResponseEntity<UserDTO> getConnectedUser() {
    return new ResponseEntity<>(userService.findConnectedUserDTO(), HttpStatus.OK);
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<RestrictedUserDTO> getUserById(@PathVariable("id") Long id) {
    Optional<RestrictedUserDTO> foundUser = userService.findUserByIdDTO(id);
    return foundUser.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PutMapping("/user")
  public ResponseEntity<UserDTO> updateUser(@RequestBody User user) {
    Optional<UserDTO> updatedUser = userService.updateUser(user);
    return updatedUser.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
  }

  @DeleteMapping("/user")
  public ResponseEntity<?> deleteConnectedUser() throws IOException {
    userService.deleteConnectedUser();
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
