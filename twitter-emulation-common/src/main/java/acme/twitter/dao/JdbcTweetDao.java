package acme.twitter.dao;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

/**
 * JDBC implementation of tweet DAO.
 */
@Repository
public class JdbcTweetDao implements TweetDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcTweetDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Tweet> findByAccount(Account account) {
        return jdbcTemplate.query(
                "select t.tweet_id, t.text, t.time " +
                        "from tweet t, account a " +
                        "where a.account_id = t.account_id " +
                        "  and a.username = ? " +
                        "order by t.time desc",
                new TweetRowMapper(account),
                account.getUsername());
    }

    @Override
    public List<Tweet> findTimelineByAccount(Account account) {
        return jdbcTemplate.query(
                "select t.tweet_id, a.account_id, a.username, a.password, a.description, t.text, t.time " +
                        "from tweet t, ( " +
                        "      select account_id, username, password, description " +
                        "         from account " +
                        "         where username = ? " +
                        "      union " +
                        "      select a2.account_id, a2.username, a2.password, a2.description " +
                        "         from account a1, account a2, follower f " +
                        "         where a1.username = ? " +
                        "           and f.who_account_id = a1.account_id " +
                        "           and f.whom_account_id = a2.account_id) a " +
                        "where a.account_id = t.account_id " +
                        "order by t.time desc, a.description",
                new TweetRowMapper(),
                account.getUsername(),
                account.getUsername());
    }

    @Override
    public void add(String username, String text) {
        jdbcTemplate.update(
                "insert into tweet (account_id, text, time)" +
                        "select account_id, ?, current_timestamp " +
                        "from account " +
                        "where username = ?",
                text, username);
    }

    @Override
    public void deleteAll(String username) {
        jdbcTemplate.update(
                "delete from tweet where account_id = (select account_id from account where username = ?)",
                username);
    }

    @Override
    public int countByUsername(String username) {
        return Objects.requireNonNull(
                jdbcTemplate.queryForObject(
                        "select count(*) " +
                                "from account a, tweet t " +
                                "where a.account_id = t.account_id " +
                                "  and a.username = ?",
                        Integer.class,
                        username));
    }
}
