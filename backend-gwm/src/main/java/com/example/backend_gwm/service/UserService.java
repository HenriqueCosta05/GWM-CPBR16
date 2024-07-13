package com.example.backend_gwm.service;

import com.example.backend_gwm.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    List<User> listAll();
    Optional<User> listById(String id);
    User create(User newUser);
    User update(User newUser, String id);
    void delete(String id);
    Optional<User> listByEmail(String email);

}