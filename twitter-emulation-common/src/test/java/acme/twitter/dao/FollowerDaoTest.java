package acme.twitter.dao;

import acme.twitter.dao.utils.TestSupport;
import acme.twitter.domain.Account;
import org.junit.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

/**
 * Follower DAO test.
 */
public abstract class FollowerDaoTest {
    private static TestSupport testSupport;
    private static FollowerDao followerDao;

    protected static void start(TestSupport testSupport) throws SQLException {
        FollowerDaoTest.testSupport = testSupport;

        testSupport.start();
        followerDao = new JdbcFollowerDao(new JdbcTemplate(testSupport.getDataSource()));
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
    public void countFollowingByUsernameTest() {
        Assert.assertEquals(2, followerDao.countFollowingByUsername("jsmith"));
    }

    @Test
    public void countFollowersByUsernameTest() {
        Assert.assertEquals(1, followerDao.countFollowersByUsername("jsmith"));
    }

    @Test
    public void isExistTest() {
        Assert.assertTrue(followerDao.isExist("jsmith", "jdoe"));
        Assert.assertFalse(followerDao.isExist("jdoe", "rroe"));
    }

    @Test
    public void addTest() {
        followerDao.add("jdoe", "rroe");

        Assert.assertTrue(followerDao.isExist("jdoe", "rroe"));
    }

    @Test
    public void deleteTest() {
        followerDao.delete("jsmith", "jdoe");

        Assert.assertFalse(followerDao.isExist("jsmith", "jdoe"));
    }

    @Test
    public void findFollowingByUsernameTest() {
        List<Account> accounts = followerDao.findFollowingByUsername("jsmith");

        Assert.assertEquals(2, accounts.size());
        Assert.assertEquals("jdoe", accounts.get(0).getUsername());
        Assert.assertEquals("rroe", accounts.get(1).getUsername());
    }

    @Test
    public void findFollowersByUsernameTest() {
        List<Account> accounts = followerDao.findFollowersByUsername("jsmith");

        Assert.assertEquals(1, accounts.size());
        Assert.assertEquals("jdoe", accounts.get(0).getUsername());
    }
}