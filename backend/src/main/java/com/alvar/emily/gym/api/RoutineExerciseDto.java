package com.alvar.emily.gym.api;

import lombok.Data;

@Data
public class RoutineExerciseDto {
  private String id;
  private Integer order;
  private String name;
  private Integer sets;
  private String reps;
  private String rest;
}

