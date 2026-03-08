package com.alvar.emily.clients;

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
class ClientControllerIT {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Test
  void shouldListClients() throws Exception {
    mockMvc.perform(get("/api/v1/clients"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].id").exists())
        .andExpect(jsonPath("$[0].email").exists());
  }

  @Test
  void shouldCreateAndDeleteClient() throws Exception {
    String payload = """
        {
          "name": "Cliente Test",
          "email": "cliente-test@example.com",
          "plan": "BASIC"
        }
        """;

    MvcResult result = mockMvc.perform(post("/api/v1/clients")
            .contentType(MediaType.APPLICATION_JSON)
            .content(payload))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").exists())
        .andReturn();

    JsonNode jsonNode = objectMapper.readTree(result.getResponse().getContentAsString());
    String id = jsonNode.get("id").asText();

    mockMvc.perform(delete("/api/v1/clients/{id}", id))
        .andExpect(status().isNoContent());
  }
}

