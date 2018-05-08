package acme.twitter.data;

import acme.twitter.data.exception.AccountExistsException;
import acme.twitter.data.exception.AccountNotExistException;
import acme.twitter.data.exception.WrongPasswordException;
import acme.twitter.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Objects;

/**
 * JDBC implementation of account repository.
 */
@Repository
public class JdbcAccountRepository implements AccountRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcAccountRepository(JdbcTemplate jdbcTemplate) {
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
    public void save(String username, String password, String description) throws AccountExistsException {
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
    public Account findByUsername(String username) {
        return jdbcTemplate.queryForObject(
                "select username, password, description from account where username = ?",
                new AccountRowMapper(),
                username);
    }
}