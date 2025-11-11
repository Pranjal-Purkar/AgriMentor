package com.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
      
}
