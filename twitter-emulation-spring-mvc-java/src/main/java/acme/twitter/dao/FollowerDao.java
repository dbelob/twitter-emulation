package acme.twitter.dao;

import acme.twitter.domain.Account;

/**
 * Follower DAO.
 */
public interface FollowerDao {
    int countFollowingByUsername(String username);

    int countFollowersByUsername(String username);

    boolean isFollow(String whoUsername, String whomUsername);

    void follow(Account whoAccount, Account whomAccount);

    void unfollow(Account whoAccount, Account whomAccount);
}