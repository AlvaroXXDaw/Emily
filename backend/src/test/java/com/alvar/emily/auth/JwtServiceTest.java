package com.alvar.emily.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.alvar.emily.auth.security.JwtService;
import java.lang.reflect.Field;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JwtServiceTest {

  private JwtService jwtService;

  @BeforeEach
  void setUp() throws Exception {
    jwtService = new JwtService();

    // Inyectar valores manualmente (en tests no hay Spring)
    setField(jwtService, "secret", "clave-secreta-test-emily-2026-minimo-32-chars!!");
    setField(jwtService, "expirationMs", 86400000L);
  }

  @Test
  void generateToken_devuelveStringNoVacio() {
    // Act
    String token = jwtService.generateToken(UUID.randomUUID(), "test@test.com", "MEMBER");

    // Assert
    assertNotNull(token);
    assertFalse(token.isBlank());
  }

  @Test
  void extractEmail_devuelveEmailCorrecto() {
    // Arrange
    String token = jwtService.generateToken(UUID.randomUUID(), "alvaro@test.com", "ADMIN");

    // Act
    String email = jwtService.extractEmail(token);

    // Assert
    assertEquals("alvaro@test.com", email);
  }

  @Test
  void isTokenValid_tokenValido_devuelveTrue() {
    // Arrange
    String token = jwtService.generateToken(UUID.randomUUID(), "test@test.com", "MEMBER");

    // Act & Assert
    assertTrue(jwtService.isTokenValid(token));
  }

  @Test
  void isTokenValid_tokenInvalido_devuelveFalse() {
    // Act & Assert
    assertFalse(jwtService.isTokenValid("token.invalido.falso"));
  }

  @Test
  void isTokenValid_tokenExpirado_devuelveFalse() throws Exception {
    // Arrange — poner expiración a 0ms para que expire inmediatamente
    setField(jwtService, "expirationMs", 0L);
    String token = jwtService.generateToken(UUID.randomUUID(), "test@test.com", "MEMBER");

    // Esperar un instante para que expire
    Thread.sleep(10);

    // Restaurar expiración normal para validar
    setField(jwtService, "expirationMs", 86400000L);

    // Act & Assert
    assertFalse(jwtService.isTokenValid(token));
  }

  // Helper para inyectar valores en campos @Value sin Spring
  private void setField(Object target, String fieldName, Object value) throws Exception {
    Field field = target.getClass().getDeclaredField(fieldName);
    field.setAccessible(true);
    field.set(target, value);
  }
}
