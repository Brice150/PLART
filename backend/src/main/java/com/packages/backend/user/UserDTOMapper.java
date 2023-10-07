package com.packages.backend.user;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
  @Override
  public UserDTO apply(User user) {
    return new UserDTO(
      user.getId(),
      user.getNickname(),
      user.getEmail(),
      user.getUserRole(),
      user.getObjects(),
      user.getMessagesSent()
    );
  }
}
