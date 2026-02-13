package acme.twitter;

import acme.twitter.dto.AccountDto;
import acme.twitter.util.JsonUtil;
import acme.twitter.util.TestUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;
import java.sql.SQLException;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayName("AccountController class integration tests")
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = App.class)
@AutoConfigureMockMvc
@ActiveProfiles("development")
class AccountControllerIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private DataSource dataSource;

    @AfterEach
    void tearDown() throws SQLException {
        TestUtils.executeSqlScript(dataSource.getConnection(), "/clean-h2.sql");
        TestUtils.executeSqlScript(dataSource.getConnection(), "/data-h2.sql");
    }

    @Test
    void whenGetAccount_thenReturnJson() throws Exception {
        mvc.perform(get("/api/account/accounts/jsmith")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username", is("jsmith")));
    }

    @Test
    void whenPostAccount_thenCreateAccount() throws Exception {
        AccountDto jsmith = new AccountDto(0, "user", "password", "User");

        mvc.perform(post("/api/account/accounts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(jsmith))
                        .with(csrf())
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void whenPutAccount_thenUpdateAccount() throws Exception {
        AccountDto jsmith = new AccountDto(0, "jsmith", "password", "John Smith");

        mvc.perform(put("/api/account/accounts/jsmith")
                        .with(user("jsmith"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JsonUtil.toJson(jsmith))
                        .with(csrf())
                )
                .andDo(print())
                .andExpect(status().isOk());
    }
}
