package com.packages.backend.objects;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.packages.backend.user.RestrictedUserDTO;
import com.packages.backend.user.RestrictedUserDTOMapper;
import com.packages.backend.user.User;
import com.packages.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

@Service
public class ObjectService {
  private final ObjectRepository objectRepository;

  private final UserService userService;
  private final RestrictedUserDTOMapper restrictedUserDTOMapper;
  public static final String FILEDIRECTORY = "src/main/resources/objectFiles";
  public static final String IMAGEDIRECTORY = "src/main/resources/objectImages";

  @Autowired
  public ObjectService(ObjectRepository objectRepository, UserService userService, RestrictedUserDTOMapper restrictedUserDTOMapper) {
    this.objectRepository = objectRepository;
    this.userService = userService;
    this.restrictedUserDTOMapper = restrictedUserDTOMapper;
  }

  public Object addObject(String objectJson, List<MultipartFile> multipartFiles, List<MultipartFile> multipartPictures) throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    Object object = objectMapper.readValue(objectJson, Object.class);
    String fileName = null;
    for (MultipartFile file : multipartFiles) {
      fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
      Path fileStorage = get(FILEDIRECTORY, fileName).normalize();
      copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
    }
    String pictureName = null;
    for (MultipartFile picture : multipartPictures) {
      pictureName = StringUtils.cleanPath(Objects.requireNonNull(picture.getOriginalFilename()));
      Path fileStorage = get(IMAGEDIRECTORY, pictureName).normalize();
      copy(picture.getInputStream(), fileStorage, REPLACE_EXISTING);
    }
    object.setImage(pictureName);
    object.setFileToDownload(fileName);
    return objectRepository.save(object);
  }

  public Optional<RestrictedUserDTO> findObjectCreator(Long id) {
    Long userId = findObjectById(id).getFkUser().getId();
    return objectRepository.findObjectCreator(userId).map(restrictedUserDTOMapper);
  }

  public ResponseEntity<Resource> getFile(String fileName) throws IOException {
    Path filePath = get(FILEDIRECTORY).normalize().resolve(fileName);
    if (!Files.exists(filePath)) {
      throw new FileNotFoundException(fileName + " was not found on the server");
    }
    Resource resource = new UrlResource(filePath.toUri());
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add("File-Name", fileName);
    httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
    return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
      .headers(httpHeaders).body(resource);
  }

  public ResponseEntity<Resource> getPicture(String pictureName) throws IOException {
    Path picturePath = get(IMAGEDIRECTORY).normalize().resolve(pictureName);
    if (!Files.exists(picturePath)) {
      throw new FileNotFoundException(pictureName + " was not found on the server");
    }
    Resource resource = new UrlResource(picturePath.toUri());
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add("File-Name", pictureName);
    httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
    return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(picturePath)))
      .headers(httpHeaders).body(resource);
  }

  public List<Object> findAllObjects() {
    return objectRepository.findAll();
  }

  public Optional<Object> updateObject(Object object) {
    User connectedUser = userService.findConnectedUser();
    if (connectedUser.getId().equals(object.getFkUser().getId())) {
      Object updateObject = objectRepository.save(object);
      return Optional.of(updateObject);
    } else {
      return Optional.empty();
    }
  }

  public Object findObjectById(Long id) {
    return objectRepository.findObjectById(id)
      .orElseThrow(() -> new ObjectNotFoundException("Object by id " + id + " was not found"));
  }

  @Transactional
  public String deleteObjectById(Long id) throws IOException {
    User connectedUser = userService.findConnectedUser();
    Object object = findObjectById(id);
    if (connectedUser.getId().equals(object.getFkUser().getId())) {
      if (object.getImage() != null) {
        Path picturePath = get(IMAGEDIRECTORY).normalize().resolve(object.getImage());
        Files.deleteIfExists(picturePath);
      }
      if (object.getFileToDownload() != null) {
        Path filePath = get(FILEDIRECTORY).normalize().resolve(object.getFileToDownload());
        Files.deleteIfExists(filePath);
      }
      objectRepository.deleteObjectById(id);
      return "OK";
    } else {
      return "FORBIDDEN";
    }
  }
}
