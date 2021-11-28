package acme.twitter.controller;

import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import acme.twitter.service.TweetService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
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

@DisplayName("AccountController class tests")
@WebMvcTest(AccountController.class)
class AccountControllerTest {
    private final String CSRF_COOKIE_NAME = "XSRF-TOKEN";

    @Autowired
    private MockMvc mvc;

    @MockBean
    private DataSource dataSource;

    @MockBean
    private AccountService accountService;

    @MockBean
    private TweetService tweetService;

    @MockBean
    private FollowerService followerService;

    @Test
    void whenGetAccount_thenReturnJson() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);

        mvc.perform(get("/api/account/accounts/jsmith")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("jsmith")));
        Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsername("jsmith");
        Mockito.reset(accountService);
    }

    @Test
    void whenPostAccount_thenCreateAccount() throws Exception {
        AccountDto jsmith = new AccountDto("jsmith", "password", "John Smith");
        CsrfToken csrfToken = new CookieCsrfTokenRepository().generateToken(new MockHttpServletRequest());

        mvc.perform(post("/api/account/accounts")
                        .header(csrfToken.getHeaderName(), csrfToken.getToken())
                        .cookie(new Cookie(CSRF_COOKIE_NAME, csrfToken.getToken()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(jsmith)))
                .andExpect(status().isOk());
        Mockito.verify(accountService, VerificationModeFactory.times(1)).add("jsmith", "password", "John Smith");
        Mockito.reset(accountService);
    }

    @Test
    void whenPutAccount_thenUpdateAccount() throws Exception {
        AccountDto jsmith = new AccountDto("jsmith", "password", "John Smith");
        CsrfToken csrfToken = new CookieCsrfTokenRepository().generateToken(new MockHttpServletRequest());

        mvc.perform(put("/api/account/accounts/jsmith")
                        .with(user("jsmith"))
                        .header(csrfToken.getHeaderName(), csrfToken.getToken())
                        .cookie(new Cookie(CSRF_COOKIE_NAME, csrfToken.getToken()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(jsmith)))
                .andExpect(status().isOk());
        Mockito.verify(accountService, VerificationModeFactory.times(1)).update("jsmith", "password", "John Smith");
        Mockito.reset(accountService);
    }

    @Test
    void whenDeleteAccount_thenDeleteAccount() throws Exception {
        CsrfToken csrfToken = new CookieCsrfTokenRepository().generateToken(new MockHttpServletRequest());

        mvc.perform(delete("/api/account/accounts/jsmith")
                        .with(user("jsmith"))
                        .header(csrfToken.getHeaderName(), csrfToken.getToken())
                        .cookie(new Cookie(CSRF_COOKIE_NAME, csrfToken.getToken()))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        Mockito.verify(accountService, VerificationModeFactory.times(1)).delete("jsmith");
        Mockito.reset(accountService);
    }

    @Test
    void whenValidPart_thenAccountsShouldBeFound() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account jdoe = new Account(2, "jdoe", "password", "John Doe");
        BDDMockito.given(accountService.findByUsernamePart("j")).willReturn(Arrays.asList(jsmith, jdoe));

        mvc.perform(get("/api/account/accounts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("usernamePart", "j"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].username", is("jsmith")))
                .andExpect(jsonPath("$[1].username", is("jdoe")));
        Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsernamePart("j");
        Mockito.reset(accountService);
    }

    @Test
    void whenInvalidPart_thenAccountsShouldNotBeFound() throws Exception {
        BDDMockito.given(accountService.findByUsernamePart("unknown")).willReturn(Collections.emptyList());

        mvc.perform(get("/api/account/accounts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("usernamePart", "unknown"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
        Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsernamePart("unknown");
        Mockito.reset(accountService);
    }

    @Test
    void whenGetStatistics_thenReturnJson() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);
        BDDMockito.given(tweetService.countByUsername("jsmith")).willReturn(6);
        BDDMockito.given(followerService.countFollowingByUsername("jsmith")).willReturn(2);
        BDDMockito.given(followerService.countFollowersByUsername("jsmith")).willReturn(1);
        BDDMockito.given(followerService.isExist("jsmith", "jsmith")).willReturn(false);

        mvc.perform(get("/api/account/statistics/jsmith")
                        .with(user("jsmith"))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("jsmith")))
                .andExpect(jsonPath("$.description", is("John Smith")))
                .andExpect(jsonPath("$.tweetsCount", is(6)))
                .andExpect(jsonPath("$.followingCount", is(2)))
                .andExpect(jsonPath("$.followersCount", is(1)))
                .andExpect(jsonPath("$.follow", is(false)));
        Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsername("jsmith");
        Mockito.verify(tweetService, VerificationModeFactory.times(1)).countByUsername("jsmith");
        Mockito.verify(followerService, VerificationModeFactory.times(1)).countFollowingByUsername("jsmith");
        Mockito.verify(followerService, VerificationModeFactory.times(1)).countFollowersByUsername("jsmith");
        Mockito.verify(followerService, VerificationModeFactory.times(1)).isExist("jsmith", "jsmith");
        Mockito.reset(accountService);
        Mockito.reset(tweetService);
        Mockito.reset(followerService);
    }
}
