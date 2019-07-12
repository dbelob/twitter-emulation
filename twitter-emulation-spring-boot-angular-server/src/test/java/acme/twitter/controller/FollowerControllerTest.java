package acme.twitter.controller;

import acme.twitter.domain.Account;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.servlet.http.Cookie;
import javax.sql.DataSource;
import java.util.Arrays;
import java.util.Collections;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(FollowerController.class)
public class FollowerControllerTest {
    private final String CSRF_COOKIE_NAME = "XSRF-TOKEN";

    @Autowired
    private MockMvc mvc;

    @MockBean
    private DataSource dataSource;

    @MockBean
    private FollowerService followerService;

    @MockBean
    private AccountService accountService;

    @Test
    public void whenGetFollowing_thenReturnJsonArray() throws Exception {
        Account jdoe = new Account(1, "jdoe", "password", "John Doe");
        Account rroe = new Account(2, "rroe", "password", "Richard Roe");

        BDDMockito.given(followerService.findFollowingByUsername("jsmith")).willReturn(Arrays.asList(jdoe, rroe));

        mvc.perform(get("/api/follower/following/jsmith")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].username", is("jdoe")))
                .andExpect(jsonPath("$[1].username", is("rroe")));
        Mockito.verify(followerService, VerificationModeFactory.times(1)).findFollowingByUsername("jsmith");
        Mockito.reset(followerService);
    }

    @Test
    public void whenGetFollowers_thenReturnJsonArray() throws Exception {
        Account jdoe = new Account(1, "jdoe", "password", "John Doe");

        BDDMockito.given(followerService.findFollowersByUsername("jsmith")).willReturn(Collections.singletonList(jdoe));

        mvc.perform(get("/api/follower/followers/jsmith")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].username", is("jdoe")));
        Mockito.verify(followerService, VerificationModeFactory.times(1)).findFollowersByUsername("jsmith");
        Mockito.reset(followerService);
    }

    @Test
    public void whenPostFollowing_thenCreateFollowing() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account rroe = new Account(2, "rroe", "password", "Richard Roe");
        CsrfToken csrfToken = new CookieCsrfTokenRepository().generateToken(new MockHttpServletRequest());

        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);
        BDDMockito.given(accountService.findByUsername("rroe")).willReturn(rroe);

        mvc.perform(post("/api/follower/following/rroe")
                .with(user("jsmith"))
                .header(csrfToken.getHeaderName(), csrfToken.getToken())
                .cookie(new Cookie(CSRF_COOKIE_NAME, csrfToken.getToken()))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        Mockito.verify(followerService, VerificationModeFactory.times(1)).add("jsmith", "rroe");
        Mockito.reset(followerService);
    }

    @Test
    public void whenDeleteFollowing_thenDeleteFollowing() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account rroe = new Account(2, "rroe", "password", "Richard Roe");
        CsrfToken csrfToken = new CookieCsrfTokenRepository().generateToken(new MockHttpServletRequest());

        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);
        BDDMockito.given(accountService.findByUsername("rroe")).willReturn(rroe);

        mvc.perform(delete("/api/follower/following/rroe")
                .with(user("jsmith"))
                .header(csrfToken.getHeaderName(), csrfToken.getToken())
                .cookie(new Cookie(CSRF_COOKIE_NAME, csrfToken.getToken()))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        Mockito.verify(followerService, VerificationModeFactory.times(1)).delete("jsmith", "rroe");
        Mockito.reset(followerService);
    }
}
