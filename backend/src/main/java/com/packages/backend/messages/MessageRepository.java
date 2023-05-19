package com.packages.backend.messages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {

  void deleteMessageById(Long id);

  @Query("SELECT m FROM Message m WHERE (m.fkReceiver.id = :fkUser AND m.fkSender.id = :connectedId) OR (m.fkReceiver.id = :connectedId AND m.fkSender.id = :fkUser)")
  List<Message> findAllMessagesByFk(@Param("fkUser") Long fkUser, @Param("connectedId") Long connectedId);

  @Query("SELECT COUNT(m) FROM Message m WHERE (m.fkReceiver.id = :fkUser AND m.fkSender.id = :connectedId) OR (m.fkReceiver.id = :connectedId AND m.fkSender.id = :fkUser)")
  Integer findUserMessagesNumber(@Param("fkUser") Long fkUser, @Param("connectedId") Long connectedId);

  Optional<Message> findMessageById(Long id);
}
