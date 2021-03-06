package acme.twitter.service;

import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;

import java.util.List;

/**
 * Account service.
 */
public interface AccountService {
    void add(String username, String password, String description) throws AccountExistsException;

    void update(String username, String password, String description);

    void delete(String username);

    Account findByUsername(String username) throws AccountNotExistsException;

    List<Account> findByUsernamePart(String usernamePart);
}
