package acme.twitter.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.junit.Before;
import org.junit.Rule;
import org.springframework.jdbc.core.JdbcTemplate;
import org.testcontainers.containers.OracleContainer;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;
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
        runScript(oracleContainer.getJdbcUrl(), oracleContainer.getUsername(), oracleContainer.getPassword(), "/schema-oracledb.sql");
        runScript(oracleContainer.getJdbcUrl(), oracleContainer.getUsername(), oracleContainer.getPassword(), "/data-oracledb.sql");
    }

    private void runScript(String jdbcUrl, String username, String password, String fileName) throws Exception {
        Connection connection = DriverManager.getConnection(jdbcUrl, username, password);
        ScriptRunner scriptRunner = new ScriptRunner(connection);
        InputStream inputStream = getClass().getResourceAsStream(fileName);
        Reader reader = new BufferedReader(new InputStreamReader(inputStream));

        scriptRunner.runScript(reader);
    }
}