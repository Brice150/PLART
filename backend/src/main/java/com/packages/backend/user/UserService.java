package com.packages.backend.user;

import com.packages.backend.messages.Message;
import com.packages.backend.objects.Object;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.nio.file.Paths.get;

@Service
public class UserService implements UserDetailsService {

  private final static String USER_EMAIL_NOT_FOUND_MSG = "user with email %s not found";
  private final UserRepository userRepository;
  private final RestrictedUserDTOMapper restrictedUserDTOMapper;
  private final UserDTOMapper userDTOMapper;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  public static final String IMAGEDIRECTORY = "src/main/resources/objectImages";
  public static final String FILEDIRECTORY = "src/main/resources/objectFiles";

  public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, RestrictedUserDTOMapper restrictedUserDTOMapper, UserDTOMapper userDTOMapper) {
    this.userRepository = userRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.restrictedUserDTOMapper = restrictedUserDTOMapper;
    this.userDTOMapper = userDTOMapper;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return userRepository.findUserByEmail(email)
      .orElseThrow(() ->
        new UsernameNotFoundException(String.format(USER_EMAIL_NOT_FOUND_MSG, email)));
  }

  public String signUpUser(User user) {
    String signUpMessage = "OK";
    String emptyPhrase = " is empty";
    if (user.getEmail() == null || user.getEmail().isBlank()) {
      signUpMessage = "Email" + emptyPhrase;
    } else if (user.getPassword() == null || user.getPassword().isBlank()) {
      signUpMessage = "Password" + emptyPhrase;
    } else if (user.getNickname() == null || user.getNickname().isBlank()) {
      signUpMessage = "Nickname" + emptyPhrase;
    } else if (userRepository.findUserByEmail(user.getEmail()).isPresent()) {
      signUpMessage = "email already taken";
    } else {
      String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
      user.setPassword(encodedPassword);

      userRepository.save(user);
    }
    return signUpMessage;
  }

  public List<RestrictedUserDTO> findAllUsers() {
    User connectedUser = findConnectedUser();
    List<User> users = userRepository.findAll();
    users.removeIf(user -> !user.isEnabled());
    users.removeIf(user -> connectedUser.getEmail().equals(user.getEmail()));
    return users.stream().map(restrictedUserDTOMapper).collect(Collectors.toList());
  }

  public Optional<UserDTO> updateUser(User user) {
    User connectedUser = findConnectedUser();
    if (connectedUser.getId().equals(user.getId())) {
      user.setEmail(connectedUser.getEmail());
      user.setUserRole(connectedUser.getUserRole());
      String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
      user.setPassword(encodedPassword);
      return Optional.of(userRepository.save(user)).map(userDTOMapper);
    } else {
      return Optional.empty();
    }
  }

  public Optional<User> findUserById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<RestrictedUserDTO> findUserByIdDTO(Long id) {
    Optional<User> user = findUserById(id);
    return user.map(restrictedUserDTOMapper);
  }

  public Optional<User> findUserByEmail(String email) {
    return userRepository.findUserByEmail(email);
  }

  public User findConnectedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUserEmail = authentication.getName();
    Optional<User> user = findUserByEmail(currentUserEmail);
    return user.orElse(null);
  }

  public UserDTO findConnectedUserDTO() {
    Optional<User> userDTO = Optional.of(findConnectedUser());
    return userDTO.map(userDTOMapper).orElse(null);
  }

  public void deleteConnectedUser() throws IOException {
    User connectedUser = findConnectedUser();
    for (Object object : connectedUser.getObjects()) {
      if (object.getImage() != null) {
        Path imagePath = get(IMAGEDIRECTORY).normalize().resolve(object.getImage());
        Files.deleteIfExists(imagePath);
      }
      if (object.getFileToDownload() != null) {
        Path filePath = get(FILEDIRECTORY).normalize().resolve(object.getFileToDownload());
        Files.deleteIfExists(filePath);
      }
      userRepository.deleteObjectById(object.getId());
    }
    List<Message> messages = userRepository.findAllMessagesByFk(connectedUser.getId());
    for (Message message : messages) {
      userRepository.deleteMessageById(message.getId());
    }
    userRepository.deleteUserByEmail(connectedUser.getEmail());
  }
}
