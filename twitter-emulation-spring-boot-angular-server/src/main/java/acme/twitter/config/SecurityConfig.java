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

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private DataSource dataSource;

    @Autowired
    public SecurityConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //TODO: uncomment
        http
            .formLogin()
                .loginPage("/login")
            .and()
//            .logout()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // Support GET for logout with CSRF
//            .and()
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/index.html", "/", "/home", "/login").permitAll()
//                .antMatchers("/login").permitAll()
//                .antMatchers("/account/register").permitAll()
//                .antMatchers("/account/show").authenticated()
//                .antMatchers("/account/show/**").permitAll()
//                .antMatchers("/account/tweets/**").permitAll()
//                .antMatchers("/account/following/**").permitAll()
//                .antMatchers("/account/followers/**").permitAll()
//                .antMatchers("/css/**").permitAll()
//                .antMatchers("/h2-console/**").permitAll()  // Allow H2 Database Console
                .anyRequest().authenticated()
                .and()
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

        // Allow H2 Database Console, http://localhost:8080/h2-console
//        http.csrf().disable();
//        http.headers().frameOptions().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("*.bundle.*");
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
