package acme.twitter.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import javax.sql.DataSource;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .httpBasic()
                .and()
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(antMatcher("/index.html"), antMatcher("/"), antMatcher("/login")).permitAll()
                .requestMatchers(antMatcher("/api/account/accounts/**")).permitAll()
                .requestMatchers(antMatcher("/api/account/statistics/**")).permitAll()
                .requestMatchers(antMatcher("/api/authentication/user")).permitAll()
                .requestMatchers(antMatcher("/api/follower/following/**")).permitAll()
                .requestMatchers(antMatcher("/api/follower/followers/**")).permitAll()
                .requestMatchers(antMatcher("/api/tweet/tweets/**")).permitAll()
                .anyRequest().authenticated()
            )
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
            .logout(logout -> logout
                .logoutUrl("/api/authentication/logout")
                .logoutSuccessHandler((request, response, authentication) ->
                        response.setStatus(HttpServletResponse.SC_OK))
            )
            .sessionManagement(sessions -> sessions
                .requireExplicitAuthenticationStrategy(false)
            );

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(antMatcher("/*.js"));
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public UserDetailsManager users(DataSource dataSource) {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);

        userDetailsManager.setUsersByUsernameQuery("select username, password, 'true' as enabled from account where username = ?");
        userDetailsManager.setAuthoritiesByUsernameQuery("select username, 'ROLE_USER' as authority from account where username = ?");
        userDetailsManager.setGroupAuthoritiesByUsernameQuery("select 1 as id, 'GROUP_NAME' as group_name, 'ROLE_USER' as authority from account where username = ?");

        return userDetailsManager;
    }
}
