package acme.twitter.dao;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TweetRowMapper implements RowMapper<Tweet> {
    private Account account;

    public TweetRowMapper(Account account) {
        this.account = account;
    }

    @Override
    public Tweet mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Tweet(account,
                resultSet.getString("text"),
                resultSet.getTimestamp("time"));
    }
}