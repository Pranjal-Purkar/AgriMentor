package com.server.dto.ConsultationDTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsultantShortDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;

    private String expertiseArea;
    private Integer experienceYears;
    private String qualifications;
    private String specialization;
}

