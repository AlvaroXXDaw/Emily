package com.alvar.emily.profile.service;

import com.alvar.emily.clients.domain.ClientEntity;
import com.alvar.emily.clients.service.ClientService;
import com.alvar.emily.profile.api.ProfileResponse;
import com.alvar.emily.profile.mapper.ProfileMapper;
import com.alvar.emily.reservations.domain.ReservationEntity;
import com.alvar.emily.reservations.service.ReservationService;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

  private final ClientService clientService;
  private final ReservationService reservationService;
  private final ProfileMapper profileMapper;

  public ProfileService(
      ClientService clientService,
      ReservationService reservationService,
      ProfileMapper profileMapper
  ) {
    this.clientService = clientService;
    this.reservationService = reservationService;
    this.profileMapper = profileMapper;
  }

  @Transactional(readOnly = true)
  public ProfileResponse getProfile(UUID clientId) {
    ClientEntity client = clientService.getEntityById(clientId);
    List<ReservationEntity> reservations = reservationService.getReservationsByClient(clientId);
    return profileMapper.toResponse(client, reservations);
  }
}

