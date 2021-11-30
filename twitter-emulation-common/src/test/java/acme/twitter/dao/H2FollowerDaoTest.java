package acme.twitter.dao;

import acme.twitter.dao.utils.H2TestSupport;
import org.junit.jupiter.api.BeforeAll;

/**
 * Follower DAO test for H2.
 */
public class H2FollowerDaoTest extends FollowerDaoTest {
    @BeforeAll
    public static void start() {
        FollowerDaoTest.start(new H2TestSupport());
    }
}
