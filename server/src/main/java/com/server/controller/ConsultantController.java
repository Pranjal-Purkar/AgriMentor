package com.server.controller;

import com.server.dto.FarmVisitRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.server.response.ApiResponse;
import com.server.service.ConsultantService;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/consultants")
@Slf4j
public class ConsultantController {
	@Autowired
	private ConsultantService consultantService;
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllConsultants() {
		log.info("Fetching all consultants");
		try {
			log.info("Consultants fetched successfully");
			return ResponseEntity.ok().body(
					new ApiResponse<>(HttpStatus.OK, "Consultants retrieved successfully", consultantService.getAllConsultants())
					);
		} catch (Exception e) {
			log.error("Error fetching consultants", e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<String>(HttpStatus.NOT_FOUND, e.getLocalizedMessage()));
			
		}
	}
    //getAllConsultants requests
    @GetMapping("/consultation/request/all")
    public ResponseEntity<?> getAllConsultationRequests(Authentication authentication) {
        log.info("Received request to get all consultation requests");
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("Unauthorized access attempt to get consultation requests");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
        }
        String username = authentication.getName();
        log.info("Attempting to get consultation requests for user: {}", username);
        Optional<?> requests = consultantService.getAllConsultationRequests(username);
        log.info("Consultation requests fetched: {}", requests);
        if (requests.isPresent()) {
            log.info("Consultation requests retrieved successfully for user: {}", username);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Consultation requests retrieved successfully", requests.get()));
        } else {
            log.info("No consultation requests found for user: {}", username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<String>(HttpStatus.NOT_FOUND, "No consultation requests found"));
        }
    }


    //Accept Consultation Request
    @PutMapping("/consultation/request/{consultationId}/accept")
    public ResponseEntity<?> acceptConsultationRequest(@PathVariable Long consultationId, Authentication authentication) {
        log.info("Received request to accept consultation request with id: {}", consultationId);
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("Unauthorized access attempt to accept consultation request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
        }
        String username = authentication.getName();
        log.info("Attempting to accept consultation request with id: {} for user: {}", consultationId, username);
        boolean accepted = consultantService.acceptConsultationRequest(username, consultationId);
        if (accepted) {
            log.info("Consultation request with id: {} accepted successfully for user: {}", consultationId, username);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Consultation request accepted successfully"));
        } else {
            log.info("Failed to accept consultation request with id: {} for user: {}", consultationId, username);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, "Failed to accept consultation request"));
        }
    }

    //Reject Consultation Request
    @PutMapping("/consultation/request/{consultationId}/reject")
    public ResponseEntity<?> rejectConsultationRequest(@PathVariable Long consultationId, Authentication authentication) {
        log.info("Received request to reject consultation request with id: {}", consultationId);
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("Unauthorized access attempt to reject consultation request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
        }
        String username = authentication.getName();
        log.info("Attempting to reject consultation request with id: {} for user: {}", consultationId, username);
        boolean rejected = consultantService.rejectConsultationRequest(username, consultationId);
        if (rejected) {
            log.info("Consultation request with id: {} rejected successfully for user: {}", consultationId, username);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Consultation request rejected successfully"));
        } else {
            log.info("Failed to reject consultation request with id: {} for user: {}", consultationId, username);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, "Failed to reject consultation request"));
        }
    }

    //Schedule Consultation Visit
    @PutMapping("/consultation/request/{consultationId}/schedule-visit")
    public ResponseEntity<?> scheduleConsultationVisit(@PathVariable Long consultationId, @RequestBody FarmVisitRequest request, Authentication authentication) {
        log.info("Received request to schedule consultation visit for request id: {}", consultationId);
        if (authentication == null || !authentication.isAuthenticated()) {
            log.info("Unauthorized access attempt to schedule consultation visit");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
        }
        String username = authentication.getName();
        log.info("Attempting to schedule consultation visit for request id: {} by user: {}", consultationId, username);
        boolean scheduled = consultantService.scheduleConsultatinVisit(username, consultationId, request);
        if (scheduled) {
            log.info("Consultation visit scheduled successfully for request id: {} by user: {}", consultationId, username);
            return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Consultation visit scheduled successfully"));
        } else {
            log.info("Failed to schedule consultation visit for request id: {} by user: {}", consultationId, username);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, "Failed to schedule consultation visit"));
        }
    }
    }
