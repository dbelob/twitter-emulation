package acme.twitter.dao;

import acme.twitter.dao.exception.AccountNotExistException;
import acme.twitter.domain.Account;
import org.junit.Assert;
import org.junit.Test;

import java.sql.SQLException;

/**
 * Account DAO test.
 */
public abstract class AccountDaoTest {
    protected AccountDao accountDao;

    @Test
    public void integrationTest() throws SQLException, AccountNotExistException {
        Account account = accountDao.findByUsername("jsmith");

        Assert.assertEquals("jsmith", account.getUsername());

        //TODO: implement
    }
}