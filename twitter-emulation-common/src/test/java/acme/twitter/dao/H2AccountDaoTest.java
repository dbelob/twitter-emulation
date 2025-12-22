package acme.twitter.dao;

import acme.twitter.dao.utils.H2TestSupport;
import org.junit.jupiter.api.BeforeAll;

/**
 * Account DAO test for H2.
 */
public class H2AccountDaoTest extends AccountDaoTest {
    @BeforeAll
    static void start() {
        AccountDaoTest.start(new H2TestSupport());
    }
}
