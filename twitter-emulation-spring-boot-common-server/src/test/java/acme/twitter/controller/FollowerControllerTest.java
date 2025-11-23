package acme.twitter.controller;

import acme.twitter.config.SecurityConfig;
import acme.twitter.domain.Account;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.Collections;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("FollowerController tests")
@WebMvcTest(FollowerController.class)
@Import(SecurityConfig.class)
class FollowerControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private DataSource dataSource;

    @MockitoBean
    private FollowerService followerService;

    @MockitoBean
    private AccountService accountService;

    @Test
    void whenGetFollowing_thenReturnJsonArray() throws Exception {
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
    void whenGetFollowers_thenReturnJsonArray() throws Exception {
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
    void whenPostFollowing_thenCreateFollowing() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account rroe = new Account(2, "rroe", "password", "Richard Roe");

        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);
        BDDMockito.given(accountService.findByUsername("rroe")).willReturn(rroe);

        mvc.perform(post("/api/follower/following/rroe")
                        .with(user("jsmith"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                )
                .andExpect(status().isOk());
        Mockito.verify(followerService, VerificationModeFactory.times(1)).add("jsmith", "rroe");
        Mockito.reset(followerService);
    }

    @Test
    void whenDeleteFollowing_thenDeleteFollowing() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account rroe = new Account(2, "rroe", "password", "Richard Roe");

        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);
        BDDMockito.given(accountService.findByUsername("rroe")).willReturn(rroe);

        mvc.perform(delete("/api/follower/following/rroe")
                        .with(user("jsmith"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                )
                .andExpect(status().isOk());
        Mockito.verify(followerService, VerificationModeFactory.times(1)).delete("jsmith", "rroe");
        Mockito.reset(followerService);
    }
}
