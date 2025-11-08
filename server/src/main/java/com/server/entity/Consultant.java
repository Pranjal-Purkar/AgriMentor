package com.server.entity;

import jakarta.persistence.Entity;

@Entity
public class Consultant extends User {
    private String degree;
    private Integer experience;
    private Boolean isVerified;
    private Boolean isActive;
    
}
