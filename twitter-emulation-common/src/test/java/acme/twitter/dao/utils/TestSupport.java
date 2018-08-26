package acme.twitter.dao.utils;

import javax.sql.DataSource;
import java.sql.SQLException;

public interface TestSupport {
    DataSource getDataSource();

    void start() throws SQLException;

    void setUp() throws SQLException;

    void tearDown() throws SQLException;

    void stop();
}