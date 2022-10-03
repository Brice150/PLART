package com.packages.backend.service;

import com.packages.backend.registration.token.ConfirmationTokenService;
import com.packages.backend.user.UserRepository;
import com.packages.backend.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

  @Mock
  private UserRepository userRepository;
  @Mock
  private BCryptPasswordEncoder bCryptPasswordEncoder;
  @Mock
  private ConfirmationTokenService confirmationTokenService;
  private UserService underTest;

  @BeforeEach
  void setUp() {
    underTest = new UserService(userRepository, bCryptPasswordEncoder, confirmationTokenService);
  }

  @Test
  void shouldEnableUser() {
    underTest.enableUser("email");
    verify(userRepository).enableUser("email");
  }

  @Test
  void shouldFindAllUsers() {
    underTest.findAllUsers();
    verify(userRepository).findAll();
  }

  /*
  @Test
  void shouldUpdateUser() {
    User user = new User(
      "nickame","email","password",UserRole.ROLE_USER
    );
    String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
    user.setPassword(encodedPassword);
    underTest.updateUser(user);
    ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
    verify(userRepository).save(userArgumentCaptor.capture());
    User capturedUser = userArgumentCaptor.getValue();
    assertThat(capturedUser).isEqualTo(user);
  }

  @Test
  void shouldFindUserByEmail() {
    underTest.findUserByEmail("email");
    verify(userRepository).findByEmail("email");
  }

  @Test
  void shouldFindUserById() {
    underTest.findUserById(1L);
    verify(userRepository).findById(1L);
  }
  */

  @Test
  void shouldDeleteUser() {
    underTest.deleteUserByEmail("email");
    verify(userRepository).deleteByEmail("email");
  }
}
