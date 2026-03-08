package com.alvar.emily.profile.api;

import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
public class ProfileResponse {
  private String clientId;
  private String name;
  private String subscriptionName;
  private String subscriptionStatus;
  private LocalDate nextBillingDate;
  private Integer subscriptionAmountCents;
  private List<ProfileReservationResponse> reservations;
}

