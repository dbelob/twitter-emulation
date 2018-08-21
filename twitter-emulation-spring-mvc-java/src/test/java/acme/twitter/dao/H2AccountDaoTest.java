package acme.twitter.dao;

import org.junit.After;
import org.junit.Before;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

/**
 * Account DAO test for H2.
 */
public class H2AccountDaoTest extends AccountDaoTest {
    private EmbeddedDatabase embeddedDatabase;

    @Before
    public void setUp() {
        embeddedDatabase = new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addDefaultScripts()
                .build();
        JdbcTemplate jdbcTemplate = new JdbcTemplate(embeddedDatabase);

        accountDao = new JdbcAccountDao(jdbcTemplate);
    }

    @After
    public void tearDown() {
        embeddedDatabase.shutdown();
    }
}