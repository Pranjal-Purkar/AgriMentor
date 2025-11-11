package com.server.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Data
public class Admin extends User {
	    private String assignedRegion;
	    private LocalDateTime createdAt;
}
