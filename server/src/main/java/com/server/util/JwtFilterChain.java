package com.server.util;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.server.entity.User;
import com.server.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtFilterChain extends OncePerRequestFilter {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			log.info("Inside JwtFilterChain");
			log.info("Request URI: {}", request.getRequestURI());
			String authorizationHeader = request.getHeader("Authorization");
			log.info("Authorization Header: {}", authorizationHeader);
			if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
				log.info("Missing or invalid Authorization header");
				filterChain.doFilter(request, response);
				return;
			}
			String token = authorizationHeader.split("Bearer")[1].trim();
			log.info("Extracted Token: {}", token);
			String username = jwtUtil.getUsernameFromToken(token);
			String role = jwtUtil.getRoleFromToken(token);

			if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

//			    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				User user = userRepository.findByEmail(username).orElse(null);
				log.info("User fetched from DB: {}", user);
				Collection<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
				log.info("Authorities: {}", authorities);
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null,
						authorities);
				log.info("Authentication Token: {}", authToken);
				SecurityContextHolder.getContext().setAuthentication(authToken);
				log.info("Security Context updated with authentication");
			}
			log.info("Proceeding with filter chain");
			filterChain.doFilter(request, response);

		} catch (Exception e) {
			log.error("Error in JwtFilterChain: {}", e.getMessage());
			filterChain.doFilter(request, response);
		}
		
		/*
		 * } catch (JwtException e) {
	        // Handle JWT-specific exceptions (invalid token, malformed token, etc.)
	        log.error("JWT Token error: {}", e.getMessage());
	        ApiErrorRespomse errorResponse = new ApiErrorRespomse(
	                "Invalid or expired JWT token",
	                new Date(),
	                e.getMessage(),
	                HttpStatus.UNAUTHORIZED
	        );
	        writeErrorResponse(response, errorResponse);
	    } catch (UsernameNotFoundException e) {
	        // Handle cases where the user is not found in the database
	        log.error("User not found: {}", e.getMessage());
	        ApiErrorRespomse errorResponse = new ApiErrorRespomse(
	                "User not found",
	                new Date(),
	                e.getMessage(),
	                HttpStatus.UNAUTHORIZED
	        );
	        writeErrorResponse(response, errorResponse);
	    } catch (Exception e) {
	        // Handle any other generic exceptions
	        log.error("Unexpected error: {}", e.getMessage());
	        ApiErrorRespomse errorResponse = new ApiErrorRespomse(
	                "Internal server error",
	                new Date(),
	                e.getMessage(),
	                HttpStatus.INTERNAL_SERVER_ERROR
	        );
	        writeErrorResponse(response, errorResponse);
	    } finally {
	        // Make sure the filter chain is always proceeded with, even if there's an exception
	        filterChain.doFilter(request, response);
	    }
	}

	// Utility method to write the error response in JSON format
		private void writeErrorResponse(HttpServletResponse response, ApiErrorRespomse errorResponse) throws IOException {
			if (response.isCommitted()) {
				log.warn("Response is already committed; cannot write error response");
				return;
			}
			response.reset();
			response.setStatus(errorResponse.getStatusCode().value());
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");

			ObjectMapper objectMapper = new ObjectMapper();
			response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
			response.getWriter().flush();
		}
		 */

	}

}
