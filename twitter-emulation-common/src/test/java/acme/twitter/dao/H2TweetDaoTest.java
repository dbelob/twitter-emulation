package acme.twitter.dao;

import acme.twitter.dao.utils.H2TestSupport;
import org.junit.jupiter.api.BeforeAll;

/**
 * Tweet DAO test for H2.
 */
public class H2TweetDaoTest extends TweetDaoTest {
    @BeforeAll
    static void start() {
        TweetDaoTest.start(new H2TestSupport());
    }
}
