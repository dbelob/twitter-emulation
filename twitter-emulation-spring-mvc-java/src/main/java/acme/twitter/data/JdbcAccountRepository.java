package acme.twitter.data;

import acme.twitter.data.exception.AccountExistsException;
import acme.twitter.data.exception.AccountNotExistException;
import acme.twitter.data.exception.WrongPasswordException;
import acme.twitter.domain.Account;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * JDBC implementation of account repository.
 */
@Repository
public class JdbcAccountRepository implements AccountRepository {
    //TODO: delete
    private Map<String, Account> accounts = new HashMap<>();

    public JdbcAccountRepository() {
        Account account = new Account("jsmith", "password", "John Smith");

        accounts.put(account.getUsername(), account);
    }

    @Override
    public Account login(String username, String password) throws AccountNotExistException, WrongPasswordException {
        //TODO: implement
        if (!accounts.containsKey(username)) {
            throw new AccountNotExistException();
        }

        Account account = accounts.get(username);

        if (!Objects.equals(password, account.getPassword())) {
            throw new WrongPasswordException();
        }

        return account;
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
        //TODO: implement
        return accounts.get(username);
    }
}