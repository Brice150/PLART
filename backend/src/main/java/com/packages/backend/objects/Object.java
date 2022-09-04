package com.packages.backend.objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.packages.backend.user.User;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "objects")
public class Object implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, updatable = false)
  private Long id;
  private String name;
  private String category;
  private String description;
  private String fileToDownload;
  private String image;
  private String nickname;
  @ManyToOne(optional = false)
  @JsonBackReference(value = "objects")
  private User fkUser;

  public Object() {
  }

  public Object(String name, String description, String category, String fileToDownload, String image, String nickname, User fkUser) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.fileToDownload = fileToDownload;
    this.image = image;
    this.nickname = nickname;
    this.fkUser = fkUser;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getFileToDownload() {
    return fileToDownload;
  }

  public void setFileToDownload(String fileToDownload) {
    this.fileToDownload = fileToDownload;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public User getFkUser() {
    return fkUser;
  }

  public void setFkUser(User fkUser) {
    this.fkUser = fkUser;
  }

  @Override
  public String toString() {
    return "Object{" +
      "id=" + id +
      ", name='" + name + '\'' +
      ", category='" + category + '\'' +
      ", description='" + description + '\'' +
      ", fileToDownload='" + fileToDownload + '\'' +
      ", image='" + image + '\'' +
      ", nickname='" + nickname + '\'' +
      ", fkUser=" + fkUser +
      '}';
  }
}

