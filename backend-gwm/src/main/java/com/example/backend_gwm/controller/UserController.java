package com.example.backend_gwm.controller;

import com.example.backend_gwm.dto.EmailAndPasswordRequestDTO;
import com.example.backend_gwm.model.User;
import com.example.backend_gwm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*")

@Controller
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("/list-users")
    public ResponseEntity<List<User>> listAll() {
        List<User> Users = userService.listAll();
        return ResponseEntity.ok(Users);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> User = userService.listById(id);
        return User.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<User> getUserByEmail(@RequestBody EmailAndPasswordRequestDTO emailRequest) {
        Optional<User> user = userService.listByEmail(emailRequest.getEmail());
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User User) {
        User createdUser = userService.create(User);
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User User) {
        Optional<User> existingUser = userService.listById(id);
        if (existingUser.isPresent()) {
            User updatedUser = userService.update(User, id);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}