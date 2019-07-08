package acme.twitter.service;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
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

        @Bean
        public AccountService employeeService() {
            return new AccountServiceImpl(accountDao);
        }

        public AccountDao getAccountDao() {
            return accountDao;
        }
    }

    @Autowired
    private AccountDao accountDao;

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
    public void whenValidPart_thenAccountsShouldBeFound() throws AccountNotExistsException {
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
