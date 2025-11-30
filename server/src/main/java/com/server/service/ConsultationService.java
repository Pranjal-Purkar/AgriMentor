package com.server.service;

import com.server.dto.ConsultationRequestDTO;
import com.server.entity.*;
import com.server.enumeration.ConsultationRequestStatus;
import com.server.repository.ConsultationRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ConsultationService {
    @Autowired
    private ConsultationRepository consultationRepository;
    @Autowired
    private AddressService addressService;

    @Autowired
    private ConsultantService consultantService;
    @Autowired
    private CropService cropService;

    @Transactional
    public Optional<Consultation> createConsultationRequest(
            Farmer farmer,
            ConsultationRequestDTO request
    ) {
        log.info("Creating consultation request for farmer: {}", farmer.getEmail());

        // 1. Find consultant using email (NOT ID)
        Consultant consultant = consultantService.getConsultantByUsername(request.getConsultantEmail())
                .orElseThrow(() ->
                        new RuntimeException("Consultant not found with username: " + request.getConsultantEmail())
                );

        log.info("Found consultant: {}", consultant.getEmail());

        // 2. Save or get crop
        Crop crop = new Crop();
        crop.setName(request.getCrop().getName());
        crop.setCategory(null);
        crop.setType(null);
        crop.setDescription(null);
        crop.setCreatedAt(LocalDateTime.now());
        crop = cropService.save(crop)
                .orElseThrow(() -> new RuntimeException("Failed to save or fetch crop"));
        /*

         */
        log.info("Crop linked to consultation: {}", crop.getName());

        // 3. Create Address (Farm Address)
        Address address;
        if(!request.getUseExistingAddress()){
            log.info("Creating new farm address for consultation");
            address = new Address();
            address.setStreet(request.getFarmAddress().getStreet());
            address.setCity(request.getFarmAddress().getCity());
            address.setState(request.getFarmAddress().getState());
            address.setPinCode(request.getFarmAddress().getPinCode());
            address.setCountry(request.getFarmAddress().getCountry());
            address.setLatitude(request.getFarmAddress().getLatitude());
            address.setLongitude(request.getFarmAddress().getLongitude());
        }else{
            log.info("Using existing farm address for consultation");
            address = farmer.getAddress();
        }
        // Persist address manually (otherwise it will not save)
        Address savedAddress = addressService.save(address).orElseThrow(() -> new RuntimeException("Failed to save or fetch Address"));
        log.info("Saved farm address: {}", savedAddress.getId());

        // 4. Build Consultation Entity
        Consultation consultation = new Consultation();
        consultation.setFarmer(farmer);
        consultation.setConsultant(consultant);
        consultation.setCrop(crop);
        consultation.setFarmAddress(savedAddress);
        consultation.setTopic(request.getTopic());
        consultation.setDescription(request.getDescription());
        consultation.setConsultationRequestStatus(ConsultationRequestStatus.PENDING);
        consultation.setCreatedAt(LocalDateTime.now());
        consultation.setUpdatedAt(LocalDateTime.now());

        Consultation savedConsultation = consultationRepository.save(consultation);
        log.info("Consultation request created with id: {}", savedConsultation.getId());

        return Optional.of(savedConsultation);
    }

    public List<Consultation> getConsultationsByFarmer(Farmer farmer) {
        log.info("Fetching consultations for farmer: {}", farmer.getEmail());
        return consultationRepository.findByFarmerId(farmer.getId());
    }
}
