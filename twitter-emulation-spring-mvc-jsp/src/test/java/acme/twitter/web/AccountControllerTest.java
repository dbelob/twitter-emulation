package acme.twitter.web;

import acme.twitter.controller.AccountController;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import acme.twitter.service.TweetService;
import org.junit.Test;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class AccountControllerTest {
    @Test
    public void testLoginPage() throws Exception {
        AccountService accountService = mock(AccountService.class);
        TweetService tweetService = mock(TweetService.class);
        FollowerService followerService = mock(FollowerService.class);
        MessageSourceAccessor messageSourceAccessor = mock(MessageSourceAccessor.class);
        AccountController controller = new AccountController(accountService, tweetService, followerService, messageSourceAccessor);
        MockMvc mockMvc = standaloneSetup(controller).build();

        mockMvc.perform(get("/account/register"))
                .andExpect(view().name("registrationForm"));
    }
}
