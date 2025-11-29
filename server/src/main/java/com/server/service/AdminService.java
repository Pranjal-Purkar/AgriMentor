package com.server.service;

import com.server.repository.AdminRepository;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private ConsultantService consultantService;

    public boolean rejectConsultant(String username) {
        try {
             
            if (!consultantService.deleteConsultant(username)) {
                log.error("Failed to delete consultant with username: {}", username);
                return false;
            }

            String emailBody = "Dear " + username + ",\n\n" +
                    "We regret to inform you that your consultant application has been rejected.\n" +
                    "For further details, please contact our support team. and  Register Again\n\n" +
                    "Best regards,\n" +
                    "The Admin Team";
            emailService.sendEmail( "Consultant Application Rejected", emailBody);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
