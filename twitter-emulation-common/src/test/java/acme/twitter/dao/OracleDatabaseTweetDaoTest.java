package acme.twitter.dao;

import acme.twitter.dao.utils.OracleDatabaseTestSupport;
import org.junit.BeforeClass;

import java.sql.SQLException;

/**
 * Tweet DAO test for Oracle Database.
 */
public class OracleDatabaseTweetDaoTest extends TweetDaoTest {
    @BeforeClass
    public static void start() throws SQLException {
        TweetDaoTest.start(new OracleDatabaseTestSupport());
    }
}