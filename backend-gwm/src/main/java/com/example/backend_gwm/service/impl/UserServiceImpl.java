package com.example.backend_gwm.service.impl;

import com.example.backend_gwm.model.User;
import com.example.backend_gwm.repository.UserRepository;
import com.example.backend_gwm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> listAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> listById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User create(User newUser) {
        return userRepository.save(newUser);
    }

    @Override
    public User update(User updatedUser, String id) {
        Optional<User> existingUserOptional = userRepository.findById(id);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setName(updatedUser.getName());
            existingUser.setSurname(updatedUser.getSurname());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setZip(updatedUser.getZip());

            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with id: " + updatedUser.getId());
        }
    }

    @Override
    public void delete(String id) {
        userRepository.deleteById(id);
    }
}
