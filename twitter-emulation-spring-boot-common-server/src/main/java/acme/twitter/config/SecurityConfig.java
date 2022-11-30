package acme.twitter.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import javax.sql.DataSource;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final DataSource dataSource;

    @Autowired
    public SecurityConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

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
                );

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(antMatcher("/*.js"));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("select username, password, 'true' as enabled from account where username = ?")
                .authoritiesByUsernameQuery("select username, 'ROLE_USER' as authority from account where username = ?")
                .groupAuthoritiesByUsername("select 1 as id, 'GROUP_NAME' as group_name, 'ROLE_USER' as authority from account where username = ?")
                .passwordEncoder(NoOpPasswordEncoder.getInstance());
    }
}
