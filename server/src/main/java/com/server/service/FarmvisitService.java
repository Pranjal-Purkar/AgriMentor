package com.server.service;

import com.server.dto.FarmVisitRequest;
import com.server.entity.Consultation;
import com.server.entity.Farmvisit;
import com.server.enumeration.VisitStatus;
import com.server.repository.FarmvisitRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class FarmvisitService {
    @Autowired
    private FarmvisitRepository farmvisitRepository;
//    @Autowired
//    private ConsultationService consultationService;

    public Optional<Farmvisit> save(Farmvisit farmvisit) {
        return Optional.of(farmvisitRepository.save(farmvisit));
    }

    @Transactional
    public Optional<Farmvisit> scheduleFarmVisit(Consultation consultation, FarmVisitRequest request) {
       log.info("Scheduling farm visit for consultation id: {}", consultation.getId());
        try {
           Farmvisit farmvisit = new Farmvisit();
           farmvisit.setConsultation(consultation);
           farmvisit.setScheduledDate(request.getScheduledDate());
           farmvisit.setVisitNotes(request.getVisitNotes());
           farmvisit.setVisitStatus(request.getVisitStatus() != null ? request.getVisitStatus() : VisitStatus.SCHEDULED);
           farmvisit.setFarmAddress(consultation.getFarmAddress());
           log.info("Created farm visit entity: {}", farmvisit);
           farmvisit = this.save(farmvisit).orElseThrow(() -> new RuntimeException("Failed to save farm visit"));
           log.info("Farm visit scheduled successfully for consultation id: {}", consultation.getId());
           return Optional.ofNullable(farmvisit);
       } catch (Exception e) {
              log.error("Error scheduling farm visit for consultation id: {}", consultation.getId(), e);
                throw new RuntimeException(e.getMessage());
       }
    }

    public Optional<Farmvisit> getFarvisitByConsultationId(String username, Long consultationId) {
        log.info("Fetching farm visit for consultation id: {} by user: {}", consultationId, username);
        try {
            return farmvisitRepository.findByConsultationIdAndConsultationConsultantEmail(consultationId, username);
        } catch (Exception e) {
            log.error("Error fetching farm visit for consultation id: {} by user: {}", consultationId, username, e);
            throw new RuntimeException(e.getMessage());
        }
    }


}
