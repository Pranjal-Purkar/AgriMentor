
package com.server.controller;

import com.server.dto.FarmVisitRequest;
import com.server.entity.Consultation;
import com.server.entity.Farmvisit;
import com.server.enumeration.VisitStatus;
import com.server.response.ApiResponse;
import com.server.service.ConsultationService;
import com.server.service.FarmvisitService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/farmvisits")
@Slf4j
public class FarmVisitController {

    @Autowired
    private FarmvisitService farmvisitService;

    @Autowired
    private ConsultationService consultationService;

    /**
     * Schedule a farm visit for a consultation
     */
    @PostMapping("/schedule/{consultationId}")
    public ResponseEntity<?> scheduleFarmVisit(
            @PathVariable Long consultationId,
            @RequestBody FarmVisitRequest request,
            Authentication authentication) {
        try {
            log.info("Request to schedule farm visit for consultation id: {}", consultationId);
            String username = authentication.getName();

            // Fetch consultation
            Optional<Consultation> consultationOpt = consultationService.getConsultationById(consultationId);
            if (consultationOpt.isEmpty()) {
                log.info("Consultation not found for consultation id: {}", consultationId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>(HttpStatus.NOT_FOUND, "consultation not found"));
            }

            Consultation consultation = consultationOpt.get();

            // Verify consultant owns this consultation
            if (!consultation.getConsultant().getEmail().equals(username)) {
                log.info("Consultant not found for consultation id: {}", consultationId);
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ApiResponse<>(HttpStatus.FORBIDDEN, "You are not authorized to schedule visit for this consultation"));
            }

            Optional<Farmvisit> farmvisit = farmvisitService.scheduleFarmVisit(consultation, request);

            if (farmvisit.isPresent()) {
                return ResponseEntity.status(HttpStatus.CREATED).body(new  ApiResponse<>(HttpStatus.OK, "success",farmvisit.get()));
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to schedule farm visit"));

        } catch (Exception e) {
            log.error("Error scheduling farm visit: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Error scheduling farm visit"+ e.getMessage()));
        }
    }

    /**
     * Get farm visit details by consultation id
     */
    @GetMapping("/consultation/{consultationId}")
    public ResponseEntity<?> getFarmVisitByConsultationId(
            @PathVariable Long consultationId,
            Authentication authentication) {
        try {
            log.info("Request to get farm visit for consultation id: {}", consultationId);
            String username = authentication.getName();

            Optional<List<Farmvisit>> farmvisit = farmvisitService.getFarmvisitByConsultationId(username,consultationId);

            if (farmvisit.isPresent()) {
                return ResponseEntity.ok().body(new ApiResponse(HttpStatus.OK, "FarmVisitList get successfully", farmvisit.get()));
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(HttpStatus.NOT_FOUND, "FarmVisitList not found"));

        } catch (Exception e) {
            log.error("Error fetching farm visit: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching farm visit"));
        }
    }

    /**
     * Update farm visit status
     */
    @PatchMapping("/{visitId}/status")
    public ResponseEntity<?> updateVisitStatus(
            @PathVariable Long visitId,
            @RequestParam VisitStatus status,
            Authentication authentication) {
        try {
            log.info("Request to update farm visit status for visit id: {} to {}", visitId, status);
            String username = authentication.getName();

            return ResponseEntity.ok().body(new ApiResponse<>(HttpStatus.OK,"visit status updated",farmvisitService.updateVisitStatus(visitId,status)));

//            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
//                    .body(new ApiResponse<>(HttpStatus.NOT_IMPLEMENTED, "Update visit status not yet implemented"));

        } catch (Exception e) {
            log.error("Error updating farm visit status: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    /**
     * Update farm visit notes
     */
    @PatchMapping("/{visitId}/notes")
    public ResponseEntity<?> updateVisitNotes(
            @PathVariable Long visitId,
            @RequestBody String notes,
            Authentication authentication) {
        try {
            log.info("Request to update farm visit notes for visit id: {}", visitId);
            String username = authentication.getName();

            // Implementation would require additional service method
            // This is a placeholder for the structure
            return ResponseEntity.ok()
                    .body(new ApiResponse<>(
                            HttpStatus.OK,
                            "visit notes updated",
                            farmvisitService.updateVisitNotes(visitId,notes)));

//            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
//                    .body("Update visit notes not yet implemented");

        } catch (Exception e) {
            log.error("Error updating farm visit notes: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    /**
     * Reschedule a farm visit
     */
    @PatchMapping("/{visitId}/reschedule")
    public ResponseEntity<?> rescheduleFarmVisit(
            @PathVariable Long visitId,
            @RequestBody FarmVisitRequest request,
            Authentication authentication) {
        try {
            log.info("Request to reschedule farm visit for visit id: {}", visitId);
            String username = authentication.getName();

            // Implementation would require additional service method
            // This is a placeholder for the structure

            return ResponseEntity.ok()
                    .body(new ApiResponse<>(
                            HttpStatus.OK,
                            "visit notes updated",
                            farmvisitService.rescheduleFarmVisit(visitId,request)));

//            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
//                    .body("Reschedule farm visit not yet implemented");

        } catch (Exception e) {
            log.error("Error rescheduling farm visit: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}