package com.motherskitchen.controller;

import com.motherskitchen.entity.User;
import com.motherskitchen.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<User> getProfile(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }
}
