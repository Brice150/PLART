package com.packages.backend.registration;

public class Registration {
  private final String nickname;
  private final String email;
  private final String password;

  public Registration(String nickname, String email, String password) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;
  }

  public String getNickname() {
    return nickname;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }
}
