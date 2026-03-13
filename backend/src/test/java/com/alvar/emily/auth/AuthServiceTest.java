package com.alvar.emily.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import com.alvar.emily.auth.api.AuthSessionResponse;
import com.alvar.emily.auth.api.LoginRequest;
import com.alvar.emily.auth.mapper.AuthMapper;
import com.alvar.emily.auth.security.JwtService;
import com.alvar.emily.auth.service.AuthService;
import com.alvar.emily.clients.domain.ClientEntity;
import com.alvar.emily.clients.domain.ClientPlan;
import com.alvar.emily.clients.service.ClientService;
import java.time.LocalDate;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

  @Mock
  private ClientService clientService;

  @Mock
  private AuthMapper authMapper;

  @Mock
  private JwtService jwtService;

  @Mock
  private PasswordEncoder passwordEncoder;

  @InjectMocks
  private AuthService authService;

  private ClientEntity buildClient() {
    return ClientEntity.builder()
        .id(UUID.randomUUID())
        .name("Test")
        .email("test@example.com")
        .plan(ClientPlan.BASIC)
        .joinDate(LocalDate.now())
        .subscriptionName("Básico Mensual")
        .subscriptionStatus("ACTIVA")
        .nextBillingDate(LocalDate.now().plusMonths(1))
        .subscriptionAmountCents(3999)
        .passwordHash("$2a$10$hashfalso")
        .role("MEMBER")
        .build();
  }

  @Test
  void login_credencialesCorrectas_devuelveToken() {
    // Arrange
    LoginRequest request = new LoginRequest();
    request.setEmail("test@example.com");
    request.setPassword("emily1234");

    ClientEntity client = buildClient();
    AuthSessionResponse expectedResponse = new AuthSessionResponse();
    expectedResponse.setToken("jwt-token");
    expectedResponse.setName("Test");

    when(clientService.findByEmail("test@example.com")).thenReturn(client);
    when(passwordEncoder.matches("emily1234", "$2a$10$hashfalso")).thenReturn(true);
    when(jwtService.generateToken(client.getId(), "test@example.com", "MEMBER")).thenReturn("jwt-token");
    when(authMapper.toResponse(eq(client), eq("jwt-token"))).thenReturn(expectedResponse);

    // Act
    AuthSessionResponse result = authService.login(request);

    // Assert
    assertNotNull(result);
    assertEquals("jwt-token", result.getToken());
  }

  @Test
  void login_emailNoExiste_lanzaExcepcion() {
    // Arrange
    LoginRequest request = new LoginRequest();
    request.setEmail("noexiste@example.com");
    request.setPassword("1234");

    when(clientService.findByEmail("noexiste@example.com")).thenReturn(null);

    // Act & Assert
    assertThrows(IllegalArgumentException.class, () -> authService.login(request));
  }

  @Test
  void login_passwordIncorrecto_lanzaExcepcion() {
    // Arrange
    LoginRequest request = new LoginRequest();
    request.setEmail("test@example.com");
    request.setPassword("wrong");

    ClientEntity client = buildClient();
    when(clientService.findByEmail("test@example.com")).thenReturn(client);
    when(passwordEncoder.matches("wrong", "$2a$10$hashfalso")).thenReturn(false);

    // Act & Assert
    assertThrows(IllegalArgumentException.class, () -> authService.login(request));
  }
}
