package com.example.BriGaDo.profiles.user.service;

import com.example.BriGaDo.profiles.user.dto.UserRegisterRequestDto;
import com.example.BriGaDo.profiles.user.model.User;
import com.example.BriGaDo.profiles.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // ========================= REGISTER =========================
    public User registerUser(UserRegisterRequestDto dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("Username already taken!");
        }

        String hashedPassword = passwordEncoder.encode(dto.getPassword());

        User user = new User(
                dto.getFirstName(),
                dto.getLastName(),
                dto.getUsername(),
                hashedPassword,
                dto.getPhoneNumber(),
                dto.getSex(),
                dto.getBirthday(),
                dto.getLinkedinLink(),
                dto.getCvFilePath()
        );

        return userRepository.save(user);
    }

    // ========================= AUTHENTICATE / LOGIN =========================
    public User authenticate(String username, String rawPassword) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return user;
    }

    // ========================= FIND BY ID =========================
    public User findById(Long id) {
        User user = userRepository.findById(id);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return user;
    }
}
