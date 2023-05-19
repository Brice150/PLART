package com.packages.backend.registration;

import com.packages.backend.user.User;
import com.packages.backend.user.UserRole;
import com.packages.backend.user.UserService;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
  private final UserService userService;

  public RegistrationService(UserService userService) {
    this.userService = userService;
  }

  public String register(Registration request) {
    return userService.signUpUser(
      new User(
        request.getNickname(),
        request.getEmail(),
        request.getPassword(),
        UserRole.ROLE_USER
      )
    );
  }
}
