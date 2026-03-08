package com.alvar.emily.profile.api;

import com.alvar.emily.profile.service.ProfileService;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {

  private final ProfileService profileService;

  public ProfileController(ProfileService profileService) {
    this.profileService = profileService;
  }

  @GetMapping("/{clientId}")
  public ProfileResponse getProfile(@PathVariable UUID clientId) {
    return profileService.getProfile(clientId);
  }
}

