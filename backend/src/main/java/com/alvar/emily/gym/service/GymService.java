package com.alvar.emily.gym.service;

import com.alvar.emily.gym.api.RoutineDayDto;
import com.alvar.emily.gym.api.RoutineExerciseDto;
import com.alvar.emily.gym.api.UpdateRoutineRequest;
import com.alvar.emily.gym.domain.GymRoutineDayEntity;
import com.alvar.emily.gym.domain.GymRoutineExerciseEntity;
import com.alvar.emily.gym.mapper.GymMapper;
import com.alvar.emily.gym.repository.GymRoutineDayRepository;
import com.alvar.emily.gym.repository.GymRoutineExerciseRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GymService {

  private final GymRoutineDayRepository dayRepository;
  private final GymRoutineExerciseRepository exerciseRepository;
  private final GymMapper gymMapper;

  public GymService(
      GymRoutineDayRepository dayRepository,
      GymRoutineExerciseRepository exerciseRepository,
      GymMapper gymMapper
  ) {
    this.dayRepository = dayRepository;
    this.exerciseRepository = exerciseRepository;
    this.gymMapper = gymMapper;
  }

  @Transactional(readOnly = true)
  public List<RoutineDayDto> getRoutine(UUID clientId) {
    List<GymRoutineDayEntity> days = dayRepository.findByClientIdOrderByDayOrderAsc(clientId);
    List<RoutineDayDto> response = new ArrayList<>();

    for (GymRoutineDayEntity day : days) {
      RoutineDayDto dayDto = gymMapper.toDayDto(day);
      List<GymRoutineExerciseEntity> exercises = exerciseRepository.findByRoutineDayIdOrderByExerciseOrderAsc(day.getId());
      List<RoutineExerciseDto> exerciseDtos = exercises.stream().map(gymMapper::toExerciseDto).toList();
      dayDto.setExercises(exerciseDtos);
      response.add(dayDto);
    }

    return response;
  }

  @Transactional
  public List<RoutineDayDto> updateRoutine(UUID clientId, UpdateRoutineRequest request) {
    List<GymRoutineDayEntity> currentDays = dayRepository.findByClientIdOrderByDayOrderAsc(clientId);
    if (!currentDays.isEmpty()) {
      List<UUID> dayIds = currentDays.stream().map(GymRoutineDayEntity::getId).toList();
      exerciseRepository.deleteByRoutineDayIdIn(dayIds);
      dayRepository.deleteByClientId(clientId);
    }

    int dayOrder = 1;
    for (RoutineDayDto dayDto : request.getDays()) {
      GymRoutineDayEntity dayEntity = GymRoutineDayEntity.builder()
          .clientId(clientId)
          .dayOrder(dayDto.getDayOrder() != null ? dayDto.getDayOrder() : dayOrder)
          .name(dayDto.getName() == null ? "" : dayDto.getName())
          .build();
      GymRoutineDayEntity savedDay = dayRepository.save(dayEntity);

      int exerciseOrder = 1;
      for (RoutineExerciseDto exerciseDto : dayDto.getExercises()) {
        GymRoutineExerciseEntity exercise = GymRoutineExerciseEntity.builder()
            .routineDayId(savedDay.getId())
            .exerciseOrder(exerciseDto.getOrder() != null ? exerciseDto.getOrder() : exerciseOrder)
            .name(exerciseDto.getName() == null ? "" : exerciseDto.getName())
            .setsCount(exerciseDto.getSets() == null ? 3 : exerciseDto.getSets())
            .reps(exerciseDto.getReps() == null ? "10" : exerciseDto.getReps())
            .restInterval(exerciseDto.getRest() == null ? "60s" : exerciseDto.getRest())
            .build();
        exerciseRepository.save(exercise);
        exerciseOrder++;
      }
      dayOrder++;
    }

    return getRoutine(clientId);
  }
}

