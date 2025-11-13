package com.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Farmer extends User{
	
	@Value("50.0")
    private Double farmAreaHectares;
	@Value("Unknown")
    private String preferredLanguage;
	@CreatedDate
    private LocalDateTime createdAt;
	
}
