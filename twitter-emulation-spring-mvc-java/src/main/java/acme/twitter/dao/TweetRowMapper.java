package acme.twitter.dao;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TweetRowMapper implements RowMapper<Tweet> {
    private Account account;

    public TweetRowMapper() {
    }

    public TweetRowMapper(Account account) {
        this.account = account;
    }

    @Override
    public Tweet mapRow(ResultSet resultSet, int i) throws SQLException {
        Account tweetAccount = (account != null) ?
                account :
                new Account(
                        resultSet.getLong("account_id"),
                        resultSet.getString("username"),
                        resultSet.getString("password"),
                        resultSet.getString("description"));

        return new Tweet(tweetAccount,
                resultSet.getString("text"),
                resultSet.getTimestamp("time"));
    }
}