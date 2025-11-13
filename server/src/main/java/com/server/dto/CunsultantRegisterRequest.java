package com.server.dto;

import com.server.enumeration.Role;
import com.server.enumeration.VerificationStatus;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CunsultantRegisterRequest {
	private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private Role role;
    private String expertiseArea;
    private int experienceYears;
    private String qualifications;
    private VerificationStatus verificationStatus;
    
}
