package acme.twitter.dao;

import acme.twitter.domain.Account;

import java.util.List;

/**
 * Follower DAO.
 */
public interface FollowerDao {
    int countFollowingByUsername(String username);

    int countFollowersByUsername(String username);

    boolean isExist(String whoUsername, String whomUsername);

    void add(Account whoAccount, Account whomAccount);

    void delete(Account whoAccount, Account whomAccount);

    List<Account> findFollowingByUsername(String username);

    List<Account> findFollowersByUsername(String username);
}