package com.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
public class UserProfilePicture  {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String filePath;
	    private String fileName;
	    private String fileType;
	    private Long fileSize;
	    private Boolean isActive;
	    private LocalDateTime uploadedAt;
}
