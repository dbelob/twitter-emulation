package acme.twitter.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.Before;
import org.junit.Rule;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.testcontainers.containers.OracleContainer;

import java.sql.Connection;
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
        executeSqlScript(dataSource.getConnection(), "/schema-oracledb.sql", "/");
        executeSqlScript(dataSource.getConnection(), "/data-oracledb.sql");
    }

    private void executeSqlScript(Connection connection, String fileName, String separator) {
        ScriptUtils.executeSqlScript(
                connection,
                new EncodedResource(new InputStreamResource(getClass().getResourceAsStream(fileName))),
                false, false, ScriptUtils.DEFAULT_COMMENT_PREFIX, separator,
                ScriptUtils.DEFAULT_BLOCK_COMMENT_START_DELIMITER, ScriptUtils.DEFAULT_BLOCK_COMMENT_END_DELIMITER);
    }

    private void executeSqlScript(Connection connection, String fileName) {
        executeSqlScript(connection, fileName, ScriptUtils.DEFAULT_STATEMENT_SEPARATOR);
    }
}