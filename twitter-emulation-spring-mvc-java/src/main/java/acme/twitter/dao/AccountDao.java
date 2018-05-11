package acme.twitter.dao;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistException;
import acme.twitter.dao.exception.WrongPasswordException;
import acme.twitter.domain.Account;

/**
 * Account DAO.
 */
public interface AccountDao {
    Account login(String username, String password) throws AccountNotExistException, WrongPasswordException;

    void add(String username, String password, String description) throws AccountExistsException;

    void update(String username, String password, String description);

    Account findByUsername(String username);
}