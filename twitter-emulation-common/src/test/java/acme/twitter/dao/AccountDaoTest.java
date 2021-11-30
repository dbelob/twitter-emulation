package acme.twitter.dao;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.dao.utils.TestSupport;
import acme.twitter.domain.Account;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Account DAO test.
 */
public abstract class AccountDaoTest {
    private static TestSupport testSupport;
    private static AccountDao accountDao;

    protected static void start(TestSupport testSupport) {
        AccountDaoTest.testSupport = testSupport;
        accountDao = new JdbcAccountDao(new JdbcTemplate(testSupport.getDataSource()));
    }

    @BeforeEach
    public void setUp() throws SQLException {
        testSupport.setUp();
    }

    @AfterEach
    public void tearDown() throws SQLException {
        testSupport.tearDown();
    }

    @AfterAll
    public static void stop() {
        testSupport.stop();
    }

    @Test
    public void addTest() throws AccountExistsException, AccountNotExistsException {
        accountDao.add("user", "qwerty", "Description");
        Account account = accountDao.findByUsername("user");

        assertEquals("user", account.getUsername());
        assertEquals("qwerty", account.getPassword());
        assertEquals("Description", account.getDescription());
    }

    @Test
    public void updateTest() throws AccountNotExistsException {
        accountDao.update("jsmith", "12345", "Description");
        Account account = accountDao.findByUsername("jsmith");

        assertEquals("jsmith", account.getUsername());
        assertEquals("12345", account.getPassword());
        assertEquals("Description", account.getDescription());
    }

    @Test
    public void deleteTest() {
        assertThrows(AccountNotExistsException.class, () -> {
            accountDao.delete("alone");
            accountDao.findByUsername("alone");
        });
    }

    @Test
    public void findByUsernameTest() throws AccountNotExistsException {
        Account account = accountDao.findByUsername("jsmith");

        assertEquals("jsmith", account.getUsername());
        assertEquals("password", account.getPassword());
        assertEquals("John Smith", account.getDescription());
    }

    @Test
    public void findByUsernameNotExistsTest() {
        assertThrows(AccountNotExistsException.class, () -> accountDao.findByUsername("unknown"));
    }

    @Test
    public void findByUsernamePartTest() {
        List<Account> accounts = accountDao.findByUsernamePart("j");

        assertEquals(2, accounts.size());
        assertEquals("jdoe", accounts.get(0).getUsername());
        assertEquals("jsmith", accounts.get(1).getUsername());
    }

    @Test
    public void findByUsernameEmptyResultPartTest() {
        List<Account> accounts = accountDao.findByUsernamePart("unknown");

        assertEquals(0, accounts.size());
    }
}
