package acme.twitter.service;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of account service.
 */
@Service
public class AccountServiceImpl implements AccountService {
    private AccountDao accountDao;

    @Autowired
    public AccountServiceImpl(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    @Override
    public Account findByUsername(String username) throws AccountNotExistsException {
        return accountDao.findByUsername(username);
    }

    @Override
    public List<Account> findByUsernamePart(String usernamePart) {
        return accountDao.findByUsernamePart(usernamePart);
    }
}
