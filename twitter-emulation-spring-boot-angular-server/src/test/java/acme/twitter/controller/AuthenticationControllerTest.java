package acme.twitter.controller;

import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import acme.twitter.service.TweetService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("AuthenticationController class tests")
@WebMvcTest(AuthenticationController.class)
class AuthenticationControllerTest {
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
    @WithMockUser("jsmith")
    void getUser() throws Exception {
        mvc.perform(get("/api/authentication/user")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("jsmith")));
    }
}
