package com.packages.backend.objects;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public static final String DIRECTORY = "src/main/resources/objectFiles";

    public ObjectController(ObjectService objectService) {
        this.objectService = objectService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Object>> getAllObjects() {
        List<Object> objects = objectService.findAllObjects();
        return new ResponseEntity<>(objects, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Object> getObjectById(@PathVariable("id") Long id) {
      Object object = objectService.findObjectById(id);
        return new ResponseEntity<>(object, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<Object> addObject(@RequestBody Object object) {
      Object newObject = objectService.addObject(object);
        return new ResponseEntity<>(newObject, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<Object> updateObject(@RequestBody Object object) {
      Object updateObject = objectService.updateObject(object);
        return new ResponseEntity<>(updateObject, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> deleteObjectById(@PathVariable("id") Long id) {
        objectService.deleteObjectById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

  @PostMapping("/file/upload")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<List<String>> uploadFiles(@RequestParam("files")List<MultipartFile> multipartFiles) throws IOException {
    List<String> filenames = new ArrayList<>();
    for (MultipartFile file : multipartFiles) {
      String filename = StringUtils.cleanPath(file.getOriginalFilename());
      Path fileStorage = get(DIRECTORY, filename).normalize();
      copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
      filenames.add(filename);
    }
    return ResponseEntity.ok().body(filenames);
  }

  @GetMapping("/file/download/{filename}")
  public ResponseEntity<Resource> downloadFiles(@PathVariable("filename") String filename) throws IOException {
    Path filePath = get(DIRECTORY).normalize().resolve(filename);
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

  @DeleteMapping("/file/delete/{filename}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<?> deleteFile(@PathVariable("filename")  String filename) throws IOException {
    Path filePath = get(DIRECTORY).normalize().resolve(filename);
    if (Files.exists(filePath)) {
      Files.delete(filePath);
    }
    else {
      throw new FileNotFoundException(filename + " was not found on the server");
    }
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
