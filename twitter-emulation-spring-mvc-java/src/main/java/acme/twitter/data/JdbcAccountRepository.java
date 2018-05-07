package acme.twitter.data;

import acme.twitter.data.exception.AccountExistsException;
import acme.twitter.data.exception.AccountNotExistException;
import acme.twitter.data.exception.WrongPasswordException;
import acme.twitter.domain.Account;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * JDBC implementation of account repository.
 */
@Repository
public class JdbcAccountRepository implements AccountRepository {
    private JdbcTemplate jdbcTemplate;

    //TODO: delete
    private Map<String, Account> accounts = new HashMap<>();

    public JdbcAccountRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;

        Account account = new Account("jsmith", "password", "John Smith");

        accounts.put(account.getUsername(), account);
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
    public Account save(Account account) throws AccountExistsException {
        //TODO: implement
        if (accounts.containsKey(account.getUsername())) {
            throw new AccountExistsException();
        }

        accounts.put(account.getUsername(), account);

        return account;
    }

    @Override
    public Account findByUsername(String username) {
        return jdbcTemplate.queryForObject(
                "select username, password, description from account where username = ?",
                new AccountRowMapper(),
                username);
    }
}