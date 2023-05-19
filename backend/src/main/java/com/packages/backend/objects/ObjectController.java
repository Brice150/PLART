package com.packages.backend.objects;

import com.packages.backend.user.RestrictedUserDTO;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/object")
public class ObjectController {
  private final ObjectService objectService;

  public ObjectController(ObjectService objectService) {
    this.objectService = objectService;
  }

  @GetMapping("/all")
  public ResponseEntity<List<Object>> getAllObjects() {
    return new ResponseEntity<>(objectService.findAllObjects(), HttpStatus.OK);
  }

  @GetMapping("/creator/{id}")
  public ResponseEntity<RestrictedUserDTO> getObjectCreator(@PathVariable("id") Long id) {
    Optional<RestrictedUserDTO> objectCreator = objectService.findObjectCreator(id);
    return objectCreator.map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping()
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<Object> addObject(@RequestParam("object") String objectJson, @RequestParam("files") List<MultipartFile> multipartFiles, @RequestParam("pictures") List<MultipartFile> multipartPictures) throws IOException {
    Object newObject = objectService.addObject(objectJson, multipartFiles, multipartPictures);
    return new ResponseEntity<>(newObject, HttpStatus.CREATED);
  }

  @PutMapping()
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<Object> updateObject(@RequestBody Object object) {
    Optional<Object> updatedObject = objectService.updateObject(object);
    return updatedObject.map(objectUpdated -> new ResponseEntity<>(objectUpdated, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.FORBIDDEN));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
  public ResponseEntity<?> deleteObjectById(@PathVariable("id") Long id) throws IOException {
    return "OK".equals(objectService.deleteObjectById(id)) ?
      new ResponseEntity<>(HttpStatus.OK) :
      new ResponseEntity<>(HttpStatus.FORBIDDEN);
  }


  @GetMapping("/file/{fileName}")
  public ResponseEntity<Resource> getFile(@PathVariable("fileName") String fileName) throws IOException {
    return objectService.getFile(fileName);
  }

  @GetMapping("/picture/{pictureName}")
  public ResponseEntity<Resource> getPicture(@PathVariable("pictureName") String pictureName) throws IOException {
    return objectService.getPicture(pictureName);
  }
}
