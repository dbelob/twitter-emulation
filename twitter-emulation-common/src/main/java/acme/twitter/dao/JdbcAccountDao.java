package acme.twitter.dao;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistExceptions;
import acme.twitter.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JDBC implementation of account DAO.
 */
@Repository
public class JdbcAccountDao implements AccountDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcAccountDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void add(String username, String password, String description) throws AccountExistsException {
        try {
            jdbcTemplate.update(
                    "insert into account (username, password, description) " +
                            "values (?, ?, ?)",
                    username, password, description);
        } catch (DuplicateKeyException e) {
            throw new AccountExistsException();
        }
    }

    @Override
    public void update(String username, String password, String description) {
        jdbcTemplate.update(
                "update account set password = ?, description = ? " +
                        "where username = ?",
                password, description, username);
    }

    @Override
    public void delete(String username) {
        jdbcTemplate.update(
                "delete account where username = ?",
                username);
    }

    @Override
    public Account findByUsername(String username) throws AccountNotExistExceptions {
        try {
            return jdbcTemplate.queryForObject(
                    "select account_id, username, password, description from account where username = ?",
                    new AccountRowMapper(),
                    username);
        } catch (EmptyResultDataAccessException e) {
            throw new AccountNotExistExceptions();
        }
    }

    @Override
    public List<Account> findByUsernamePart(String usernamePart) {
        return jdbcTemplate.query(
                "select account_id, username, password, description " +
                        "from account " +
                        "where username like '%' || ? || '%' " +
                        "order by username",
                new AccountRowMapper(),
                usernamePart);
    }
}