package acme.twitter.dao.utils;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.testcontainers.containers.OracleContainer;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Locale;

public class OracleDatabaseTestSupport implements TestSupport {
    static {
        Locale.setDefault(Locale.ENGLISH);
    }

    private OracleContainer oracleContainer;
    private DataSource dataSource;

    public OracleDatabaseTestSupport() throws SQLException {
        oracleContainer = new OracleContainer();
        oracleContainer.start();

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(oracleContainer.getJdbcUrl());
        config.setUsername(oracleContainer.getUsername());
        config.setPassword(oracleContainer.getPassword());
        config.setMaximumPoolSize(100);

        dataSource = new HikariDataSource(config);

        TestUtils.executeSqlScript(dataSource.getConnection(), "/schema-oracledb.sql", "/");
    }

    @Override
    public DataSource getDataSource() {
        return dataSource;
    }

    @Override
    public void setUp() throws SQLException {
        TestUtils.executeSqlScript(dataSource.getConnection(), "/data-oracledb.sql");
    }

    @Override
    public void tearDown() throws SQLException {
        TestUtils.executeSqlScript(dataSource.getConnection(), "/clean-oracledb.sql");
    }

    @Override
    public void stop() {
        oracleContainer.stop();
    }
}