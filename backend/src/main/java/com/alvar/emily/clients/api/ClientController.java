package com.alvar.emily.clients.api;

import com.alvar.emily.clients.service.ClientService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/clients")
public class ClientController {

  private final ClientService clientService;

  public ClientController(ClientService clientService) {
    this.clientService = clientService;
  }

  @GetMapping
  public List<ClientResponse> getClients() {
    return clientService.getAllClients();
  }

  @PostMapping
  public ResponseEntity<ClientResponse> createClient(@Valid @RequestBody CreateClientRequest request) {
    return ResponseEntity.ok(clientService.createClient(request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteClient(@PathVariable UUID id) {
    clientService.deleteClient(id);
    return ResponseEntity.noContent().build();
  }
}

