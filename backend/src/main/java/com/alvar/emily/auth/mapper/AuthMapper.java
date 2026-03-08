package com.alvar.emily.auth.mapper;

import com.alvar.emily.auth.api.AuthSessionResponse;
import com.alvar.emily.clients.domain.ClientEntity;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

  public AuthSessionResponse toResponse(ClientEntity client, String role) {
    AuthSessionResponse response = new AuthSessionResponse();
    response.setSessionId(UUID.randomUUID().toString());
    response.setClientId(client.getId().toString());
    response.setName(client.getName());
    response.setEmail(client.getEmail());
    response.setRole(role);
    return response;
  }
}


