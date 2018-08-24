package acme.twitter.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
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

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(oracleContainer.getJdbcUrl());
        config.setUsername(oracleContainer.getUsername());
        config.setPassword(oracleContainer.getPassword());
//        config.setConnectionTimeout(0);

        dataSource = new HikariDataSource(config);
        accountDao = new JdbcAccountDao(new JdbcTemplate(dataSource));

        TestUtils.executeSqlScript(dataSource.getConnection(), "/schema-oracledb.sql", "/");
    }

    @Before
    public void setUp() throws Exception {
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