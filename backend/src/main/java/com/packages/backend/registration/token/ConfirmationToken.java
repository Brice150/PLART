package com.packages.backend.registration.token;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.packages.backend.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tokens")
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String token;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime expiresAt;
    private LocalDateTime confirmedAt;
    @ManyToOne(optional = false)
    @JsonBackReference(value = "tokens")
    private User fkUserToken;

    public ConfirmationToken() {
    }

    public ConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiresAt, User fkUserToken) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.fkUserToken = fkUserToken;
    }

    public Long getId() {
      return id;
    }

    public void setId(Long id) {
      this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public LocalDateTime getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(LocalDateTime confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public User getFkUserToken() {
      return fkUserToken;
    }

    public void setFkUserToken(User fkUserToken) {
      this.fkUserToken = fkUserToken;
    }

  @Override
  public String toString() {
    return "ConfirmationToken{" +
      "id=" + id +
      ", token='" + token + '\'' +
      ", createdAt=" + createdAt +
      ", expiresAt=" + expiresAt +
      ", confirmedAt=" + confirmedAt +
      ", fkUserToken=" + fkUserToken +
      '}';
  }
}
