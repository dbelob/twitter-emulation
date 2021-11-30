package acme.twitter.dao.utils;

import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import javax.sql.DataSource;
import java.sql.SQLException;

public class H2TestSupport implements TestSupport {
    private final EmbeddedDatabase database;

    public H2TestSupport() {
        database = new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addScript("schema-h2.sql")
                .build();
    }

    @Override
    public DataSource getDataSource() {
        return database;
    }

    @Override
    public void setUp() throws SQLException {
        TestUtils.executeSqlScript(database.getConnection(), "/data-h2.sql");
    }

    @Override
    public void tearDown() throws SQLException {
        TestUtils.executeSqlScript(database.getConnection(), "/clean-h2.sql");
    }

    @Override
    public void stop() {
        database.shutdown();
    }
}
