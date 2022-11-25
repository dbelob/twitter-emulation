package acme.twitter.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import jakarta.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final DataSource dataSource;

    @Autowired
    public SecurityConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic()
                    .and()
                .authorizeRequests()
                    .antMatchers("/index.html", "/", "/login").permitAll()
                    .antMatchers("/api/account/accounts/**").permitAll()
                    .antMatchers("/api/account/statistics/**").permitAll()
                    .antMatchers("/api/authentication/user").permitAll()
                    .antMatchers("/api/follower/following/**").permitAll()
                    .antMatchers("/api/follower/followers/**").permitAll()
                    .antMatchers("/api/tweet/tweets/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                    .and()
                .logout(logout -> logout
                        .logoutUrl("/api/authentication/logout")
                        .logoutSuccessHandler((request, response, authentication) ->
                                response.setStatus(HttpServletResponse.SC_OK))
                );
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/*.js");
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
