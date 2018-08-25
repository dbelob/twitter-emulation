package acme.twitter.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import javax.sql.DataSource;
import java.sql.Connection;

/**
 * Methods for testing.
 */
public class TestUtils {
    /**
     * Gets embedded database.
     *
     * @param databaseType database type
     * @param script       script
     * @return embedded database
     */
    public static EmbeddedDatabase getEmbeddedDatabase(EmbeddedDatabaseType databaseType, String script) {
        return new EmbeddedDatabaseBuilder()
                .setType(databaseType)
                .addScript(script)
                .build();
    }

    /**
     * Gets data source.
     *
     * @param jdbcUrl  JDBC URL
     * @param username username
     * @param password password
     * @return data source
     */
    public static DataSource getDataSource(String jdbcUrl, String username, String password) {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(username);
        config.setPassword(password);
        config.setMaximumPoolSize(100);

        return new HikariDataSource(config);
    }

    /**
     * Executes script.
     *
     * @param connection connection
     * @param fileName   file name
     * @param separator  statement separator
     */
    public static void executeSqlScript(Connection connection, String fileName, String separator) {
        ScriptUtils.executeSqlScript(
                connection,
                new EncodedResource(new InputStreamResource(TestUtils.class.getResourceAsStream(fileName))),
                false, false, ScriptUtils.DEFAULT_COMMENT_PREFIX, separator,
                ScriptUtils.DEFAULT_BLOCK_COMMENT_START_DELIMITER, ScriptUtils.DEFAULT_BLOCK_COMMENT_END_DELIMITER);
    }

    /**
     * Executes script.
     *
     * @param connection connection
     * @param fileName   file name
     */
    public static void executeSqlScript(Connection connection, String fileName) {
        executeSqlScript(connection, fileName, ScriptUtils.DEFAULT_STATEMENT_SEPARATOR);
    }
}