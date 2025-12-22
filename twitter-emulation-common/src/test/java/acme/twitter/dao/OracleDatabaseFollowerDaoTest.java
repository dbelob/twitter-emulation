package acme.twitter.dao;

import acme.twitter.dao.utils.OracleDatabaseTestSupport;
import org.junit.jupiter.api.BeforeAll;

import java.sql.SQLException;

/**
 * Follower DAO test for Oracle Database.
 */
public class OracleDatabaseFollowerDaoTest extends FollowerDaoTest {
    @BeforeAll
    static void start() throws SQLException {
        FollowerDaoTest.start(new OracleDatabaseTestSupport());
    }
}
