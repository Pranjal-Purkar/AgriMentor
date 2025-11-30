package com.server.dto.ConsultationDTO;

import com.server.dto.AddressDTO;
import com.server.entity.Crop;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ConsultationResponseDTO {
    private Long id;

    private String topic;
    private String description;
    private String consultationRequestStatus;

//    private FarmerShortDTO farmer;          // Farmer basic info
//    private ConsultantShortDTO consultant;  // Consultant basic info
    private Crop crop;                   // Crop info

    private AddressDTO farmAddress;         // Farm address DTO

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
}
