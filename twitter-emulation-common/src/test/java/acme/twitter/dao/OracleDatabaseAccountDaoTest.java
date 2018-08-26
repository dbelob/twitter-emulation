package acme.twitter.dao;

import acme.twitter.dao.utils.OracleDatabaseTestSupport;
import org.junit.BeforeClass;

import java.sql.SQLException;

/**
 * Account DAO test for Oracle Database.
 */
public class OracleDatabaseAccountDaoTest extends AccountDaoTest {
    @BeforeClass
    public static void start() throws SQLException {
        AccountDaoTest.start(new OracleDatabaseTestSupport());
    }
}