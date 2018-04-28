package acme.twitter.web;

import acme.twitter.data.AccountRepository;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class AccountControllerTest {
    @Test
    public void testLoginPage() throws Exception {
        AccountRepository accountRepository = mock(AccountRepository.class);
        AccountController controller = new AccountController(accountRepository);
        MockMvc mockMvc = standaloneSetup(controller).build();

        mockMvc.perform(get("/account/login"))
                .andExpect(view().name("loginForm"));
    }
}