package com.example.BriGaDo.profiles.user.controller;

import com.example.BriGaDo.profiles.user.dto.LoginRequestDto;
import com.example.BriGaDo.profiles.user.dto.UserRegisterRequestDto;
import com.example.BriGaDo.profiles.user.dto.UserResponseDto;
import com.example.BriGaDo.profiles.user.model.User;
import com.example.BriGaDo.profiles.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private static final String SESSION_USER_ID = "USER_ID";

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ========================= REGISTER =========================
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(
            @Valid @RequestBody UserRegisterRequestDto dto) {

        User user = userService.registerUser(dto);
        UserResponseDto response = mapToResponse(user);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // ========================= LOGIN =========================
    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(
            @Valid @RequestBody LoginRequestDto loginDto,
            HttpSession session) {

        User user = userService.authenticate(loginDto.getUsername(), loginDto.getPassword());
        session.setAttribute(SESSION_USER_ID, user.getId());

        UserResponseDto response = mapToResponse(user);
        return ResponseEntity.ok(response);
    }

    // ========================= LOGOUT =========================
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate(); // унищожава текущата сесия
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    // ========================= CURRENT USER =========================
    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentUser(HttpSession session) {
        Long userId = (Long) session.getAttribute(SESSION_USER_ID);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userService.findById(userId);
        UserResponseDto response = mapToResponse(user);
        return ResponseEntity.ok(response);
    }

    // ========================= HELPER =========================
    private UserResponseDto mapToResponse(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setUsername(user.getUsername());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setSex(user.getSex());
        dto.setBirthday(user.getBirthday());
        dto.setLinkedinLink(user.getLinkedinLink());
        dto.setCvFilePath(user.getCvFilePath());
        return dto;
    }
}
