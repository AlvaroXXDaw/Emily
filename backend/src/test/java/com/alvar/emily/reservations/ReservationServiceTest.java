package com.alvar.emily.reservations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.alvar.emily.common.error.ResourceNotFoundException;
import com.alvar.emily.reservations.api.AvailabilitySlotResponse;
import com.alvar.emily.reservations.api.CreateReservationRequest;
import com.alvar.emily.reservations.api.ReservationResponse;
import com.alvar.emily.reservations.domain.ReservationEntity;
import com.alvar.emily.reservations.domain.ReservationStatus;
import com.alvar.emily.reservations.domain.SportType;
import com.alvar.emily.reservations.mapper.ReservationMapper;
import com.alvar.emily.reservations.repository.ReservationRepository;
import com.alvar.emily.reservations.service.ReservationService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

  @Mock
  private ReservationRepository reservationRepository;

  @Mock
  private ReservationMapper reservationMapper;

  @InjectMocks
  private ReservationService reservationService;

  // ── Helper ──
  private ReservationEntity buildReservation(SportType sport, ReservationStatus status, String time) {
    return ReservationEntity.builder()
        .id(UUID.randomUUID())
        .clientId(UUID.randomUUID())
        .userName("Test User")
        .sport(sport)
        .courtName("Pista 1")
        .reservationDate(LocalDate.of(2026, 3, 10))
        .reservationTime(LocalTime.parse(time))
        .status(status)
        .createdAt(LocalDateTime.now())
        .build();
  }

  @Test
  void getReservations_sinFiltros_devuelveTodas() {
    // Arrange
    ReservationEntity entity = buildReservation(SportType.PADEL, ReservationStatus.PENDING, "18:00");
    ReservationResponse response = new ReservationResponse();
    response.setSport("PADEL");

    when(reservationRepository.findAllByOrderByReservationDateDescReservationTimeDesc())
        .thenReturn(List.of(entity));
    when(reservationMapper.toResponse(entity)).thenReturn(response);

    // Act
    List<ReservationResponse> result = reservationService.getReservations(null, null, null);

    // Assert
    assertEquals(1, result.size());
    assertEquals("PADEL", result.get(0).getSport());
  }

  @Test
  void getReservations_filtradoPorDeporte_llamaAlMetodoCorrecto() {
    // Arrange
    when(reservationRepository.findBySportOrderByReservationDateDescReservationTimeDesc(SportType.FUTBOL))
        .thenReturn(List.of());

    // Act
    List<ReservationResponse> result = reservationService.getReservations("FUTBOL", null, null);

    // Assert
    assertTrue(result.isEmpty());
    verify(reservationRepository).findBySportOrderByReservationDateDescReservationTimeDesc(SportType.FUTBOL);
  }

  @Test
  void createReservation_guardaYDevuelveResponse() {
    // Arrange
    CreateReservationRequest request = new CreateReservationRequest();
    request.setUserName("María");
    request.setSport(SportType.PADEL);
    request.setCourt("Pista Cristal 1");
    request.setDate(LocalDate.of(2026, 3, 15));
    request.setTime(LocalTime.of(18, 0));

    ReservationEntity entity = buildReservation(SportType.PADEL, ReservationStatus.PENDING, "18:00");
    ReservationResponse response = new ReservationResponse();
    response.setUserName("María");

    when(reservationMapper.fromCreateRequest(request)).thenReturn(entity);
    when(reservationRepository.save(entity)).thenReturn(entity);
    when(reservationMapper.toResponse(entity)).thenReturn(response);

    // Act
    ReservationResponse result = reservationService.createReservation(request);

    // Assert
    assertEquals("María", result.getUserName());
    verify(reservationRepository).save(entity);
  }

  @Test
  void deleteReservation_noExiste_lanzaExcepcion() {
    // Arrange
    UUID id = UUID.randomUUID();
    when(reservationRepository.existsById(id)).thenReturn(false);

    // Act & Assert
    assertThrows(ResourceNotFoundException.class, () -> reservationService.deleteReservation(id));
  }

  @Test
  void getAvailability_slotOcupado_marcaComoNoDisponible() {
    // Arrange
    LocalDate date = LocalDate.of(2026, 3, 10);
    ReservationEntity ocupada = buildReservation(SportType.PADEL, ReservationStatus.PENDING, "18:00");

    when(reservationRepository.findBySportAndReservationDateOrderByReservationTimeAsc(SportType.PADEL, date))
        .thenReturn(List.of(ocupada));

    // Act
    List<AvailabilitySlotResponse> result = reservationService.getAvailability(SportType.PADEL, date);

    // Assert — hay 9 slots en total, el de 18:00 no debe estar disponible
    assertEquals(9, result.size());

    AvailabilitySlotResponse slot18 = result.stream()
        .filter(s -> s.getTime().equals("18:00"))
        .findFirst().orElseThrow();
    assertFalse(slot18.isAvailable());

    AvailabilitySlotResponse slot09 = result.stream()
        .filter(s -> s.getTime().equals("09:00"))
        .findFirst().orElseThrow();
    assertTrue(slot09.isAvailable());
  }
}
