package com.alvar.emily.clients;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.alvar.emily.clients.api.ClientResponse;
import com.alvar.emily.clients.api.CreateClientRequest;
import com.alvar.emily.clients.domain.ClientEntity;
import com.alvar.emily.clients.domain.ClientPlan;
import com.alvar.emily.clients.mapper.ClientMapper;
import com.alvar.emily.clients.repository.ClientRepository;
import com.alvar.emily.clients.service.ClientService;
import com.alvar.emily.common.error.ResourceNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ClientServiceTest {

  @Mock
  private ClientRepository clientRepository;

  @Mock
  private ClientMapper clientMapper;

  @InjectMocks
  private ClientService clientService;

  // ── Helper para crear un ClientEntity de prueba ──
  private ClientEntity buildClient(String name, String email) {
    return ClientEntity.builder()
        .id(UUID.randomUUID())
        .name(name)
        .email(email)
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
  void getAllClients_devuelveLista() {
    // Arrange
    ClientEntity entity = buildClient("Ana", "ana@test.com");
    ClientResponse response = new ClientResponse();
    response.setName("Ana");

    when(clientRepository.findAll()).thenReturn(List.of(entity));
    when(clientMapper.toResponse(entity)).thenReturn(response);

    // Act
    List<ClientResponse> result = clientService.getAllClients();

    // Assert
    assertEquals(1, result.size());
    assertEquals("Ana", result.get(0).getName());
    verify(clientRepository).findAll();
  }

  @Test
  void createClient_guardaYDevuelveResponse() {
    // Arrange
    CreateClientRequest request = new CreateClientRequest();
    request.setName("Carlos");
    request.setEmail("carlos@test.com");
    request.setPlan(ClientPlan.PREMIUM);

    ClientEntity entity = buildClient("Carlos", "carlos@test.com");
    ClientResponse response = new ClientResponse();
    response.setName("Carlos");

    when(clientRepository.findByEmailIgnoreCase("carlos@test.com")).thenReturn(Optional.empty());
    when(clientMapper.toEntity(request)).thenReturn(entity);
    when(clientRepository.save(entity)).thenReturn(entity);
    when(clientMapper.toResponse(entity)).thenReturn(response);

    // Act
    ClientResponse result = clientService.createClient(request);

    // Assert
    assertNotNull(result);
    assertEquals("Carlos", result.getName());
    verify(clientRepository).save(entity);
  }

  @Test
  void createClient_emailDuplicado_lanzaExcepcion() {
    // Arrange
    CreateClientRequest request = new CreateClientRequest();
    request.setName("Laura");
    request.setEmail("duplicado@test.com");
    request.setPlan(ClientPlan.BASIC);

    when(clientRepository.findByEmailIgnoreCase("duplicado@test.com"))
        .thenReturn(Optional.of(buildClient("Otro", "duplicado@test.com")));

    // Act & Assert
    assertThrows(IllegalArgumentException.class, () -> clientService.createClient(request));
  }

  @Test
  void deleteClient_existente_eliminaCorrectamente() {
    // Arrange
    UUID id = UUID.randomUUID();
    when(clientRepository.existsById(id)).thenReturn(true);

    // Act
    clientService.deleteClient(id);

    // Assert
    verify(clientRepository).deleteById(id);
  }

  @Test
  void deleteClient_noExiste_lanzaExcepcion() {
    // Arrange
    UUID id = UUID.randomUUID();
    when(clientRepository.existsById(id)).thenReturn(false);

    // Act & Assert
    assertThrows(ResourceNotFoundException.class, () -> clientService.deleteClient(id));
  }

  @Test
  void getEntityById_noExiste_lanzaExcepcion() {
    // Arrange
    UUID id = UUID.randomUUID();
    when(clientRepository.findById(id)).thenReturn(Optional.empty());

    // Act & Assert
    assertThrows(ResourceNotFoundException.class, () -> clientService.getEntityById(id));
  }
}
