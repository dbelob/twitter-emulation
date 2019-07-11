package acme.twitter.service;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.FollowerDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RunWith(SpringRunner.class)
public class AccountServiceTest {
    @TestConfiguration
    static class AccountServiceTestContextConfiguration {
        @MockBean
        private AccountDao accountDao;

        @MockBean
        private TweetDao tweetDao;

        @MockBean
        private FollowerDao followerDao;

        @Bean
        public AccountService accountService() {
            return new AccountServiceImpl(accountDao, tweetDao, followerDao);
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

    @Before
    public void setUp() throws AccountNotExistsException {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account jdoe = new Account(2, "jdoe", "password", "John Doe");

        Mockito.when(accountDao.findByUsername(jsmith.getUsername())).thenReturn(jsmith);
        Mockito.when(accountDao.findByUsername("unknown")).thenThrow(new AccountNotExistsException());
        Mockito.when(accountDao.findByUsernamePart("j")).thenReturn(Arrays.asList(jdoe, jsmith));
        Mockito.when(accountDao.findByUsernamePart("unknown")).thenReturn(Collections.emptyList());
    }

    @Test
    public void whenAdded_thenShouldBeRunAdd() throws AccountExistsException {
        accountService.add("user", "qwerty", "Description");
        Mockito.verify(accountDao, VerificationModeFactory.times(1)).add("user", "qwerty", "Description");
        Mockito.reset(accountDao);
    }

    @Test
    public void whenUpdated_thenShouldBeRunUpdate() {
        accountService.update("jsmith", "12345", "Description");
        Mockito.verify(accountDao, VerificationModeFactory.times(1)).update("jsmith", "12345", "Description");
        Mockito.reset(accountDao);
    }

    @Test
    public void whenDeleted_thenShouldBeRunDeleteThrice() {
        accountService.delete("alone");
        Mockito.verify(tweetDao, VerificationModeFactory.times(1)).deleteAll("alone");
        Mockito.verify(followerDao, VerificationModeFactory.times(1)).deleteAll("alone");
        Mockito.verify(accountDao, VerificationModeFactory.times(1)).delete("alone");
        Mockito.reset(tweetDao);
        Mockito.reset(followerDao);
        Mockito.reset(accountDao);
    }

    @Test
    public void whenValidName_thenAccountShouldBeFound() throws AccountNotExistsException {
        Account account = accountService.findByUsername("jsmith");

        Assert.assertEquals("jsmith", account.getUsername());
        Assert.assertEquals("password", account.getPassword());
        Assert.assertEquals("John Smith", account.getDescription());
    }

    @Test(expected = AccountNotExistsException.class)
    public void whenInvalidName_thenAccountShouldNotBeFound() throws AccountNotExistsException {
        accountService.findByUsername("unknown");
    }

    @Test
    public void whenValidPart_thenAccountsShouldBeFound() {
        List<Account> accounts = accountService.findByUsernamePart("j");

        Assert.assertEquals(2, accounts.size());
        Assert.assertEquals("jdoe", accounts.get(0).getUsername());
        Assert.assertEquals("jsmith", accounts.get(1).getUsername());
    }

    @Test
    public void whenInvalidPart_thenAccountsShouldNotBeFound() {
        List<Account> accounts = accountService.findByUsernamePart("unknown");

        Assert.assertEquals(0, accounts.size());
    }
}
