package com.alvar.emily.profile.mapper;

import com.alvar.emily.clients.domain.ClientEntity;
import com.alvar.emily.profile.api.ProfileReservationResponse;
import com.alvar.emily.profile.api.ProfileResponse;
import com.alvar.emily.reservations.domain.ReservationEntity;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {

  public ProfileResponse toResponse(ClientEntity client, List<ReservationEntity> reservations) {
    ProfileResponse response = new ProfileResponse();
    response.setClientId(client.getId().toString());
    response.setName(client.getName());
    response.setSubscriptionName(client.getSubscriptionName());
    response.setSubscriptionStatus(client.getSubscriptionStatus());
    response.setNextBillingDate(client.getNextBillingDate());
    response.setSubscriptionAmountCents(client.getSubscriptionAmountCents());
    response.setReservations(reservations.stream().map(this::toReservationResponse).toList());
    return response;
  }

  private ProfileReservationResponse toReservationResponse(ReservationEntity entity) {
    ProfileReservationResponse dto = new ProfileReservationResponse();
    dto.setId(entity.getId().toString());
    dto.setSport(entity.getSport().name());
    dto.setCourt(entity.getCourtName());
    dto.setDate(entity.getReservationDate());
    dto.setTime(entity.getReservationTime());
    dto.setStatus(entity.getStatus().name());
    return dto;
  }
}


