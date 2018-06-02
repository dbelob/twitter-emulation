package acme.twitter.dao;

import acme.twitter.domain.Account;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AccountRowMapper implements RowMapper<Account> {
    @Override
    public Account mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Account(
                resultSet.getLong("account_id"),
                resultSet.getString("username"),
                resultSet.getString("password"),
                resultSet.getString("description"));
    }
}