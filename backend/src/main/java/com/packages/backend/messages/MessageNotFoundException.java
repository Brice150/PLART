package com.packages.backend.messages;

public class MessageNotFoundException extends RuntimeException{
  public MessageNotFoundException(String message) {
    super(message);
  }
}
