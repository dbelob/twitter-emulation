package acme.twitter.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * JDBC implementation of follower DAO.
 */
@Repository
public class JdbcFollowerDao implements FollowerDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcFollowerDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int countFollowingByUsername(String username) {
        return jdbcTemplate.queryForObject(
                "select count(*) " +
                        "from account a, follower f " +
                        "where a.account_id = f.who_account_id " +
                        "  and a.username = ?",
                new Object[]{username},
                Integer.class);
    }

    @Override
    public int countFollowersByUsername(String username) {
        return jdbcTemplate.queryForObject(
                "select count(*) " +
                        "from account a, follower f " +
                        "where a.account_id = f.whom_account_id " +
                        "  and a.username = ?",
                new Object[]{username},
                Integer.class);
    }
}