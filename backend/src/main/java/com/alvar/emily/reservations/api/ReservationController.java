package com.alvar.emily.reservations.api;

import com.alvar.emily.reservations.domain.SportType;
import com.alvar.emily.reservations.service.ReservationService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ReservationController {

  private final ReservationService reservationService;

  public ReservationController(ReservationService reservationService) {
    this.reservationService = reservationService;
  }

  @GetMapping("/reservations")
  public List<ReservationResponse> getReservations(
      @RequestParam(required = false) String sport,
      @RequestParam(required = false) String status,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
  ) {
    return reservationService.getReservations(sport, status, date);
  }

  @PostMapping("/reservations")
  public ResponseEntity<ReservationResponse> createReservation(
      @Valid @RequestBody CreateReservationRequest request
  ) {
    return ResponseEntity.ok(reservationService.createReservation(request));
  }

  @PostMapping("/reservations/maintenance")
  public ResponseEntity<ReservationResponse> createMaintenance(
      @Valid @RequestBody CreateMaintenanceBlockRequest request
  ) {
    return ResponseEntity.ok(reservationService.createMaintenanceBlock(request));
  }

  @DeleteMapping("/reservations/{id}")
  public ResponseEntity<Void> deleteReservation(@PathVariable UUID id) {
    reservationService.deleteReservation(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/availability")
  public List<AvailabilitySlotResponse> getAvailability(
      @RequestParam SportType sport,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
  ) {
    return reservationService.getAvailability(sport, date);
  }
}

