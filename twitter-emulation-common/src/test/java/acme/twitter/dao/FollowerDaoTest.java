package acme.twitter.dao;

import acme.twitter.dao.utils.TestSupport;
import acme.twitter.domain.Account;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Follower DAO test.
 */
public abstract class FollowerDaoTest {
    private static TestSupport testSupport;
    private static FollowerDao followerDao;

    protected static void start(TestSupport testSupport) {
        FollowerDaoTest.testSupport = testSupport;
        followerDao = new JdbcFollowerDao(new JdbcTemplate(testSupport.getDataSource()));
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
    public void countFollowingByUsernameTest() {
        assertEquals(2, followerDao.countFollowingByUsername("jsmith"));
    }

    @Test
    public void countFollowersByUsernameTest() {
        assertEquals(1, followerDao.countFollowersByUsername("jsmith"));
    }

    @Test
    public void isExistTest() {
        assertTrue(followerDao.isExist("jsmith", "jdoe"));
        assertFalse(followerDao.isExist("jdoe", "rroe"));
    }

    @Test
    public void addTest() {
        followerDao.add("jdoe", "rroe");

        assertTrue(followerDao.isExist("jdoe", "rroe"));
    }

    @Test
    public void deleteTest() {
        followerDao.delete("jsmith", "jdoe");

        assertFalse(followerDao.isExist("jsmith", "jdoe"));
    }

    @Test
    public void findFollowingByUsernameTest() {
        List<Account> accounts = followerDao.findFollowingByUsername("jsmith");

        assertEquals(2, accounts.size());
        assertEquals("jdoe", accounts.get(0).getUsername());
        assertEquals("rroe", accounts.get(1).getUsername());
    }

    @Test
    public void findFollowersByUsernameTest() {
        List<Account> accounts = followerDao.findFollowersByUsername("jsmith");

        assertEquals(1, accounts.size());
        assertEquals("jdoe", accounts.get(0).getUsername());
    }
}
