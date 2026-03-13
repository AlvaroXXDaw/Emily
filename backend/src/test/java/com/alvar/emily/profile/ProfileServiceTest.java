package com.alvar.emily.profile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import com.alvar.emily.clients.domain.ClientEntity;
import com.alvar.emily.clients.domain.ClientPlan;
import com.alvar.emily.clients.service.ClientService;
import com.alvar.emily.profile.api.ProfileResponse;
import com.alvar.emily.profile.mapper.ProfileMapper;
import com.alvar.emily.profile.service.ProfileService;
import com.alvar.emily.reservations.domain.ReservationEntity;
import com.alvar.emily.reservations.service.ReservationService;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {

  @Mock
  private ClientService clientService;

  @Mock
  private ReservationService reservationService;

  @Mock
  private ProfileMapper profileMapper;

  @InjectMocks
  private ProfileService profileService;

  @Test
  void getProfile_devuelveDatosDelCliente() {
    // Arrange
    UUID clientId = UUID.randomUUID();

    ClientEntity client = ClientEntity.builder()
        .id(clientId)
        .name("Álvaro")
        .email("alvaro@test.com")
        .plan(ClientPlan.PREMIUM)
        .joinDate(LocalDate.now())
        .subscriptionName("Premium Mensual")
        .subscriptionStatus("ACTIVA")
        .nextBillingDate(LocalDate.now().plusMonths(1))
        .subscriptionAmountCents(5999)
        .passwordHash("$2a$10$hashfalso")
        .role("MEMBER")
        .build();

    List<ReservationEntity> reservations = List.of();

    ProfileResponse expectedResponse = new ProfileResponse();
    expectedResponse.setClientId(clientId.toString());
    expectedResponse.setName("Álvaro");
    expectedResponse.setSubscriptionName("Premium Mensual");
    expectedResponse.setReservations(List.of());

    when(clientService.getEntityById(clientId)).thenReturn(client);
    when(reservationService.getReservationsByClient(clientId)).thenReturn(reservations);
    when(profileMapper.toResponse(client, reservations)).thenReturn(expectedResponse);

    // Act
    ProfileResponse result = profileService.getProfile(clientId);

    // Assert
    assertNotNull(result);
    assertEquals("Álvaro", result.getName());
    assertEquals("Premium Mensual", result.getSubscriptionName());
    assertEquals(0, result.getReservations().size());
  }
}
