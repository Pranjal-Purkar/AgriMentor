package com.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.server.util.JwtFilterChain;

@Configuration
public class SecurityConfig implements WebMvcConfigurer{
	@Autowired
	private JwtFilterChain jwtFilterChain;
	
//	@Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf(csrf -> csrf.disable())
//            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/api/v1/auth/**").permitAll()
//                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
//                .requestMatchers("/api/v1/user/**").hasAnyRole("USER", "ADMIN")
//                .requestMatchers("/api/v1/farmers/**").hasAnyRole("FARMER", "ADMIN")
//                .anyRequest().authenticated()
//            )
//            .addFilterBefore(jwtFilterChain, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
	
	
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	        .csrf(csrf -> csrf.disable())
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        .authorizeHttpRequests(auth -> auth
	            // Allow old v1 APIs
	            .requestMatchers("/api/v1/auth/**").permitAll()

	            // ⭐ Allow your actual AuthController endpoints
	            .requestMatchers(
	            	    "/api/v1/auth/send-otp/**",
	            	    "/api/v1/auth/verify-otp",           // ✔ correct path
	            	    "/api/v1/auth/ForgotPassword/**",
	            	    "/api/v1/auth/forgot-password/reset",
	            	    "/api/v1/auth/register/**",
	            	    "/api/v1/auth/login"
	            	).permitAll()


	            // Role-based protected APIs
	            .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
	            .requestMatchers("/api/v1/user/**").hasAnyRole("USER", "ADMIN")
	            .requestMatchers("/api/v1/farmers/**").hasAnyRole("FARMER", "ADMIN")

	            // All others require authentication
	            .anyRequest().authenticated()
	        )

	        // ⭐ KEEP THIS EXACTLY where it is
	        .addFilterBefore(jwtFilterChain, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}

	
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
		
	}
}
