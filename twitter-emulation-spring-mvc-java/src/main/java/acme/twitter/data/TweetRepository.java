package acme.twitter.data;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;

import java.util.List;

/**
 * Tweet repository.
 */
public interface TweetRepository {
    List<Tweet> findAllByUsername(Account account);
}