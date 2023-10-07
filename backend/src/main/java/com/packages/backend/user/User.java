package com.packages.backend.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.packages.backend.messages.Message;
import com.packages.backend.objects.Object;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, updatable = false)
  private Long id;
  private String nickname;
  private String email;
  private String password;
  @Enumerated(EnumType.STRING)
  private UserRole userRole;
  private Boolean locked = false;
  private Boolean enabled = true;
  @OneToMany(mappedBy = "fkUser", cascade = CascadeType.ALL)
  @JsonManagedReference(value = "objects")
  private List<Object> objects;
  @OneToMany(mappedBy = "fkSender", cascade = CascadeType.ALL)
  @JsonManagedReference(value = "messagesSent")
  private List<Message> messagesSent;

  public User() {
  }

  public User(String nickname, String email, String password, UserRole userRole) {
    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.userRole = userRole;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public UserRole getUserRole() {
    return userRole;
  }

  public void setUserRole(UserRole userRole) {
    this.userRole = userRole;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
    return Collections.singletonList(authority);
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return !locked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  public List<Object> getObjects() {
    return objects;
  }

  public void setObjects(List<Object> objects) {
    this.objects = objects;
  }

  public List<Message> getMessagesSent() {
    return messagesSent;
  }

  public void setMessagesSent(List<Message> messagesSent) {
    this.messagesSent = messagesSent;
  }
}
