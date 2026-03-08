package com.alvar.emily.clients.api;

import java.time.LocalDate;
import lombok.Data;

@Data
public class ClientResponse {
  private String id;
  private String name;
  private String email;
  private String plan;
  private LocalDate joinDate;
}

