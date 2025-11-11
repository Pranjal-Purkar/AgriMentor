package com.server.entity;

import jakarta.persistence.*; 

import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data 
public class Farmer extends User{
    private Double farmAreaHectares;
    private String preferredLanguage;
    private LocalDateTime createdAt;

}
