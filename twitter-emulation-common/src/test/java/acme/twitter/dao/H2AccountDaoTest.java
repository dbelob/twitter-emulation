package acme.twitter.dao;

import acme.twitter.dao.utils.H2TestSupport;
import org.junit.BeforeClass;

/**
 * Account DAO test for H2.
 */
public class H2AccountDaoTest extends AccountDaoTest {
    @BeforeClass
    public static void start() {
        AccountDaoTest.start(new H2TestSupport());
    }
}