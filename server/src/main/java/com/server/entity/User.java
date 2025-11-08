package com.server.entity;

import jakarta.persistence.*;

@Entity
public class User {
   @Id
   @GeneratedValue(strategy=GenerationType.AUTO)
   private Integer Id;
   private String name;
   private String email;
   private String password;
   
}
