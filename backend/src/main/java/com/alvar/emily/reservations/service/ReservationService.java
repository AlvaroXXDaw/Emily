package com.alvar.emily.reservations.service;

import com.alvar.emily.common.error.ResourceNotFoundException;
import com.alvar.emily.reservations.api.AvailabilitySlotResponse;
import com.alvar.emily.reservations.api.CreateMaintenanceBlockRequest;
import com.alvar.emily.reservations.api.CreateReservationRequest;
import com.alvar.emily.reservations.api.ReservationResponse;
import com.alvar.emily.reservations.domain.ReservationEntity;
import com.alvar.emily.reservations.domain.ReservationStatus;
import com.alvar.emily.reservations.domain.SportType;
import com.alvar.emily.reservations.mapper.ReservationMapper;
import com.alvar.emily.reservations.repository.ReservationRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservationService {

  private final ReservationRepository reservationRepository;
  private final ReservationMapper reservationMapper;

  public ReservationService(ReservationRepository reservationRepository, ReservationMapper reservationMapper) {
    this.reservationRepository = reservationRepository;
    this.reservationMapper = reservationMapper;
  }

  @Transactional(readOnly = true)
  public List<ReservationResponse> getReservations(String sport, String status, LocalDate date) {
    List<ReservationEntity> entities;

    if (sport != null && status != null && date != null) {
      entities = reservationRepository.findBySportAndStatusAndReservationDateOrderByReservationTimeAsc(
          SportType.valueOf(sport.toUpperCase()),
          ReservationStatus.valueOf(status.toUpperCase()),
          date
      );
    } else if (sport != null) {
      entities = reservationRepository.findBySportOrderByReservationDateDescReservationTimeDesc(
          SportType.valueOf(sport.toUpperCase())
      );
    } else if (status != null) {
      entities = reservationRepository.findByStatusOrderByReservationDateDescReservationTimeDesc(
          ReservationStatus.valueOf(status.toUpperCase())
      );
    } else if (date != null) {
      entities = reservationRepository.findByReservationDateOrderByReservationTimeAsc(date);
    } else {
      entities = reservationRepository.findAllByOrderByReservationDateDescReservationTimeDesc();
    }

    return entities.stream().map(reservationMapper::toResponse).toList();
  }

  @Transactional(readOnly = true)
  public List<ReservationEntity> getReservationsByClient(UUID clientId) {
    return reservationRepository.findByClientIdOrderByReservationDateDescReservationTimeDesc(clientId);
  }

  @Transactional
  public ReservationResponse createReservation(CreateReservationRequest request) {
    ReservationEntity saved = reservationRepository.save(reservationMapper.fromCreateRequest(request));
    return reservationMapper.toResponse(saved);
  }

  @Transactional
  public ReservationResponse createMaintenanceBlock(CreateMaintenanceBlockRequest request) {
    ReservationEntity saved = reservationRepository.save(reservationMapper.fromMaintenanceRequest(request));
    return reservationMapper.toResponse(saved);
  }

  @Transactional
  public void deleteReservation(UUID id) {
    if (!reservationRepository.existsById(id)) {
      throw new ResourceNotFoundException("Reservation not found");
    }
    reservationRepository.deleteById(id);
  }

  @Transactional(readOnly = true)
  public List<AvailabilitySlotResponse> getAvailability(SportType sport, LocalDate date) {
    List<String> times = List.of("09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "21:00");
    List<ReservationEntity> dayReservations = reservationRepository
        .findBySportAndReservationDateOrderByReservationTimeAsc(sport, date);

    List<String> reservedTimes = dayReservations.stream()
        .filter(r -> r.getStatus() != ReservationStatus.COMPLETED)
        .map(r -> r.getReservationTime().toString().substring(0, 5))
        .toList();

    List<AvailabilitySlotResponse> result = new ArrayList<>();
    for (String time : times) {
      result.add(new AvailabilitySlotResponse(time, !reservedTimes.contains(time)));
    }
    return result;
  }
}

