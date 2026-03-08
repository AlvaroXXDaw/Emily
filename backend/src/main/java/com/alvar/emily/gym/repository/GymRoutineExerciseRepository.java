package com.alvar.emily.gym.repository;

import com.alvar.emily.gym.domain.GymRoutineExerciseEntity;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymRoutineExerciseRepository extends JpaRepository<GymRoutineExerciseEntity, UUID> {
  List<GymRoutineExerciseEntity> findByRoutineDayIdOrderByExerciseOrderAsc(UUID routineDayId);
  void deleteByRoutineDayIdIn(List<UUID> routineDayIds);
}

