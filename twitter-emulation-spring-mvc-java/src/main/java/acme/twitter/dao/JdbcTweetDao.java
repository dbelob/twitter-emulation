package acme.twitter.dao;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JDBC implementation of tweet DAO.
 */
@Repository
public class JdbcTweetDao implements TweetDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcTweetDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Tweet> findAllByUsername(Account account) {
        return jdbcTemplate.query(
                "select a.username, a.password, a.description, t.text, t.time " +
                        "from account a, tweet t " +
                        "where a.account_id = t.account_id " +
                        "and a.username = ?",
                new TweetRowMapper(account),
                account.getUsername());
    }
}