package com.server.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConsultantDTO  {
	 private String expertiseArea;
	    private Integer experienceYears;
	    private String qualifications;
	    private String verificationStatus;
}

