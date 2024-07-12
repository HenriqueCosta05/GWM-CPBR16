package com.example.backend_gwm.repository;

import com.example.backend_gwm.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findById(String id);
    List<User> findAll();
}
