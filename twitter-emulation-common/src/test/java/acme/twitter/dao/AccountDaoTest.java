package acme.twitter.dao;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.containers.OracleContainer;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Locale;

import static junit.framework.TestCase.assertEquals;

@ActiveProfiles(profiles = "production")
public class AccountDaoTest {
    static {
        Locale.setDefault(Locale.ENGLISH);
    }

    @Rule
    public OracleContainer oracle = new OracleContainer();

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

//    @Test
    public void testSimple() throws SQLException {
        //TODO: implement
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl(oracle.getJdbcUrl());
        hikariConfig.setUsername(oracle.getUsername());
        hikariConfig.setPassword(oracle.getPassword());

        HikariDataSource ds = new HikariDataSource(hikariConfig);
        Statement statement = ds.getConnection().createStatement();
        statement.execute("SELECT 42 FROM dual");
        ResultSet resultSet = statement.getResultSet();

        resultSet.next();
        int resultSetInt = resultSet.getInt(1);
        assertEquals("A basic SELECT query succeeds", 42, resultSetInt);
    }

    @Test
    public void add() {
    }

//    @Test
    public void update() {
    }

//    @Test
    public void delete() {
    }

//    @Test
    public void findByUsername() {
    }

//    @Test
    public void findByUsernamePart() {
    }
}