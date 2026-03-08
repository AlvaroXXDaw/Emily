package com.alvar.emily.reservations.api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AvailabilitySlotResponse {
  private String time;
  private boolean available;
}

