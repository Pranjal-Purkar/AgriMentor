package com.server.entity;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Value;
import com.server.enumeration.VerificationStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Consultant extends User {
	    private String expertiseArea;
	    private int experienceYears;
	    private String qualifications;
	    @Enumerated(EnumType.STRING)
	    private VerificationStatus verificationStatus;
	    private LocalDateTime verifiedAt;
	    @Value("true")
	    private Boolean isActive;
	    private LocalDateTime createdAt;
}
    

