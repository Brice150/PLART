package com.packages.backend.user;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class RestrictedUserDTOMapper implements Function<User, RestrictedUserDTO> {

  @Override
  public RestrictedUserDTO apply(User user) {
    return new RestrictedUserDTO(
      user.getId(),
      user.getNickname(),
      user.getEmail(),
      UserRole.HIDDEN,
      user.getObjects()
    );
  }
}
