package acme.twitter;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.Rule;
import org.junit.Test;
import org.testcontainers.containers.OracleContainer;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Locale;

import static junit.framework.TestCase.assertEquals;

public class OracleContainerTest {
    static {
        Locale.setDefault(Locale.ENGLISH);
    }

    @Rule
    public OracleContainer oracle = new OracleContainer();

    @Test
    public void testSimple() throws SQLException {
        //TODO: implement
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl(oracle.getJdbcUrl());
        hikariConfig.setUsername(oracle.getUsername());
        hikariConfig.setPassword(oracle.getPassword());

        HikariDataSource ds = new HikariDataSource(hikariConfig);
        Statement statement = ds.getConnection().createStatement();
        statement.execute("SELECT 1 FROM dual");
        ResultSet resultSet = statement.getResultSet();

        resultSet.next();
        int resultSetInt = resultSet.getInt(1);
        assertEquals("A basic SELECT query succeeds", 1, resultSetInt);
    }
}