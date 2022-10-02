package com.packages.backend.stats;

import com.packages.backend.objects.Object;
import com.packages.backend.objects.ObjectRepository;
import com.packages.backend.user.User;
import com.packages.backend.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

    private final UserRepository userRepository;
    private final ObjectRepository objectRepository;

    public StatsService(UserRepository userRepository, ObjectRepository objectRepository) {
        this.userRepository = userRepository;
        this.objectRepository = objectRepository;
    }

    public Integer getUsersNumber() {
      Integer count = 0;
      List<User> users = userRepository.findAll();
      for (User user : users) {
        count++;
      }
      return count;
    }

    public Integer getCreatersNumber() {
      Integer count = 0;
      List<User> users = userRepository.findAll();
      for (User user : users) {
        if (user.getObjects() != null && user.getObjects().size() != 0) {
          count++;
        }
      }
      return count;
    }

    public Integer getObjectsNumber() {
      Integer count = 0;
      List<Object> objects = objectRepository.findAll();
      for (Object object : objects) {
        count++;
      }
      return count;
    }
}
