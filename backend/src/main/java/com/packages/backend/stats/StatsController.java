package com.packages.backend.stats;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
public class StatsController {

  private final StatsService statsService;

  public StatsController(StatsService statsService) {
    this.statsService = statsService;
  }

  @GetMapping("/users")
  public ResponseEntity<Integer> getUsersNumber() {
    return new ResponseEntity<>(statsService.getUsersNumber(), HttpStatus.OK);
  }

  @GetMapping("/creators")
  public ResponseEntity<Integer> getCreatorsNumber() {
    return new ResponseEntity<>(statsService.getCreatorsNumber(), HttpStatus.OK);
  }

  @GetMapping("/objects")
  public ResponseEntity<Integer> getObjectsNumber() {
    return new ResponseEntity<>(statsService.getObjectsNumber(), HttpStatus.OK);
  }
}
