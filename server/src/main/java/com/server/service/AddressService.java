package com.server.service;

import com.server.entity.Address;
import com.server.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public Optional<Address> save(Address address) {
        return Optional.of(addressRepository.save(address));
    }
}
