package acme.twitter.dao;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistException;
import acme.twitter.dao.exception.WrongPasswordException;
import acme.twitter.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Objects;

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
    public Account login(String username, String password) throws AccountNotExistException, WrongPasswordException {
        try {
            Account account = jdbcTemplate.queryForObject(
                    "select username, password, description from account where username = ?",
                    new AccountRowMapper(),
                    username);

            if (!Objects.equals(password, account.getPassword())) {
                throw new WrongPasswordException();
            }

            return account;
        } catch (EmptyResultDataAccessException e) {
            throw new AccountNotExistException();
        }
    }

    @Override
    public void add(String username, String password, String description) throws AccountExistsException {
        try {
            jdbcTemplate.update(
                    "insert into account (username, password, description)" +
                            " values (?, ?, ?)",
                    username, password, description);
        } catch (DuplicateKeyException e) {
            throw new AccountExistsException();
        }
    }

    @Override
    public void update(String username, String password, String description) {
        jdbcTemplate.update(
                "update account set password = ?, description = ? " +
                        " where username = ?",
                password, description, username);
    }

    @Override
    public Account findByUsername(String username) {
        return jdbcTemplate.queryForObject(
                "select username, password, description from account where username = ?",
                new AccountRowMapper(),
                username);
    }
}