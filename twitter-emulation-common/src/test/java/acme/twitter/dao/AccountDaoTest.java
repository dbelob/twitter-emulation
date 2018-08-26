package acme.twitter.dao;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistException;
import acme.twitter.dao.utils.TestSupport;
import acme.twitter.domain.Account;
import org.junit.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

/**
 * Account DAO test.
 */
public abstract class AccountDaoTest {
    private static TestSupport testSupport;
    private static AccountDao accountDao;

    protected static void start(TestSupport testSupport) throws SQLException {
        AccountDaoTest.testSupport = testSupport;

        testSupport.start();
        accountDao = new JdbcAccountDao(new JdbcTemplate(testSupport.getDataSource()));
    }

    @Before
    public void setUp() throws SQLException {
        testSupport.setUp();
    }

    @After
    public void tearDown() throws SQLException {
        testSupport.tearDown();
    }

    @AfterClass
    public static void stop() {
        testSupport.stop();
    }

    @Test
    public void add() throws AccountExistsException, AccountNotExistException {
        accountDao.add("user", "qwerty", "Description");
        Account account = accountDao.findByUsername("user");

        Assert.assertEquals("user", account.getUsername());
        Assert.assertEquals("qwerty", account.getPassword());
        Assert.assertEquals("Description", account.getDescription());
    }

    @Test
    public void update() throws AccountNotExistException {
        accountDao.update("jsmith", "12345", "Description");
        Account account = accountDao.findByUsername("jsmith");

        Assert.assertEquals("jsmith", account.getUsername());
        Assert.assertEquals("12345", account.getPassword());
        Assert.assertEquals("Description", account.getDescription());
    }

    @Test(expected = AccountNotExistException.class)
    public void delete() throws AccountNotExistException {
        accountDao.delete("alone");
        accountDao.findByUsername("alone");
    }

    @Test
    public void findByUsername() throws AccountNotExistException {
        Account account = accountDao.findByUsername("jsmith");

        Assert.assertEquals("jsmith", account.getUsername());
        Assert.assertEquals("password", account.getPassword());
        Assert.assertEquals("John Smith", account.getDescription());
    }

    @Test
    public void findByUsernamePart() {
        List<Account> accounts = accountDao.findByUsernamePart("j");

        Assert.assertEquals(2, accounts.size());
        Assert.assertEquals("jdoe", accounts.get(0).getUsername());
        Assert.assertEquals("jsmith", accounts.get(1).getUsername());
    }
}