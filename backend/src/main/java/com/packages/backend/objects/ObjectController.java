package com.packages.backend.objects;

import com.packages.backend.user.User;
import com.packages.backend.user.UserService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.HttpHeaders.*;

@RestController
@RequestMapping("/object")
public class ObjectController {
    private final ObjectService objectService;
    private final UserService userService;
    public static final String FILEDIRECTORY = "src/main/resources/objectFiles";
    public static final String IMAGEDIRECTORY = "src/main/resources/objectImages";

    public ObjectController(ObjectService objectService, UserService userService) {
      this.objectService = objectService;
      this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Object>> getAllObjects() {
      List<Object> objects = objectService.findAllObjects();
      return new ResponseEntity<>(objects, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getObjectById(@PathVariable("id") Long id) {
      Object object = objectService.findObjectById(id);
      return new ResponseEntity<>(object, HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<Object> addObject(@RequestBody Object object) {
      Object newObject = objectService.addObject(object);
      return new ResponseEntity<>(newObject, HttpStatus.CREATED);
    }

    @PutMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<Object> updateObject(@RequestBody Object object) {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String currentUserEmail = authentication.getName();
      User connectedUser = userService.findUserByEmail(currentUserEmail);
      if (connectedUser.getNickname().equals(object.getNickname())) {
        Object updateObject = objectService.updateObject(object);
        return new ResponseEntity<>(updateObject, HttpStatus.OK);
      }
      else {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
      }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> deleteObjectById(@PathVariable("id") Long id) throws IOException {
      String filename = objectService.findObjectById(id).getFileToDownload();
      String imagename = objectService.findObjectById(id).getImage();
      Path filePath = get(FILEDIRECTORY).normalize().resolve(filename);

      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      String currentUserEmail = authentication.getName();
      User connectedUser = userService.findUserByEmail(currentUserEmail);
      Object object = objectService.findObjectById(id);
      if (connectedUser.getNickname().equals(object.getNickname())) {
        if (imagename != null) {
          Path imagePath = get(IMAGEDIRECTORY).normalize().resolve(imagename);
          if (Files.exists(imagePath)) {
            Files.delete(imagePath);
          }
        }
        if (Files.exists(filePath)) {
          Files.delete(filePath);
        }
        else {
          throw new FileNotFoundException(filename + " was not found on the server");
        }
        objectService.deleteObjectById(id);
        return new ResponseEntity<>(HttpStatus.OK);
      }
      else {
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
      }
    }

    @PostMapping("/file")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files")List<MultipartFile> multipartFiles) throws IOException {
      List<String> filenames = new ArrayList<>();
      for (MultipartFile file : multipartFiles) {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        Path fileStorage = get(FILEDIRECTORY, filename).normalize();
        copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
        filenames.add(filename);
      }
      return ResponseEntity.ok().body(filenames);
    }

  @PostMapping("/image")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<List<String>> uploadImages(@RequestParam("images")List<MultipartFile> multipartImages) throws IOException {
    List<String> imagenames = new ArrayList<>();
    for (MultipartFile image : multipartImages) {
      String imagename = StringUtils.cleanPath(image.getOriginalFilename());
      Path fileStorage = get(IMAGEDIRECTORY, imagename).normalize();
      copy(image.getInputStream(), fileStorage, REPLACE_EXISTING);
      imagenames.add(imagename);
    }
    return ResponseEntity.ok().body(imagenames);
  }

    @GetMapping("/file/{filename}")
    public ResponseEntity<Resource> downloadFiles(@PathVariable("filename") String filename) throws IOException {
      Path filePath = get(FILEDIRECTORY).normalize().resolve(filename);
      if (!Files.exists(filePath)) {
        throw new FileNotFoundException(filename + " was not found on the server");
      }
      Resource resource = new UrlResource(filePath.toUri());
      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.add("File-Name", filename);
      httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
      return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
        .headers(httpHeaders).body(resource);
    }

  @GetMapping("/image/{imagename}")
  public ResponseEntity<Resource> getImage(@PathVariable("imagename") String imagename) throws IOException {
    Path imagePath = get(IMAGEDIRECTORY).normalize().resolve(imagename);
    if (!Files.exists(imagePath)) {
      throw new FileNotFoundException(imagename + " was not found on the server");
    }
    Resource resource = new UrlResource(imagePath.toUri());
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add("File-Name", imagename);
    httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
    return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(imagePath)))
      .headers(httpHeaders).body(resource);
  }
}
