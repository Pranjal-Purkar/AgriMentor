package com.server.controller;

import com.server.entity.Farmvisit;
import com.server.response.ApiResponse;
import com.server.service.FarmvisitService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/farmvisits")
@Slf4j
public class FarmVisitingController {
    @Autowired
    private FarmvisitService farmvisitService;

    //get visiting schedule by Consultation id
    @GetMapping("/schedule/{consultationId}")
    public ResponseEntity<?> getVisitingScheduleByConsultationId(@PathVariable Long consultationId, Authentication authentication) {
        log.info("Received request to get visiting schedule by consultation id");
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("Unauthorized access attempt to schedule consultation visit");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
        }
        String username = authentication.getName();
        log.info("Attempting to get visiting schedule for user: {}", username);
        Farmvisit farmvisit = this.farmvisitService.getFarvisitByConsultationId(username,consultationId).orElseThrow(() -> new RuntimeException("No visiting schedule found for consultation id: " + consultationId));
        log.info("Visiting schedule fetched: {}", farmvisit);
        if (farmvisit != null) {
            log.info("Visiting schedule retrieved successfully for user: {}", username);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Visiting schedule retrieved successfully", farmvisit));
        } else {
            log.info("No visiting schedule found for user: {}", username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<String>(HttpStatus.NOT_FOUND, "No visiting schedule found"));
        }
    }
}
