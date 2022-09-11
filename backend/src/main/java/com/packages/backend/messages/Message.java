package com.packages.backend.messages;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.packages.backend.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "messages")
public class Message implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, updatable = false)
  private Long id;
  private String content;
  private Date date;
  private String fromUser;
  private String toUser;
  private Boolean isRead;
  @ManyToOne(optional = false)
  @JsonBackReference(value = "messagesSended")
  private User fkSender;
  @ManyToOne(optional = false)
  @JsonBackReference(value = "messagesReceived")
  private User fkReceiver;

  public Message() {
  }

  public Message(String content, Date date, String fromUser, String toUser, Boolean isRead, User fkSender, User fkReceiver) {
    this.content = content;
    this.date = date;
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.isRead = isRead;
    this.fkSender = fkSender;
    this.fkReceiver = fkReceiver;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public String getFromUser() {
    return fromUser;
  }

  public void setFromUser(String fromUser) {
    this.fromUser = fromUser;
  }

  public String getToUser() {
    return toUser;
  }

  public void setToUser(String toUser) {
    this.toUser = toUser;
  }

  public Boolean getRead() {
    return isRead;
  }

  public void setRead(Boolean read) {
    isRead = read;
  }

  public User getFkSender() {
    return fkSender;
  }

  public void setFkSender(User fkSender) {
    this.fkSender = fkSender;
  }

  public User getFkReceiver() {
    return fkReceiver;
  }

  public void setFkReceiver(User fkReceiver) {
    this.fkReceiver = fkReceiver;
  }

  @Override
  public String toString() {
    return "Message{" +
      "id=" + id +
      ", content='" + content + '\'' +
      ", date=" + date +
      ", fromUser='" + fromUser + '\'' +
      ", toUser='" + toUser + '\'' +
      ", isRead=" + isRead +
      ", fkSender=" + fkSender +
      ", fkReceiver=" + fkReceiver +
      '}';
  }
}

