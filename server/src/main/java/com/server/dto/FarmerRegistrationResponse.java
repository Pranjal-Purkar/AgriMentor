package com.server.dto;

import com.server.enumeration.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FarmerRegistrationResponse {
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private Role role;
}
