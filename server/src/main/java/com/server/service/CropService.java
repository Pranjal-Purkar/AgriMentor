package com.server.service;

import com.server.entity.Crop;
import com.server.repository.CropRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class CropService {
    @Autowired
    private CropRepository cropRepository;

    public Optional<Crop> save(Crop crop) {
        log.info("Saving crop: {}", crop);
        return Optional.of(cropRepository.save(crop));
    }
}
