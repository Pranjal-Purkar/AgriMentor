package com.server.entity;

import com.server.enumeration.Role;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
   @Id
   @GeneratedValue(strategy=GenerationType.AUTO)
   private Integer Id;
   private String name;
   private String email;
   private String password;
   private Role role;
   
   
}
