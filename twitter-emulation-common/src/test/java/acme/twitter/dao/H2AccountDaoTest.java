package acme.twitter.dao;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import java.sql.SQLException;

/**
 * Account DAO test for H2.
 */
public class H2AccountDaoTest extends AccountDaoTest {
    private static EmbeddedDatabase database;

    @BeforeClass
    public static void start() {
        database = TestUtils.getEmbeddedDatabase(EmbeddedDatabaseType.H2, "schema-h2.sql");
        accountDao = new JdbcAccountDao(new JdbcTemplate(database));
    }

    @Before
    public void setUp() throws SQLException {
        TestUtils.executeSqlScript(database.getConnection(), "/data-h2.sql");
    }

    @After
    public void tearDown() throws SQLException {
        TestUtils.executeSqlScript(database.getConnection(), "/clean-h2.sql");
    }

    @AfterClass
    public static void stop() {
        database.shutdown();
    }
}