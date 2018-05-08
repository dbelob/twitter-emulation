package acme.twitter.data;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TweetRowMapper implements RowMapper<Tweet> {
    @Override
    public Tweet mapRow(ResultSet resultSet, int i) throws SQLException {
        Account account = new Account(
                resultSet.getString("username"),
                resultSet.getString("password"),
                resultSet.getString("description"));

        return new Tweet(account, resultSet.getString("text"), resultSet.getTimestamp("time"));
    }
}