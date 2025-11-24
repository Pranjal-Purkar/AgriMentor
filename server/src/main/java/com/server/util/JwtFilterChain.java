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
			if (authorizationHeader == null && !authorizationHeader.startsWith("Bearer ")) {
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

				Collection<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user, null,
						authorities);

				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
			filterChain.doFilter(request, response);

		} catch (Exception e) {
			log.error("Error in JwtFilterChain: {}", e.getMessage());
			filterChain.doFilter(request, response);
		}

	}

}
