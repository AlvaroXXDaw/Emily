package com.alvar.emily.gym.api;

import com.alvar.emily.gym.service.GymService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/gym/routines")
public class GymController {

  private final GymService gymService;

  public GymController(GymService gymService) {
    this.gymService = gymService;
  }

  @GetMapping("/{clientId}")
  public List<RoutineDayDto> getRoutine(@PathVariable UUID clientId) {
    return gymService.getRoutine(clientId);
  }

  @PutMapping("/{clientId}")
  public ResponseEntity<List<RoutineDayDto>> updateRoutine(
      @PathVariable UUID clientId,
      @Valid @RequestBody UpdateRoutineRequest request
  ) {
    return ResponseEntity.ok(gymService.updateRoutine(clientId, request));
  }
}

