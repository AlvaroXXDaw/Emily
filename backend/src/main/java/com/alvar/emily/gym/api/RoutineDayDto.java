package com.alvar.emily.gym.api;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class RoutineDayDto {
  private String id;
  private Integer dayOrder;
  private String name;
  private List<RoutineExerciseDto> exercises = new ArrayList<>();
}

