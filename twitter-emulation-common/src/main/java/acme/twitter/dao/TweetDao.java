package acme.twitter.dao;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;

import java.util.List;

/**
 * Tweet DAO.
 */
public interface TweetDao {
    List<Tweet> findByAccount(Account account);

    List<Tweet> findTimelineByAccount(Account account);

    void add(String username, String text);

    void deleteAll(String username);

    int countByUsername(String username);
}