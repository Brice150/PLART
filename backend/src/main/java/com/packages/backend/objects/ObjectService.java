package com.packages.backend.objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ObjectService {
    private final ObjectRepository objectRepository;

    @Autowired
    public ObjectService(ObjectRepository objectRepository) {
        this.objectRepository = objectRepository;
    }

    public Object addObject(Object object) {
        return objectRepository.save(object);
    }

    public List<Object> findAllObjects() {
        return objectRepository.findAll();
    }

    public Object updateObject(Object object) {
        return objectRepository.save(object);
    }

    public Object findObjectById(Long id) {
        return objectRepository.findObjectById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Object by id " + id + " was not found"));
    }

    @Transactional
    public void deleteObjectById(Long id) {
      objectRepository.deleteObjectById(id);
    }
}
