package com.alvar.emily.gym.mapper;

import com.alvar.emily.gym.api.RoutineDayDto;
import com.alvar.emily.gym.api.RoutineExerciseDto;
import com.alvar.emily.gym.domain.GymRoutineDayEntity;
import com.alvar.emily.gym.domain.GymRoutineExerciseEntity;
import org.springframework.stereotype.Component;

@Component
public class GymMapper {

  public RoutineDayDto toDayDto(GymRoutineDayEntity dayEntity) {
    RoutineDayDto dto = new RoutineDayDto();
    dto.setId(dayEntity.getId().toString());
    dto.setDayOrder(dayEntity.getDayOrder());
    dto.setName(dayEntity.getName());
    return dto;
  }

  public RoutineExerciseDto toExerciseDto(GymRoutineExerciseEntity entity) {
    RoutineExerciseDto dto = new RoutineExerciseDto();
    dto.setId(entity.getId().toString());
    dto.setOrder(entity.getExerciseOrder());
    dto.setName(entity.getName());
    dto.setSets(entity.getSetsCount());
    dto.setReps(entity.getReps());
    dto.setRest(entity.getRestInterval());
    return dto;
  }
}


