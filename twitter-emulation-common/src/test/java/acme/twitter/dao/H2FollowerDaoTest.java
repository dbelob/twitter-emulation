package acme.twitter.dao;

import acme.twitter.dao.utils.H2TestSupport;
import org.junit.BeforeClass;

/**
 * Follower DAO test for H2.
 */
public class H2FollowerDaoTest extends FollowerDaoTest {
    @BeforeClass
    public static void start() {
        FollowerDaoTest.start(new H2TestSupport());
    }
}