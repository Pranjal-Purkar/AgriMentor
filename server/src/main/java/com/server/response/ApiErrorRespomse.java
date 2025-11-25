package com.server.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiErrorRespomse {
	 private String message;
	    private Date timestamp;
	    private String details;
        private HttpStatus statusCode;

}
