package acme.twitter.util;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import java.sql.Connection;
import java.util.Objects;

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
        System.out.println("fileName: " + fileName);
        System.out.println("TestUtils.class.getResourceAsStream(fileName): " + TestUtils.class.getResourceAsStream(fileName));
        System.out.println("TestUtils.class.getResourceAsStream(/clean-h2.sql): " + TestUtils.class.getResourceAsStream("/clean-h2.sql"));

        ScriptUtils.executeSqlScript(
                connection,
                new EncodedResource(new InputStreamResource(Objects.requireNonNull(TestUtils.class.getResourceAsStream(fileName)))),
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
