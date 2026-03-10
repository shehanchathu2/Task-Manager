package com.example.task.manager.service;

import com.example.task.manager.config.JwtService;
import com.example.task.manager.dto.AuthResponse;
import com.example.task.manager.dto.LoginRequest;
import com.example.task.manager.dto.RegisterRequest;
import com.example.task.manager.model.Role;
import com.example.task.manager.model.User;
import com.example.task.manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);

    }

    public AuthResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new RuntimeException("Invalid credential");
        }

        String token = jwtService.generateToken((user.getEmail()));

        return new AuthResponse(token);
    }
}