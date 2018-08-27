package acme.twitter.dao;

import acme.twitter.dao.utils.H2TestSupport;
import org.junit.BeforeClass;

import java.sql.SQLException;

/**
 * Tweet DAO test for H2.
 */
public class H2TweetDaoTest extends TweetDaoTest {
    @BeforeClass
    public static void start() throws SQLException {
        TweetDaoTest.start(new H2TestSupport());
    }
}