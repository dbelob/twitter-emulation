package acme.twitter.data;

import acme.twitter.data.exception.AccountExistsException;
import acme.twitter.data.exception.AccountNotExistException;
import acme.twitter.data.exception.WrongPasswordException;
import acme.twitter.domain.Account;

/**
 * Account repository.
 */
public interface AccountRepository {
    Account login(String username, String password) throws AccountNotExistException, WrongPasswordException;

    void save(String username, String password, String description) throws AccountExistsException;

    Account findByUsername(String username);
}