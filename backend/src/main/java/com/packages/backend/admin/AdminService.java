package com.packages.backend.admin;

import com.packages.backend.messages.Message;
import com.packages.backend.objects.Object;
import com.packages.backend.objects.ObjectNotFoundException;
import com.packages.backend.user.User;
import com.packages.backend.user.UserDTO;
import com.packages.backend.user.UserDTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static java.nio.file.Paths.get;

@Service
public class AdminService {
  private final AdminRepository adminRepository;
  private final UserDTOMapper userDTOMapper;
  public static final String IMAGEDIRECTORY = "src/main/resources/objectImages";
  public static final String FILEDIRECTORY = "src/main/resources/objectFiles";

  @Autowired
  public AdminService(AdminRepository adminRepository, UserDTOMapper userDTOMapper) {
    this.adminRepository = adminRepository;
    this.userDTOMapper = userDTOMapper;
  }

  public List<UserDTO> findAllUsers() {
    List<User> users = adminRepository.findAllUsers();
    Comparator<User> usersSort = Comparator
      .comparing(User::getUserRole, (role1, role2) -> role2.compareTo(role1))
      .thenComparing(User::getNickname);
    users.sort(usersSort);
    return users.stream().map(userDTOMapper).toList();
  }

  public List<Message> findAllMessages() {
    return adminRepository.findAllMessages();
  }

  @Transactional
  public void deleteMessageById(Long id) {
    adminRepository.deleteMessageById(id);
  }

  public Object findObjectById(Long id) {
    return adminRepository.findObjectById(id)
      .orElseThrow(() -> new ObjectNotFoundException("Object by id " + id + " was not found"));
  }

  @Transactional
  public void deleteObjectById(Long id) throws IOException {
    Object object = findObjectById(id);
    if (object.getImage() != null) {
      Path picturePath = get(IMAGEDIRECTORY).normalize().resolve(object.getImage());
      Files.deleteIfExists(picturePath);
    }
    if (object.getFileToDownload() != null) {
      Path filePath = get(FILEDIRECTORY).normalize().resolve(object.getFileToDownload());
      Files.deleteIfExists(filePath);
    }
    adminRepository.deleteObjectById(id);
  }

  public Optional<User> findUserByEmail(String email) {
    return adminRepository.findUserByEmail(email);
  }

  @Transactional
  public void deleteUserByEmail(String email) throws IOException {
    Optional<User> selectedUser = findUserByEmail(email);
    Long selectedId = 0L;
    if (selectedUser.isPresent()) {
      selectedId = selectedUser.get().getId();
    }
    List<Object> objects = adminRepository.findAllObjectsByFk(selectedId);
    for (Object object : objects) {
      if (object.getImage() != null) {
        Path imagePath = get(IMAGEDIRECTORY).normalize().resolve(object.getImage());
        Files.deleteIfExists(imagePath);
      }
      if (object.getFileToDownload() != null) {
        Path filePath = get(FILEDIRECTORY).normalize().resolve(object.getFileToDownload());
        Files.deleteIfExists(filePath);
      }
      adminRepository.deleteObjectById(object.getId());
    }
    List<Message> messages = adminRepository.findAllMessagesByFk(selectedId);
    for (Message message : messages) {
      adminRepository.deleteMessageById(message.getId());
    }
    adminRepository.deleteUserByEmail(email);
  }
}
