package com.alvar.emily.auth.service;

import com.alvar.emily.auth.api.AuthSessionResponse;
import com.alvar.emily.auth.api.LoginRequest;
import com.alvar.emily.auth.mapper.AuthMapper;
import com.alvar.emily.auth.security.JwtService;
import com.alvar.emily.clients.domain.ClientEntity;
import com.alvar.emily.clients.service.ClientService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

  private final ClientService clientService;
  private final AuthMapper authMapper;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;

  public AuthService(
      ClientService clientService,
      AuthMapper authMapper,
      JwtService jwtService,
      PasswordEncoder passwordEncoder
  ) {
    this.clientService = clientService;
    this.authMapper = authMapper;
    this.jwtService = jwtService;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional(readOnly = true)
  public AuthSessionResponse login(LoginRequest request) {
    String email = request.getEmail().trim().toLowerCase();

    // 1. Buscar cliente por email
    ClientEntity client = clientService.findByEmail(email);
    if (client == null) {
      throw new IllegalArgumentException("Credenciales inválidas");
    }

    // 2. Verificar password con BCrypt
    if (!passwordEncoder.matches(request.getPassword(), client.getPasswordHash())) {
      throw new IllegalArgumentException("Credenciales inválidas");
    }

    // 3. Generar nuestro JWT
    String token = jwtService.generateToken(client.getId(), client.getEmail(), client.getRole());

    return authMapper.toResponse(client, token);
  }
}
