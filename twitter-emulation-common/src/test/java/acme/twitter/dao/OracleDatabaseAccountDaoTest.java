package acme.twitter.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.Before;
import org.junit.Rule;
import org.springframework.jdbc.core.JdbcTemplate;
import org.testcontainers.containers.OracleContainer;

import java.util.Locale;

/**
 * Account DAO test for Oracle Database.
 */
public class OracleDatabaseAccountDaoTest extends AccountDaoTest {
    static {
        Locale.setDefault(Locale.ENGLISH);
    }

    @Rule
    public OracleContainer oracleContainer = new OracleContainer();

    @Before
    public void setUp() throws Exception {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(oracleContainer.getJdbcUrl());
        config.setUsername(oracleContainer.getUsername());
        config.setPassword(oracleContainer.getPassword());

        HikariDataSource dataSource = new HikariDataSource(config);
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

        accountDao = new JdbcAccountDao(jdbcTemplate);

        // Create tables and fill data
        TestUtils.executeSqlScript(dataSource.getConnection(), "/schema-oracledb.sql", "/");
        TestUtils.executeSqlScript(dataSource.getConnection(), "/data-oracledb.sql");
    }
}