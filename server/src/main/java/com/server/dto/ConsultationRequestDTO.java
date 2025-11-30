package com.server.dto;

import com.server.entity.Crop;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationRequestDTO {
    private String topic;
    private String description;
    private String consultantEmail;
    private Crop crop;
    private AddressDTO farmAddress;
    private Boolean useExistingAddress;
}
