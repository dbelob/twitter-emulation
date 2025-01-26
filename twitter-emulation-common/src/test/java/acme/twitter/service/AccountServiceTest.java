package acme.twitter.service;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.FollowerDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DisplayName("AccountService class tests")
@ExtendWith(SpringExtension.class)
class AccountServiceTest {
    @TestConfiguration
    static class AccountServiceTestContextConfiguration {
        @Bean
        public AccountDao accountDao() {
            return Mockito.mock(AccountDao.class);
        }

        @Bean
        public TweetDao tweetDao() {
            return Mockito.mock(TweetDao.class);
        }

        @Bean
        public FollowerDao followerDao() {
            return Mockito.mock(FollowerDao.class);
        }

        @Bean
        public AccountService accountService() {
            return new AccountServiceImpl(accountDao(), tweetDao(), followerDao());
        }
    }

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private TweetDao tweetDao;

    @Autowired
    private FollowerDao followerDao;

    @Autowired
    private AccountService accountService;

    @BeforeEach
    public void setUp() throws AccountNotExistsException {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account jdoe = new Account(2, "jdoe", "password", "John Doe");

        Mockito.when(accountDao.findByUsername(jsmith.getUsername())).thenReturn(jsmith);
        Mockito.when(accountDao.findByUsername("unknown")).thenThrow(new AccountNotExistsException());
        Mockito.when(accountDao.findByUsernamePart("j")).thenReturn(Arrays.asList(jdoe, jsmith));
        Mockito.when(accountDao.findByUsernamePart("unknown")).thenReturn(Collections.emptyList());
    }

    @AfterEach
    void tearDown() {
        Mockito.reset(tweetDao);
        Mockito.reset(followerDao);
        Mockito.reset(accountDao);
    }

    @Test
    void whenAdded_thenShouldBeRunAdd() throws AccountExistsException {
        accountService.add("user", "qwerty", "Description");
        Mockito.verify(accountDao, VerificationModeFactory.times(1)).add("user", "qwerty", "Description");
    }

    @Test
    void whenUpdated_thenShouldBeRunUpdate() {
        accountService.update("jsmith", "12345", "Description");
        Mockito.verify(accountDao, VerificationModeFactory.times(1)).update("jsmith", "12345", "Description");
    }

    @Test
    void whenDeleted_thenShouldBeRunDeleteThrice() {
        accountService.delete("alone");
        Mockito.verify(tweetDao, VerificationModeFactory.times(1)).deleteAll("alone");
        Mockito.verify(followerDao, VerificationModeFactory.times(1)).deleteAll("alone");
        Mockito.verify(accountDao, VerificationModeFactory.times(1)).delete("alone");
    }

    @Test
    void whenValidName_thenAccountShouldBeFound() throws AccountNotExistsException {
        Account account = accountService.findByUsername("jsmith");

        assertEquals("jsmith", account.getUsername());
        assertEquals("password", account.getPassword());
        assertEquals("John Smith", account.getDescription());
    }

    @Test
    void whenInvalidName_thenAccountShouldNotBeFound() {
        assertThrows(AccountNotExistsException.class, () -> accountService.findByUsername("unknown"));
    }

    @Test
    void whenValidPart_thenAccountsShouldBeFound() {
        List<Account> accounts = accountService.findByUsernamePart("j");

        assertEquals(2, accounts.size());
        assertEquals("jdoe", accounts.get(0).getUsername());
        assertEquals("jsmith", accounts.get(1).getUsername());
    }

    @Test
    void whenInvalidPart_thenAccountsShouldNotBeFound() {
        List<Account> accounts = accountService.findByUsernamePart("unknown");

        assertEquals(0, accounts.size());
    }
}
