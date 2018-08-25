package acme.twitter.dao;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.springframework.jdbc.core.JdbcTemplate;
import org.testcontainers.containers.OracleContainer;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Locale;

/**
 * Account DAO test for Oracle Database.
 */
public class OracleDatabaseAccountDaoTest extends AccountDaoTest {
    static {
        Locale.setDefault(Locale.ENGLISH);
    }

    private static OracleContainer oracleContainer;
    private static DataSource dataSource;

    @BeforeClass
    public static void start() throws SQLException {
        oracleContainer = new OracleContainer();
        oracleContainer.start();

        dataSource = TestUtils.getDataSource(
                oracleContainer.getJdbcUrl(),
                oracleContainer.getUsername(),
                oracleContainer.getPassword());

        accountDao = new JdbcAccountDao(new JdbcTemplate(dataSource));

        TestUtils.executeSqlScript(dataSource.getConnection(), "/schema-oracledb.sql", "/");
    }

    @Before
    public void setUp() throws SQLException {
        TestUtils.executeSqlScript(dataSource.getConnection(), "/data-oracledb.sql");
    }

    @After
    public void tearDown() throws SQLException {
        TestUtils.executeSqlScript(dataSource.getConnection(), "/clean-oracledb.sql");
    }

    @AfterClass
    public static void stop() {
        oracleContainer.stop();
    }
}