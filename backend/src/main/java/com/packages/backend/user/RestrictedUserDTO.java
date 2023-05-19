package com.packages.backend.user;

import com.packages.backend.objects.Object;

import java.util.List;

public record RestrictedUserDTO(
  Long id,
  String nickname,
  String email,
  UserRole userRole,
  List<Object> objects
) {
}
