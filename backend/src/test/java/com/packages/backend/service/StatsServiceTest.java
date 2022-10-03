package com.packages.backend.service;

import com.packages.backend.objects.ObjectRepository;
import com.packages.backend.stats.StatsService;
import com.packages.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class StatsServiceTest {

  @Mock
  private UserRepository userRepository;
  @Mock
  private ObjectRepository objectRepository;
  private StatsService underTest;

  @BeforeEach
  void setUp() {
    underTest = new StatsService(userRepository, objectRepository);
  }

  @Test
  void shouldGetUsersNumber() {
    underTest.getUsersNumber();
    verify(userRepository).findAll();
  }

  @Test
  void shouldGetCreatersNumber() {
    underTest.getCreatersNumber();
    verify(userRepository).findAll();
  }

  @Test
  void shouldGetObjectsNumber() {
    underTest.getObjectsNumber();
    verify(objectRepository).findAll();
  }
}
