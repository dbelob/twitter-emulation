package acme.twitter.service;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.FollowerDao;
import acme.twitter.dao.TweetDao;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implementation of account service.
 */
@Service
public class AccountServiceImpl implements AccountService {
    private final AccountDao accountDao;
    private final TweetDao tweetDao;
    private final FollowerDao followerDao;

    @Autowired
    public AccountServiceImpl(AccountDao accountDao, TweetDao tweetDao, FollowerDao followerDao) {
        this.accountDao = accountDao;
        this.tweetDao = tweetDao;
        this.followerDao = followerDao;
    }

    @Override
    public void add(String username, String password, String description) throws AccountExistsException {
        accountDao.add(username, password, description);
    }

    @Override
    public void update(String username, String password, String description) {
        accountDao.update(username, password, description);
    }

    @Override
    @Transactional
    public void delete(String username) {
        tweetDao.deleteAll(username);
        followerDao.deleteAll(username);
        accountDao.delete(username);
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
