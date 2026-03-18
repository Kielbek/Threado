package com.example.user.kafka.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public record KeycloakEventDto(
        @JsonProperty("eventType")
        String type,
        String userId,
        Map<String, String> details
) {}