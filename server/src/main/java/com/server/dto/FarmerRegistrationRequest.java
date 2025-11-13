package com.server.dto;

import com.server.enumeration.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FarmerRegistrationRequest {
	private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private Role role;
}
