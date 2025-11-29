package com.server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.service.ConsultantService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/consultants")
@Slf4j
public class ConsultantController {
	private ConsultantService consultantService;
}
