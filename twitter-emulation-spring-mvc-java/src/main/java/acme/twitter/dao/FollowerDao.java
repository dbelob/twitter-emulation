package acme.twitter.dao;

/**
 * Follower DAO.
 */
public interface FollowerDao {
    int countFollowingByUsername(String username);

    int countFollowersByUsername(String username);

    boolean isFollow(String whoUsername, String whomUsername);
}