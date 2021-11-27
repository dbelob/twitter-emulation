package acme.twitter.controller;

import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import acme.twitter.service.TweetService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@DisplayName("AccountController class tests")
@WebMvcTest(AccountController.class)
class AccountControllerTest {
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

    @MockBean
    private MessageSourceAccessor messageSourceAccessor;

    @Autowired
    private AccountController controller;

    @Test
    void showRegistrationForm() throws Exception {
        mvc.perform(get("/account/register"))
                .andExpect(view().name("registrationForm"));
    }
}
