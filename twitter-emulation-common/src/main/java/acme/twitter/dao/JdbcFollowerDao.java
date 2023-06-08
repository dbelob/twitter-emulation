package acme.twitter.dao;

import acme.twitter.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

/**
 * JDBC implementation of follower DAO.
 */
@Repository
public class JdbcFollowerDao implements FollowerDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcFollowerDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countFollowingByUsername(String username) {
        return Objects.requireNonNull(
                jdbcTemplate.queryForObject(
                        "select count(*) " +
                                "from account a, follower f " +
                                "where a.account_id = f.who_account_id " +
                                "  and a.username = ?",
                        Integer.class,
                        username));
    }

    @Override
    public int countFollowersByUsername(String username) {
        return Objects.requireNonNull(
                jdbcTemplate.queryForObject(
                        "select count(*) " +
                                "from account a, follower f " +
                                "where a.account_id = f.whom_account_id " +
                                "  and a.username = ?",
                        Integer.class,
                        username));
    }

    @Override
    public boolean isExist(String whoUsername, String whomUsername) {
        int count = Objects.requireNonNull(
                jdbcTemplate.queryForObject(
                        "select count(*) " +
                                "from account a1, account a2, follower f " +
                                "where a1.account_id = f.who_account_id " +
                                "  and a2.account_id = f.whom_account_id " +
                                "  and a1.username = ? " +
                                "  and a2.username = ?",
                        Integer.class,
                        whoUsername, whomUsername));

        return (count > 0);
    }

    @Override
    public void add(String whoUsername, String whomUsername) {
        jdbcTemplate.update(
                "insert into follower (who_account_id, whom_account_id) " +
                        "select a1.account_id, a2.account_id " +
                        "from account a1, account a2 " +
                        "where a1.username = ? " +
                        "  and a2.username = ? " +
                        "  and not exists ( " +
                        "   select * " +
                        "      from account a1, account a2, follower f " +
                        "      where a1.account_id = f.who_account_id " +
                        "        and a2.account_id = f.whom_account_id " +
                        "        and a1.username = ? " +
                        "        and a2.username = ?)",
                whoUsername, whomUsername,
                whoUsername, whomUsername);
    }

    @Override
    public void delete(String whoUsername, String whomUsername) {
        jdbcTemplate.update(
                "delete from follower " +
                        "where who_account_id = (select account_id from account where username = ?) " +
                        "  and whom_account_id = (select account_id from account where username = ?)",
                whoUsername, whomUsername);
    }

    @Override
    public void deleteAll(String username) {
        jdbcTemplate.update(
                "delete from follower " +
                        "where who_account_id = (select account_id from account where username = ?) " +
                        "   or whom_account_id = (select account_id from account where username = ?)",
                username, username);
    }

    @Override
    public List<Account> findFollowingByUsername(String username) {
        return jdbcTemplate.query(
                "select a2.account_id, a2.username, a2.password, a2.description " +
                        "from account a1, account a2, follower f " +
                        "where a1.account_id = f.who_account_id " +
                        "  and a2.account_id = f.whom_account_id " +
                        "  and a1.username = ? " +
                        "order by a2.username",
                new AccountRowMapper(),
                username);
    }

    @Override
    public List<Account> findFollowersByUsername(String username) {
        return jdbcTemplate.query(
                "select a2.account_id, a2.username, a2.password, a2.description " +
                        "from account a1, account a2, follower f " +
                        "where a1.account_id = f.whom_account_id " +
                        "  and a2.account_id = f.who_account_id " +
                        "  and a1.username = ? " +
                        "order by a2.username",
                new AccountRowMapper(),
                username);
    }
}
