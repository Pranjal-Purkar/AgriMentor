package com.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	@Autowired
    private UserService userService;
	
	
	@PostMapping("/register")
	public void registerUser() {
	 	 userService.registerUser();
	  }
}
