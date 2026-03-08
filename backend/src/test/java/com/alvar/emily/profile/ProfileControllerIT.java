package com.alvar.emily.profile;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProfileControllerIT {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void shouldGetProfile() throws Exception {
    mockMvc.perform(get("/api/v1/profile/{id}", "11111111-1111-1111-1111-111111111111"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").exists())
        .andExpect(jsonPath("$.subscriptionName").exists())
        .andExpect(jsonPath("$.reservations").isArray());
  }
}

