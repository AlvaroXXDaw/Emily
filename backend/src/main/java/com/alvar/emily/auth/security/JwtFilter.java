package com.alvar.emily.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Filtro que intercepta cada petición HTTP.
 * Si encuentra un token JWT válido en el header Authorization,
 * pone la autenticación en el SecurityContext.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

  private final JwtService jwtService;

  public JwtFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain
  ) throws ServletException, IOException {

    // 1. Leer el header Authorization
    String authHeader = request.getHeader("Authorization");

    // 2. Si no hay header o no empieza por "Bearer ", dejamos pasar
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    // 3. Extraer el token (quitar "Bearer ")
    String token = authHeader.substring(7);

    // 4. Validar el token
    if (jwtService.isTokenValid(token)) {
      String email = jwtService.extractEmail(token);

      // 5. Crear la autenticación y ponerla en el SecurityContext
      UsernamePasswordAuthenticationToken authentication =
          new UsernamePasswordAuthenticationToken(
              email,
              null,
              List.of(new SimpleGrantedAuthority("ROLE_USER"))
          );

      SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    filterChain.doFilter(request, response);
  }
}
