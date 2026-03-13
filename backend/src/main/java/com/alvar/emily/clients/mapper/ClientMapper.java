package com.alvar.emily.clients.mapper;

import com.alvar.emily.clients.api.ClientResponse;
import com.alvar.emily.clients.api.CreateClientRequest;
import com.alvar.emily.clients.domain.ClientEntity;
import java.time.LocalDate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

  private final PasswordEncoder passwordEncoder;

  public ClientMapper(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  public ClientResponse toResponse(ClientEntity entity) {
    ClientResponse dto = new ClientResponse();
    dto.setId(entity.getId().toString());
    dto.setName(entity.getName());
    dto.setEmail(entity.getEmail());
    dto.setPlan(entity.getPlan().name());
    dto.setJoinDate(entity.getJoinDate());
    return dto;
  }

  public ClientEntity toEntity(CreateClientRequest request) {
    return ClientEntity.builder()
        .name(request.getName().trim())
        .email(request.getEmail().trim().toLowerCase())
        .plan(request.getPlan())
        .joinDate(LocalDate.now())
        .subscriptionName(request.getPlan().name().equals("PREMIUM") ? "Premium Mensual" : "Básico Mensual")
        .subscriptionStatus("ACTIVA")
        .nextBillingDate(LocalDate.now().plusMonths(1))
        .subscriptionAmountCents(request.getPlan().name().equals("PREMIUM") ? 5999 : 3999)
        .passwordHash(passwordEncoder.encode(request.getPassword()))
        .role("MEMBER")
        .build();
  }
}
