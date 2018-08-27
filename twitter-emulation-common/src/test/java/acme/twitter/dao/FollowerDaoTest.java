package acme.twitter.dao;

import acme.twitter.dao.utils.TestSupport;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;

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
    public void countFollowingByUsername() {
        //TODO: implement
    }

    @Test
    public void countFollowersByUsername() {
        //TODO: implement
    }

    @Test
    public void isExist() {
        //TODO: implement
    }

    @Test
    public void add() {
        //TODO: implement
    }

    @Test
    public void delete() {
        //TODO: implement
    }

    @Test
    public void findFollowingByUsername() {
        //TODO: implement
    }

    @Test
    public void findFollowersByUsername() {
        //TODO: implement
    }
}