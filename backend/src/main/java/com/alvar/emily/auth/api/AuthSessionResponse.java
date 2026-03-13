package com.alvar.emily.auth.api;

import lombok.Data;

@Data
public class AuthSessionResponse {
  private String token;
  private String clientId;
  private String name;
  private String email;
  private String role;
}
