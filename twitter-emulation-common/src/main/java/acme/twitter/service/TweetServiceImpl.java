package acme.twitter.service;

import acme.twitter.dao.TweetDao;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of tweet service.
 */
@Service
public class TweetServiceImpl implements TweetService {
    private final TweetDao tweetDao;

    @Autowired
    public TweetServiceImpl(TweetDao tweetDao) {
        this.tweetDao = tweetDao;
    }

    @Override
    public List<Tweet> findByAccount(Account account) {
        return tweetDao.findByAccount(account);
    }

    @Override
    public List<Tweet> findTimelineByAccount(Account account) {
        return tweetDao.findTimelineByAccount(account);
    }

    @Override
    public void add(String username, String text) {
        tweetDao.add(username, text);
    }

    @Override
    public int countByUsername(String username) {
        return tweetDao.countByUsername(username);
    }
}
