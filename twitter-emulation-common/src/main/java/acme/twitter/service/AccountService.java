package acme.twitter.service;

import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;

import java.util.List;

/**
 * Account service.
 */
public interface AccountService {
    Account findByUsername(String username) throws AccountNotExistsException;

    List<Account> findByUsernamePart(String usernamePart);
}
