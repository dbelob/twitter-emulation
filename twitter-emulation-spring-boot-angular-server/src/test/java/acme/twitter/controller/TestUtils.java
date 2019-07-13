package acme.twitter.controller;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import java.sql.Connection;

/**
 * Methods for testing.
 */
public class TestUtils {
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
