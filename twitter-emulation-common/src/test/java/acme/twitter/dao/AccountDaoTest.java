package acme.twitter.dao;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistException;
import acme.twitter.domain.Account;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

/**
 * Account DAO test.
 */
public abstract class AccountDaoTest {
    protected AccountDao accountDao;

    @Test
    public void integrationTest() throws AccountNotExistException, AccountExistsException {
        // Test findByUsername()
        Account account = accountDao.findByUsername("jsmith");
        Assert.assertEquals("jsmith", account.getUsername());
        Assert.assertEquals("password", account.getPassword());
        Assert.assertEquals("John Smith", account.getDescription());

        // Test add()
        account = null;
        try {
            account = accountDao.findByUsername("user");
        } catch (AccountNotExistException e) {
            // Account is not found, OK
        }
        if (account != null) {
            Assert.fail("Account is found");
        }
        accountDao.add("user", "qwerty", "Description");
        account = accountDao.findByUsername("user");
        Assert.assertEquals("user", account.getUsername());
        Assert.assertEquals("qwerty", account.getPassword());
        Assert.assertEquals("Description", account.getDescription());

        // Test update()
        accountDao.update("user", "12345", "New Description");
        account = accountDao.findByUsername("user");
        Assert.assertEquals("user", account.getUsername());
        Assert.assertEquals("12345", account.getPassword());
        Assert.assertEquals("New Description", account.getDescription());

        // Test delete()
        accountDao.delete("user");
        account = null;
        try {
            account = accountDao.findByUsername("user");
        } catch (AccountNotExistException e) {
            // Account is not found, OK
        }
        if (account != null) {
            Assert.fail("Account is found");
        }

        // Test findByUsernamePart()
        List<Account> accounts = accountDao.findByUsernamePart("j");
        Assert.assertEquals(2, accounts.size());
        Assert.assertEquals("jdoe", accounts.get(0).getUsername());
        Assert.assertEquals("jsmith", accounts.get(1).getUsername());
    }
}