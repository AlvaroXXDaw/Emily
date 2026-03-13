package com.alvar.emily.auth.mapper;

import com.alvar.emily.auth.api.AuthSessionResponse;
import com.alvar.emily.clients.domain.ClientEntity;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

  public AuthSessionResponse toResponse(ClientEntity client, String token) {
    AuthSessionResponse response = new AuthSessionResponse();
    response.setToken(token);
    response.setClientId(client.getId().toString());
    response.setName(client.getName());
    response.setEmail(client.getEmail());
    response.setRole(client.getRole());
    return response;
  }
}
