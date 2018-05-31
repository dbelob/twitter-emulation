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
                        "  and a.username = ? " +
                        "order by t.time desc",
                new TweetRowMapper(account),
                account.getUsername());
    }

    @Override
    public void add(String username, String text) {
        jdbcTemplate.update(
                "insert into tweet (account_id, text, time)" +
                        "select account_id, ?, sysdate " +
                        "from account " +
                        "where username = ?",
                text, username);
    }

    @Override
    public void deleteAll(String username) {
        jdbcTemplate.update(
                "delete tweet where account_id = (select account_id from account where username = ?)",
                username);
    }

    @Override
    public int countByUsername(String username) {
        return jdbcTemplate.queryForObject(
                "select count(*) " +
                        "from account a, tweet t " +
                        "where a.account_id = t.account_id " +
                        "  and a.username = ?",
                new Object[]{username},
                Integer.class);
    }
}