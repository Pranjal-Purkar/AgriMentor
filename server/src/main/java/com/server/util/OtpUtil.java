package com.server.util;

import java.security.SecureRandom;

public class OtpUtil {
	 private static final SecureRandom random = new SecureRandom();

	    public static String generateOtp(int digits){
	        int bound = (int) Math.pow(10, digits);
	        int num = random.nextInt(bound - bound/10) + bound/10;
	        return String.valueOf(num);
	    }
}
