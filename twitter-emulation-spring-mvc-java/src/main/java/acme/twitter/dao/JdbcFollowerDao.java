package acme.twitter.dao;

import org.springframework.stereotype.Repository;

/**
 * JDBC implementation of follower DAO.
 */
@Repository
public class JdbcFollowerDao implements FollowerDao {
    @Override
    public int countFollowingByUsername(String username) {
        //TODO: implement
        return 0;
    }

    @Override
    public int countFollowersByUsername(String username) {
        //TODO: implement
        return 0;
    }
}