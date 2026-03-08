package com.alvar.emily.auth.service;

import com.alvar.emily.auth.api.AuthSessionResponse;
import com.alvar.emily.auth.api.LoginRequest;
import com.alvar.emily.auth.mapper.AuthMapper;
import com.alvar.emily.clients.domain.ClientEntity;
import com.alvar.emily.clients.domain.ClientPlan;
import com.alvar.emily.clients.service.ClientService;
import java.time.LocalDate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

  private final ClientService clientService;
  private final AuthMapper authMapper;

  public AuthService(ClientService clientService, AuthMapper authMapper) {
    this.clientService = clientService;
    this.authMapper = authMapper;
  }

  @Transactional
  public AuthSessionResponse login(LoginRequest request) {
    String email = request.getEmail().trim().toLowerCase();

    ClientEntity client = clientService.findByEmail(email);
    if (client == null) {
      client = createBasicClientFromEmail(email);
    }

    String role = email.contains("admin") ? "ADMIN" : "MEMBER";
    return authMapper.toResponse(client, role);
  }

  private ClientEntity createBasicClientFromEmail(String email) {
    String name = email.split("@")[0].replace('.', ' ');
    if (name.isBlank()) {
      name = "Socio";
    }
    name = name.substring(0, 1).toUpperCase() + name.substring(1);

    ClientEntity entity = ClientEntity.builder()
        .name(name)
        .email(email)
        .plan(ClientPlan.BASIC)
        .joinDate(LocalDate.now())
        .subscriptionName("Básico Mensual")
        .subscriptionStatus("ACTIVA")
        .nextBillingDate(LocalDate.now().plusMonths(1))
        .subscriptionAmountCents(3999)
        .build();

    return clientService.saveEntity(entity);
  }
}

