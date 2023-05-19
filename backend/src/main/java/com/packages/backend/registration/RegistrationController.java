package com.packages.backend.registration;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "registration")
public class RegistrationController {

  private final RegistrationService registrationService;

  public RegistrationController(RegistrationService registrationService) {
    this.registrationService = registrationService;
  }

  @PostMapping()
  public ResponseEntity<String> register(@RequestBody Registration request) {
    String signUpMessage = registrationService.register(request);
    return "OK".equals(signUpMessage) ?
      new ResponseEntity<>(HttpStatus.CREATED) :
      new ResponseEntity<>(signUpMessage, HttpStatus.FORBIDDEN);
  }
}
