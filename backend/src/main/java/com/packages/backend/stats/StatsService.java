package com.packages.backend.stats;

import com.packages.backend.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {

  private final StatsRepository statsRepository;

  public StatsService(StatsRepository statsRepository) {
    this.statsRepository = statsRepository;
  }

  public Integer getUsersNumber() {
    return statsRepository.findUsersNumber();
  }

  public Integer getCreatorsNumber() {
    Integer count = 0;
    List<User> users = statsRepository.findAll();
    for (User user : users) {
      if (!user.getObjects().isEmpty()) {
        count++;
      }
    }
    return count;
  }

  public Integer getObjectsNumber() {
    return statsRepository.findObjectsNumber();
  }
}
