package com.alvar.emily.auth.api;

import lombok.Data;

@Data
public class AuthSessionResponse {
  private String sessionId;
  private String clientId;
  private String name;
  private String email;
  private String role;
}

