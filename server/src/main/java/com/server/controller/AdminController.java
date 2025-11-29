package com.server.controller;

import com.server.response.ApiResponse;
import com.server.service.AdminService;
import com.server.service.ConsultantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private ConsultantService consultantService;

    @GetMapping("/all/consultants")
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

    @PostMapping
    public ResponseEntity<?> verifyConsultant(@PathVariable String username) {
        log.info("Verifying consultant with username: {}", username);
        try {
            if(!consultantService.verifyConsultant(username)) {
                log.error("Consultant verification failed for username: {}", username);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, "Consultant verification failed"));
            }
            log.info("Consultant verified successfully");
            return ResponseEntity.ok().body(
                    new ApiResponse<>(HttpStatus.OK, "Consultant verified successfully")
            );
        } catch (Exception e) {
            log.error("Error verifying consultant", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, e.getLocalizedMessage()));
        }
    }

}
