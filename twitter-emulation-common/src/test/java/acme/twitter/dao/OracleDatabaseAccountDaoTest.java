package acme.twitter.dao;

import acme.twitter.dao.utils.OracleDatabaseTestSupport;
import org.junit.jupiter.api.BeforeAll;

import java.sql.SQLException;

/**
 * Account DAO test for Oracle Database.
 */
public class OracleDatabaseAccountDaoTest extends AccountDaoTest {
    @BeforeAll
    static void start() throws SQLException {
        AccountDaoTest.start(new OracleDatabaseTestSupport());
    }
}
