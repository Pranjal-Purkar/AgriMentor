package com.server.dto;

import com.server.entity.Address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FarmerDTO extends FarmerRegistrationResponse {
	private Address address;
	private Boolean isActive;
	private Double farmAreaHectares;
}
