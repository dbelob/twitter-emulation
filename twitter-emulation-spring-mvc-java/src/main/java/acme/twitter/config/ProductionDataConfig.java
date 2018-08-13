package acme.twitter.config;

import oracle.jdbc.pool.OracleDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.sql.SQLException;

@Configuration
@Profile("production")
public class ProductionDataConfig {
    @Bean
    public DataSource dataSource() throws SQLException {
        //TODO: change
        OracleDataSource dataSource = new OracleDataSource();
        dataSource.setUser("te");
        dataSource.setPassword("password");
        dataSource.setURL("jdbc:oracle:thin:@acme.com:1521:sid");

        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}