package acme.twitter.controller;

import acme.twitter.config.SecurityConfig;
import acme.twitter.dao.exception.AccountNotAllowedException;
import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import acme.twitter.service.TweetService;
import acme.twitter.util.JsonUtil;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.params.provider.Arguments.arguments;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("AccountController class tests")
@WebMvcTest(AccountController.class)
@Import(SecurityConfig.class)
class AccountControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private DataSource dataSource;

    @MockitoBean
    private AccountService accountService;

    @MockitoBean
    private TweetService tweetService;

    @MockitoBean
    private FollowerService followerService;

    @Nested
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    @DisplayName("getAccount method tests")
    class GetAccountTest {
        private Stream<Arguments> data() {
            return Stream.of(
                    arguments("jsmith", null, null),
                    arguments("jsmith", "jdoe", null),
                    arguments("jsmith", "jsmith", "password")
            );
        }

        @ParameterizedTest
        @MethodSource("data")
        void getAccount(String username, String principalUsername, String expectedPassword) throws Exception {
            Account jsmith = new Account(1, "jsmith", "password", "John Smith");
            BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);

            MockHttpServletRequestBuilder requestBuilder = get(String.format("/api/account/accounts/%s", username))
                    .contentType(MediaType.APPLICATION_JSON);
            if (principalUsername != null) {
                requestBuilder.with(user(principalUsername));
            }

            ResultActions resultActions = mvc.perform(requestBuilder)
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.username", is("jsmith")));
            if (expectedPassword != null) {
                resultActions
                        .andExpect(jsonPath("$.password", is(expectedPassword)));
            } else {
                resultActions
                        .andExpect(jsonPath("$.password").doesNotExist());
            }
            Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsername("jsmith");
            Mockito.reset(accountService);
        }
    }

    @Test
    void whenPostAccount_thenCreateAccount() throws Exception {
        AccountDto jsmith = new AccountDto(0, "jsmith", "password", "John Smith");

        mvc.perform(post("/api/account/accounts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(jsmith))
                        .with(csrf())
                )
                .andExpect(status().isOk());
        Mockito.verify(accountService, VerificationModeFactory.times(1)).add("jsmith", "password", "John Smith");
        Mockito.reset(accountService);
    }

    @Nested
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    @DisplayName("replaceAccount method tests")
    class ReplaceAccountTest {
        private Stream<Arguments> data() {
            return Stream.of(
                    arguments("jsmith", "jsmith", null),
                    arguments("jdoe", null, AccountNotAllowedException.class),
                    arguments("jdoe", "jsmith", AccountNotAllowedException.class),
                    arguments("jsmith", "jdoe", AccountNotAllowedException.class)
            );
        }

        @ParameterizedTest
        @MethodSource("data")
        void replaceAccount(String username, String principalUsername, Class<Exception> expectedException) throws Exception {
            AccountDto jsmith = new AccountDto(0, "jsmith", "password", "John Smith");

            MockHttpServletRequestBuilder requestBuilder = put(String.format("/api/account/accounts/%s", username))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(JsonUtil.toJson(jsmith))
                    .with(csrf());
            if (principalUsername != null) {
                requestBuilder.with(user(principalUsername));
            }

            if (expectedException == null) {
                mvc.perform(requestBuilder)
                        .andExpect(status().isOk());
                Mockito.verify(accountService, VerificationModeFactory.times(1)).update("jsmith", "password", "John Smith");
                Mockito.reset(accountService);
            } else {
                assertThatThrownBy(() -> mvc.perform(requestBuilder))
                        .hasCauseInstanceOf(expectedException);
            }
        }
    }

    @Nested
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    @DisplayName("deleteAccount method tests")
    class DeleteAccountTest {
        private Stream<Arguments> data() {
            return Stream.of(
                    arguments("jsmith", "jsmith", null),
                    arguments("jsmith", "jdoe", AccountNotAllowedException.class)
            );
        }

        @ParameterizedTest
        @MethodSource("data")
        void deleteAccount(String username, String principalUsername, Class<Exception> expectedException) throws Exception {
            MockHttpServletRequestBuilder requestBuilder = delete(String.format("/api/account/accounts/%s", username))
                    .with(user(principalUsername))
                    .contentType(MediaType.APPLICATION_JSON)
                    .with(csrf());

            if (expectedException == null) {
                mvc.perform(requestBuilder)
                        .andExpect(status().isOk());
                Mockito.verify(accountService, VerificationModeFactory.times(1)).delete("jsmith");
                Mockito.reset(accountService);
            } else {
                assertThatThrownBy(() -> mvc.perform(requestBuilder))
                        .hasCauseInstanceOf(expectedException);
            }
        }
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

    @Nested
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    @DisplayName("getStatistics method tests")
    class GetStatisticsTest {
        private Stream<Arguments> data() {
            return Stream.of(
                    arguments("jsmith", false),
                    arguments(null, false),
                    arguments("jdoe", true)
            );
        }

        @ParameterizedTest
        @MethodSource("data")
        void getStatistics(String principalUsername, boolean expected) throws Exception {
            Account jsmith = new Account(1, "jsmith", "password", "John Smith");
            BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);
            BDDMockito.given(tweetService.countByUsername("jsmith")).willReturn(6);
            BDDMockito.given(followerService.countFollowingByUsername("jsmith")).willReturn(2);
            BDDMockito.given(followerService.countFollowersByUsername("jsmith")).willReturn(1);
            BDDMockito.given(followerService.isExist("jsmith", "jsmith")).willReturn(false);
            BDDMockito.given(followerService.isExist("jdoe", "jsmith")).willReturn(true);

            MockHttpServletRequestBuilder requestBuilder = get("/api/account/statistics/jsmith")
                    .contentType(MediaType.APPLICATION_JSON);

            if (principalUsername != null) {
                requestBuilder.with(user(principalUsername));
            }

            mvc.perform(requestBuilder)
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.username", is("jsmith")))
                    .andExpect(jsonPath("$.description", is("John Smith")))
                    .andExpect(jsonPath("$.tweetsCount", is(6)))
                    .andExpect(jsonPath("$.followingCount", is(2)))
                    .andExpect(jsonPath("$.followersCount", is(1)))
                    .andExpect(jsonPath("$.follow", is(expected)));
            Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsername("jsmith");
            Mockito.verify(tweetService, VerificationModeFactory.times(1)).countByUsername("jsmith");
            Mockito.verify(followerService, VerificationModeFactory.times(1)).countFollowingByUsername("jsmith");
            Mockito.verify(followerService, VerificationModeFactory.times(1)).countFollowersByUsername("jsmith");
            Mockito.verify(followerService, VerificationModeFactory.times(1)).isExist(
                    (principalUsername != null) ? principalUsername : "jsmith", "jsmith");
            Mockito.reset(accountService);
            Mockito.reset(tweetService);
            Mockito.reset(followerService);
        }
    }
}
