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
  @ManyToOne(optional = false)
  @JsonBackReference(value = "messagesSent")
  private User fkSender;
  @ManyToOne(optional = false)
  @JsonBackReference(value = "messagesReceived")
  private User fkReceiver;

  public Message() {
  }

  public Message(String content, Date date, User fkSender, User fkReceiver) {
    this.content = content;
    this.date = date;
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
}

