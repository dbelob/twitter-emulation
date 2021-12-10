package acme.twitter.dao.utils;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.testcontainers.containers.OracleContainer;
import org.testcontainers.utility.DockerImageName;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Locale;

public class OracleDatabaseTestSupport implements TestSupport {
    private static final DockerImageName DOCKER_IMAGE_NAME = DockerImageName.parse("gvenzl/oracle-xe");
    private static final String DOCKER_IMAGE_TAG = "18.4.0-slim";

    static {
        Locale.setDefault(Locale.ENGLISH);
    }

    private final OracleContainer oracleContainer;
    private final DataSource dataSource;

    public OracleDatabaseTestSupport() throws SQLException {
        oracleContainer = new OracleContainer(DOCKER_IMAGE_NAME.withTag(DOCKER_IMAGE_TAG));
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
