package com.alvar.emily.reservations.repository;

import com.alvar.emily.reservations.domain.ReservationEntity;
import com.alvar.emily.reservations.domain.ReservationStatus;
import com.alvar.emily.reservations.domain.SportType;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<ReservationEntity, UUID> {

  List<ReservationEntity> findAllByOrderByReservationDateDescReservationTimeDesc();

  List<ReservationEntity> findBySportOrderByReservationDateDescReservationTimeDesc(SportType sport);

  List<ReservationEntity> findByStatusOrderByReservationDateDescReservationTimeDesc(ReservationStatus status);

  List<ReservationEntity> findByReservationDateOrderByReservationTimeAsc(LocalDate date);

  List<ReservationEntity> findBySportAndStatusAndReservationDateOrderByReservationTimeAsc(
      SportType sport,
      ReservationStatus status,
      LocalDate date
  );

  List<ReservationEntity> findBySportAndReservationDateOrderByReservationTimeAsc(SportType sport, LocalDate date);

  List<ReservationEntity> findByClientIdOrderByReservationDateDescReservationTimeDesc(UUID clientId);
}

