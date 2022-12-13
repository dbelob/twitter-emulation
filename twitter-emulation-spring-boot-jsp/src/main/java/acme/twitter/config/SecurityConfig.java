package acme.twitter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .formLogin()
                .loginPage("/login")
                .and()
            .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // Support GET for logout with CSRF
                .and()
            .httpBasic()
                .and()
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(antMatcher("/login")).permitAll()
                .requestMatchers(antMatcher("/account/register")).permitAll()
                .requestMatchers(antMatcher("/account/show")).permitAll()
                .requestMatchers(antMatcher("/account/show/**")).permitAll()
                .requestMatchers(antMatcher("/account/tweets/**")).permitAll()
                .requestMatchers(antMatcher("/account/following/**")).permitAll()
                .requestMatchers(antMatcher("/account/followers/**")).permitAll()
                .requestMatchers(antMatcher("/css/**")).permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(sessions -> sessions
                .requireExplicitAuthenticationStrategy(false)
            );

        return http.build();
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
