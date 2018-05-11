package acme.twitter.dao;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;

import java.util.List;

/**
 * Tweet DAO.
 */
public interface TweetDao {
    List<Tweet> findAllByUsername(Account account);
}