package acme.twitter.dao;

import acme.twitter.dao.utils.H2TestSupport;
import org.junit.BeforeClass;

import java.sql.SQLException;

/**
 * Follower DAO test for H2.
 */
public class H2FollowerDaoTest extends FollowerDaoTest {
    @BeforeClass
    public static void start() throws SQLException {
        FollowerDaoTest.start(new H2TestSupport());
    }
}