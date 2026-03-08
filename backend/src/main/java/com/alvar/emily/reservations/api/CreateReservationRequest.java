package com.alvar.emily.reservations.api;

import com.alvar.emily.reservations.domain.SportType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

@Data
public class CreateReservationRequest {

  private String clientId;

  @NotBlank
  private String userName;

  @NotNull
  private SportType sport;

  @NotBlank
  private String court;

  @NotNull
  private LocalDate date;

  @NotNull
  private LocalTime time;
}

