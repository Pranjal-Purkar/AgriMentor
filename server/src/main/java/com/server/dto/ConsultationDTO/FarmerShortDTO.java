package com.server.dto.ConsultationDTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FarmerShortDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;

    private String soilType;     // nullable allowed
}

