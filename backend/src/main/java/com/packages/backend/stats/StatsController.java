package com.packages.backend.stats;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stats")
public class StatsController {

  private final StatsService statsService;

  public StatsController(StatsService statsService) {
    this.statsService = statsService;
  }

  @GetMapping("/users")
  public ResponseEntity<Integer> getUsersNumber() {
    Integer count = statsService.getUsersNumber();
    return new ResponseEntity<>(count, HttpStatus.OK);
  }

  @GetMapping("/creaters")
  public ResponseEntity<Integer> getCreatersNumber() {
    Integer count = statsService.getCreatersNumber();
    return new ResponseEntity<>(count, HttpStatus.OK);
  }

  @GetMapping("/objects")
  public ResponseEntity<Integer> getObjectsNumber() {
    Integer count = statsService.getObjectsNumber();
    return new ResponseEntity<>(count, HttpStatus.OK);
  }
}
