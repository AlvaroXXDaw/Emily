package com.alvar.emily.gym;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.alvar.emily.gym.api.RoutineDayDto;
import com.alvar.emily.gym.api.RoutineExerciseDto;
import com.alvar.emily.gym.domain.GymRoutineDayEntity;
import com.alvar.emily.gym.domain.GymRoutineExerciseEntity;
import com.alvar.emily.gym.mapper.GymMapper;
import com.alvar.emily.gym.repository.GymRoutineDayRepository;
import com.alvar.emily.gym.repository.GymRoutineExerciseRepository;
import com.alvar.emily.gym.service.GymService;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class GymServiceTest {

  @Mock
  private GymRoutineDayRepository dayRepository;

  @Mock
  private GymRoutineExerciseRepository exerciseRepository;

  @Mock
  private GymMapper gymMapper;

  @InjectMocks
  private GymService gymService;

  @Test
  void getRoutine_devuelveDiasConEjercicios() {
    // Arrange
    UUID clientId = UUID.randomUUID();
    UUID dayId = UUID.randomUUID();

    GymRoutineDayEntity dayEntity = GymRoutineDayEntity.builder()
        .id(dayId)
        .clientId(clientId)
        .dayOrder(1)
        .name("Fuerza")
        .build();

    GymRoutineExerciseEntity exerciseEntity = GymRoutineExerciseEntity.builder()
        .id(UUID.randomUUID())
        .routineDayId(dayId)
        .exerciseOrder(1)
        .name("Sentadilla")
        .setsCount(4)
        .reps("10")
        .restInterval("90s")
        .build();

    RoutineDayDto dayDto = new RoutineDayDto();
    dayDto.setDayOrder(1);
    dayDto.setName("Fuerza");

    RoutineExerciseDto exerciseDto = new RoutineExerciseDto();
    exerciseDto.setName("Sentadilla");

    when(dayRepository.findByClientIdOrderByDayOrderAsc(clientId)).thenReturn(List.of(dayEntity));
    when(exerciseRepository.findByRoutineDayIdOrderByExerciseOrderAsc(dayId)).thenReturn(List.of(exerciseEntity));
    when(gymMapper.toDayDto(dayEntity)).thenReturn(dayDto);
    when(gymMapper.toExerciseDto(exerciseEntity)).thenReturn(exerciseDto);

    // Act
    List<RoutineDayDto> result = gymService.getRoutine(clientId);

    // Assert
    assertEquals(1, result.size());
    assertEquals("Fuerza", result.get(0).getName());
    assertEquals(1, result.get(0).getExercises().size());
    assertEquals("Sentadilla", result.get(0).getExercises().get(0).getName());
  }

  @Test
  void getRoutine_sinDias_devuelveListaVacia() {
    // Arrange
    UUID clientId = UUID.randomUUID();
    when(dayRepository.findByClientIdOrderByDayOrderAsc(clientId)).thenReturn(List.of());

    // Act
    List<RoutineDayDto> result = gymService.getRoutine(clientId);

    // Assert
    assertEquals(0, result.size());
  }
}
