package acme.twitter.web;

import acme.twitter.data.AccountRepository;
import acme.twitter.data.JdbcAccountRepository;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class AccountControllerTest {
    @Test
    public void testHomePage() throws Exception {
        //TODO: change repository to mock
        AccountRepository accountRepository = new JdbcAccountRepository();
        AccountController controller = new AccountController(accountRepository);
        MockMvc mockMvc = standaloneSetup(controller).build();
        mockMvc.perform(get("/"))
                .andExpect(view().name("login"));
    }
}