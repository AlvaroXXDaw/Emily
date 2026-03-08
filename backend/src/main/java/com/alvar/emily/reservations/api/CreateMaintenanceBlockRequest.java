package com.alvar.emily.reservations.api;

import com.alvar.emily.reservations.domain.SportType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

@Data
public class CreateMaintenanceBlockRequest {

  @NotNull
  private SportType sport;

  @NotBlank
  private String court;

  @NotNull
  private LocalDate date;

  @NotNull
  private LocalTime time;
}

