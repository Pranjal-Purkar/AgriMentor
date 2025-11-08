package com.server.entity;

import jakarta.persistence.Entity;

@Entity
public class Farmer extends User{
    private String location;
    private Integer farm_size;
    private String crop;
    
}
