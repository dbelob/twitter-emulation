package acme.twitter.service;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;

import java.util.List;

/**
 * Tweet service.
 */
public interface TweetService {
    List<Tweet> findByAccount(Account account);
}
