package com.alvar.emily.reservations.mapper;

import com.alvar.emily.reservations.api.CreateMaintenanceBlockRequest;
import com.alvar.emily.reservations.api.CreateReservationRequest;
import com.alvar.emily.reservations.api.ReservationResponse;
import com.alvar.emily.reservations.domain.ReservationEntity;
import com.alvar.emily.reservations.domain.ReservationStatus;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {

  public ReservationResponse toResponse(ReservationEntity entity) {
    ReservationResponse dto = new ReservationResponse();
    dto.setId(entity.getId().toString());
    dto.setClientId(entity.getClientId() == null ? null : entity.getClientId().toString());
    dto.setUserName(entity.getUserName());
    dto.setSport(entity.getSport().name());
    dto.setCourt(entity.getCourtName());
    dto.setDate(entity.getReservationDate());
    dto.setTime(entity.getReservationTime());
    dto.setStatus(entity.getStatus().name());
    return dto;
  }

  public ReservationEntity fromCreateRequest(CreateReservationRequest request) {
    UUID clientId = null;
    if (request.getClientId() != null && !request.getClientId().isBlank()) {
      clientId = UUID.fromString(request.getClientId());
    }

    return ReservationEntity.builder()
        .clientId(clientId)
        .userName(request.getUserName().trim())
        .sport(request.getSport())
        .courtName(request.getCourt().trim())
        .reservationDate(request.getDate())
        .reservationTime(request.getTime())
        .status(ReservationStatus.PENDING)
        .createdAt(LocalDateTime.now())
        .build();
  }

  public ReservationEntity fromMaintenanceRequest(CreateMaintenanceBlockRequest request) {
    return ReservationEntity.builder()
        .clientId(null)
        .userName("Mantenimiento")
        .sport(request.getSport())
        .courtName(request.getCourt().trim())
        .reservationDate(request.getDate())
        .reservationTime(request.getTime())
        .status(ReservationStatus.MAINTENANCE)
        .createdAt(LocalDateTime.now())
        .build();
  }
}


