package com.packages.backend.user;

import com.packages.backend.messages.Message;
import com.packages.backend.objects.Object;

import java.util.List;

public record UserDTO(
  Long id,
  String nickname,
  String email,
  UserRole userRole,
  List<Object> objects,
  List<Message> messagesSent,
  List<Message> messagesReceived
) {
}
