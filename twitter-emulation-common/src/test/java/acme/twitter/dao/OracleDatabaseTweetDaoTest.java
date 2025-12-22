package acme.twitter.dao;

import acme.twitter.dao.utils.OracleDatabaseTestSupport;
import org.junit.jupiter.api.BeforeAll;

import java.sql.SQLException;

/**
 * Tweet DAO test for Oracle Database.
 */
public class OracleDatabaseTweetDaoTest extends TweetDaoTest {
    @BeforeAll
    static void start() throws SQLException {
        TweetDaoTest.start(new OracleDatabaseTestSupport());
    }
}
