package acme.twitter.admin;

import de.codecentric.boot.admin.server.config.AdminServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
public class SecurityConfig {
    private final String adminContextPath;

    public SecurityConfig(AdminServerProperties adminServerProperties) {
        this.adminContextPath = adminServerProperties.getContextPath();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
        successHandler.setTargetUrlParameter("redirectTo");
        successHandler.setDefaultTargetUrl(adminContextPath + "/");

        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(adminContextPath + "/assets/**", // <1>
                            adminContextPath + "/login").permitAll()
                        .anyRequest().authenticated() // <2>
                )
                .formLogin().loginPage(adminContextPath + "/login").successHandler(successHandler)
                    .and() // <3>
                .logout().logoutUrl(adminContextPath + "/logout")
                    .and()
                .httpBasic()
                    .and() // <4>
                .csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) // <5>
                    .ignoringRequestMatchers(
                            adminContextPath + "/instances", // <6>
                            adminContextPath + "/actuator/**" // <7>
                    )
                    .and()
                .sessionManagement(sessions -> sessions
                    .requireExplicitAuthenticationStrategy(false)
                );

        return http.build();
    }
}
