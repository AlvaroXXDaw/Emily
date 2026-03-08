package com.alvar.emily.clients.api;

import com.alvar.emily.clients.domain.ClientPlan;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateClientRequest {

  @NotBlank
  private String name;

  @Email
  @NotBlank
  private String email;

  @NotNull
  private ClientPlan plan;
}

