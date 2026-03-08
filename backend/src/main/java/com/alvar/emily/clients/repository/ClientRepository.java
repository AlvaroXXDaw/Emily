package com.alvar.emily.clients.repository;

import com.alvar.emily.clients.domain.ClientEntity;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<ClientEntity, UUID> {
  Optional<ClientEntity> findByEmailIgnoreCase(String email);
}

