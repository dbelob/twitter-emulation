package acme.twitter.dao;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistExceptions;
import acme.twitter.domain.Account;

import java.util.List;

/**
 * Account DAO.
 */
public interface AccountDao {
    void add(String username, String password, String description) throws AccountExistsException;

    void update(String username, String password, String description);

    void delete(String username);

    Account findByUsername(String username) throws AccountNotExistExceptions;

    List<Account> findByUsernamePart(String usernamePart);
}