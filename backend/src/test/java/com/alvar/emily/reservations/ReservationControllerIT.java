package com.alvar.emily.reservations;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ReservationControllerIT {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void shouldGetAvailability() throws Exception {
    mockMvc.perform(get("/api/v1/availability")
            .param("sport", "PADEL")
            .param("date", "2026-03-10"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].time").exists())
        .andExpect(jsonPath("$[0].available").exists());
  }

  @Test
  void shouldCreateAndDeleteReservation() throws Exception {
    String payload = """
        {
          "clientId": "11111111-1111-1111-1111-111111111111",
          "userName": "Álvaro Martínez",
          "sport": "PADEL",
          "court": "Pista Cristal 2",
          "date": "2026-03-12",
          "time": "18:00:00"
        }
        """;

    MvcResult result = mockMvc.perform(post("/api/v1/reservations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(payload))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").exists())
        .andReturn();

    JsonNode node = objectMapper.readTree(result.getResponse().getContentAsString());
    String id = node.get("id").asText();

    mockMvc.perform(delete("/api/v1/reservations/{id}", id))
        .andExpect(status().isNoContent());
  }

  @Test
  void shouldCreateMaintenanceBlock() throws Exception {
    String payload = """
        {
          "sport": "FUTBOL",
          "court": "Pista 2 (F7)",
          "date": "2026-03-14",
          "time": "10:30:00"
        }
        """;

    mockMvc.perform(post("/api/v1/reservations/maintenance")
            .contentType(MediaType.APPLICATION_JSON)
            .content(payload))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("MAINTENANCE"));
  }
}

