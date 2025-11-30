package com.server.dto.ConsultationDTO;

import com.server.dto.AddressDTO;
import com.server.entity.ConsultationReport;
import com.server.entity.Crop;
import com.server.entity.Farmvisit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationDetailsDTO {

    private Long id;
    private String topic;
    private String description;
    private String consultationRequestStatus;

    private FarmerShortDTO farmer;
    private ConsultantShortDTO consultant;
    private Farmvisit farmvisit;
    private List<ConsultationReport> consultationReport;
    private Crop crop;
    private AddressDTO farmAddress;
}