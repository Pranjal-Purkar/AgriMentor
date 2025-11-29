package com.server.dto;


import com.server.entity.VerificationDocument;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ConsultantDTO extends ConsultantRegisterResponce {
	private Boolean isVerified;
	private VerificationDocument verificationDocument;
}

