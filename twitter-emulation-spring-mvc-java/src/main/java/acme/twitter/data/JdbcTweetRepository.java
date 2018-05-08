package acme.twitter.data;

import acme.twitter.domain.Tweet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JDBC implementation of tweet repository.
 */
@Repository
public class JdbcTweetRepository implements TweetRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcTweetRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Tweet> findAllByUsername(String username) {
        return jdbcTemplate.query(
                "select a.username, a.password, a.description, t.text, t.time " +
                        "from account a, tweet t " +
                        "where a.account_id = t.account_id " +
                        "and a.username = ?",
                new TweetRowMapper(),
                username);
    }
}