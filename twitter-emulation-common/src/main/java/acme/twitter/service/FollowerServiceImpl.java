package acme.twitter.service;

import acme.twitter.dao.FollowerDao;
import acme.twitter.domain.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of follower service.
 */
@Service
public class FollowerServiceImpl implements FollowerService {
    private FollowerDao followerDao;

    @Autowired
    public FollowerServiceImpl(FollowerDao followerDao) {
        this.followerDao = followerDao;
    }

    @Override
    public int countFollowingByUsername(String username) {
        return followerDao.countFollowingByUsername(username);
    }

    @Override
    public int countFollowersByUsername(String username) {
        return followerDao.countFollowersByUsername(username);
    }

    @Override
    public boolean isExist(String whoUsername, String whomUsername) {
        return followerDao.isExist(whoUsername, whomUsername);
    }

    @Override
    public void add(String whoUsername, String whomUsername) {
        followerDao.add(whoUsername, whomUsername);
    }

    @Override
    public void delete(String whoUsername, String whomUsername) {
        followerDao.delete(whoUsername, whomUsername);
    }

    @Override
    public List<Account> findFollowingByUsername(String username) {
        return followerDao.findFollowingByUsername(username);
    }

    @Override
    public List<Account> findFollowersByUsername(String username) {
        return followerDao.findFollowersByUsername(username);
    }
}
