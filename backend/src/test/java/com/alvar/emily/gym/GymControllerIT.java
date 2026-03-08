package com.alvar.emily.gym;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class GymControllerIT {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void shouldGetRoutine() throws Exception {
    mockMvc.perform(get("/api/v1/gym/routines/{id}", "11111111-1111-1111-1111-111111111111"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].dayOrder").exists());
  }

  @Test
  void shouldUpdateRoutine() throws Exception {
    String payload = """
        {
          "days": [
            {
              "dayOrder": 1,
              "name": "Push",
              "exercises": [
                {
                  "order": 1,
                  "name": "Press banca",
                  "sets": 4,
                  "reps": "10",
                  "rest": "90s"
                }
              ]
            }
          ]
        }
        """;

    mockMvc.perform(put("/api/v1/gym/routines/{id}", "11111111-1111-1111-1111-111111111111")
            .contentType(MediaType.APPLICATION_JSON)
            .content(payload))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("Push"))
        .andExpect(jsonPath("$[0].exercises[0].name").value("Press banca"));
  }
}

