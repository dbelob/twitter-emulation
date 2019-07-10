package acme.twitter.controller;

import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import acme.twitter.service.AccountService;
import acme.twitter.service.FollowerService;
import acme.twitter.service.TweetService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(AccountController.class)
public class AccountControllerTest {
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
    public void whenGetAccount_thenReturnJson() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);

        mvc.perform(get("/api/account/accounts/jsmith")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("jsmith")));
        Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsername("jsmith");
        Mockito.reset(accountService);
    }

//    @Test
    public void whenPostAccount_thenCreateAccount() throws Exception {
        AccountDto jsmith = new AccountDto("jsmith", "password", "John Smith");

        mvc.perform(post("/api/account/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.toJson(jsmith)))
                .andExpect(status().isOk());
        Mockito.verify(accountService, VerificationModeFactory.times(1)).add("jsmith", "password", "John Smith");
        Mockito.reset(accountService);
    }
}
