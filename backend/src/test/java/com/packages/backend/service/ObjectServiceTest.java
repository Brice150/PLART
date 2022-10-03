package com.packages.backend.service;

import com.packages.backend.objects.Object;
import com.packages.backend.objects.ObjectRepository;
import com.packages.backend.objects.ObjectService;
import com.packages.backend.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ObjectServiceTest {

  @Mock
  private ObjectRepository objectRepository;
  private ObjectService underTest;

  @BeforeEach
  void setUp() {
    underTest = new ObjectService(objectRepository);
  }

  @Test
  void shouldAddObject() {
    Object object = new Object(
      "name","description","category","fileToDownload","image","nickname",new User()
    );
    underTest.addObject(object);
    ArgumentCaptor<Object> objectArgumentCaptor = ArgumentCaptor.forClass(Object.class);
    verify(objectRepository).save(objectArgumentCaptor.capture());
    Object capturedObject = objectArgumentCaptor.getValue();
    assertThat(capturedObject).isEqualTo(object);
  }

  @Test
  void shouldFindAllObjects() {
    underTest.findAllObjects();
    verify(objectRepository).findAll();
  }

  @Test
  void shouldUpdateObject() {
    Object object = new Object(
      "name","description","category","fileToDownload","image","nickname",new User()
    );
    underTest.updateObject(object);
    ArgumentCaptor<Object> objectArgumentCaptor = ArgumentCaptor.forClass(Object.class);
    verify(objectRepository).save(objectArgumentCaptor.capture());
    Object capturedObject = objectArgumentCaptor.getValue();
    assertThat(capturedObject).isEqualTo(object);
  }

  /*
  @Test
  void shouldFindObjectById() {
    Object object = new Object(
      "name","description","category","fileToDownload","image","nickname",new User()
    );
    underTest.addObject(object);
    underTest.findObjectById(object.getId());
    verify(objectRepository).findObjectById(object.getId());
  }
   */

  @Test
  void shouldDeleteObject() {
    underTest.deleteObjectById(1L);
    verify(objectRepository).deleteObjectById(1L);
  }
}
