package com.alvar.emily.clients.service;

import com.alvar.emily.clients.api.ClientResponse;
import com.alvar.emily.clients.api.CreateClientRequest;
import com.alvar.emily.clients.domain.ClientEntity;
import com.alvar.emily.clients.mapper.ClientMapper;
import com.alvar.emily.clients.repository.ClientRepository;
import com.alvar.emily.common.error.ResourceNotFoundException;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClientService {

  private final ClientRepository clientRepository;
  private final ClientMapper clientMapper;

  public ClientService(ClientRepository clientRepository, ClientMapper clientMapper) {
    this.clientRepository = clientRepository;
    this.clientMapper = clientMapper;
  }

  @Transactional(readOnly = true)
  public List<ClientResponse> getAllClients() {
    return clientRepository.findAll().stream()
        .map(clientMapper::toResponse)
        .toList();
  }

  @Transactional
  public ClientResponse createClient(CreateClientRequest request) {
    clientRepository.findByEmailIgnoreCase(request.getEmail())
        .ifPresent(c -> {
          throw new IllegalArgumentException("Email already exists");
        });

    ClientEntity saved = clientRepository.save(clientMapper.toEntity(request));
    return clientMapper.toResponse(saved);
  }

  @Transactional
  public void deleteClient(UUID id) {
    if (!clientRepository.existsById(id)) {
      throw new ResourceNotFoundException("Client not found");
    }
    clientRepository.deleteById(id);
  }

  @Transactional(readOnly = true)
  public ClientEntity getEntityById(UUID id) {
    return clientRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
  }

  @Transactional(readOnly = true)
  public ClientEntity findByEmail(String email) {
    return clientRepository.findByEmailIgnoreCase(email).orElse(null);
  }

  @Transactional
  public ClientEntity saveEntity(ClientEntity entity) {
    return clientRepository.save(entity);
  }
}

