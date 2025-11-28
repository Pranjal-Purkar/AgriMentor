package com.server.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {
	  private String email;
	    private String otp;
	    private String newPassword;

	   // ⭐ You MUST add getters + setters
	    public String getEmail() {
	        return email;
	    }

	    public void setEmail(String email) {
	        this.email = email;
	    }

	    public String getOtp() {
	        return otp;
	    }

	    public void setOtp(String otp) {
	        this.otp = otp;
	    }

	    public String getNewPassword() {
	        return newPassword;
	    }

	    public void setNewPassword(String newPassword) {
	        this.newPassword = newPassword;
	    }
	
}
