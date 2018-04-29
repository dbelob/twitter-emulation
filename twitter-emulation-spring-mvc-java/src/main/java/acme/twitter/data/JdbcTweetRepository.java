package acme.twitter.data;

import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * JDBC implementation of tweet repository.
 */
@Repository
public class JdbcTweetRepository implements TweetRepository {
    //TODO: delete
    private Map<Account, List<Tweet>> accountTweets = new HashMap<>();

    public JdbcTweetRepository() {
        Account account = new Account("jsmith", "password", "John Smith");
        List<Tweet> tweets = new ArrayList<>();

        tweets.add(new Tweet(account, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", new Date()));
        tweets.add(new Tweet(account, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", new Date()));
        tweets.add(new Tweet(account, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", new Date()));
        tweets.add(new Tweet(account, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", new Date()));
        tweets.add(new Tweet(account, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", new Date()));
        tweets.add(new Tweet(account, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", new Date()));

        accountTweets.put(account, tweets);
    }

    @Override
    public List<Tweet> findAllByUsername(Account account) {
        //TODO: implement
        List<Tweet> tweets = accountTweets.get(account);

        return (tweets == null) ? Collections.emptyList() : tweets;
    }
}