package acme.twitter.service;

import acme.twitter.domain.Account;

import java.util.List;

/**
 * Follower service.
 */
public interface FollowerService {
    int countFollowingByUsername(String username);

    int countFollowersByUsername(String username);

    boolean isExist(String whoUsername, String whomUsername);

    void add(String whoUsername, String whomUsername);

    void delete(String whoUsername, String whomUsername);

    List<Account> findFollowingByUsername(String username);

    List<Account> findFollowersByUsername(String username);
}
