package acme.twitter.dao;

import acme.twitter.dao.utils.TestSupport;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.junit.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

/**
 * Tweet DAO test.
 */
public abstract class TweetDaoTest {
    private static TestSupport testSupport;
    private static TweetDao tweetDao;

    protected static void start(TestSupport testSupport) {
        TweetDaoTest.testSupport = testSupport;
        tweetDao = new JdbcTweetDao(new JdbcTemplate(testSupport.getDataSource()));
    }

    @Before
    public void setUp() throws SQLException {
        testSupport.setUp();
    }

    @After
    public void tearDown() throws SQLException {
        testSupport.tearDown();
    }

    @AfterClass
    public static void stop() {
        testSupport.stop();
    }

    @Test
    public void findByAccountTest() {
        List<Tweet> tweets = tweetDao.findByAccount(new Account(1L, "jsmith", "password", "John Smith"));

        Assert.assertEquals(6, tweets.size());
        Assert.assertEquals("Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.",
                tweets.get(0).getText());
        Assert.assertEquals("Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.",
                tweets.get(1).getText());
        Assert.assertEquals("Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.",
                tweets.get(2).getText());
        Assert.assertEquals("No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.",
                tweets.get(3).getText());
        Assert.assertEquals("Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.",
                tweets.get(4).getText());
        Assert.assertEquals("At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.",
                tweets.get(5).getText());
    }

    @Test
    public void findTimelineByAccountTest() {
        List<Tweet> tweets = tweetDao.findTimelineByAccount(new Account(1L, "jsmith", "password", "John Smith"));

        Assert.assertEquals(9, tweets.size());
        Assert.assertEquals("Some people care too much. I think it's called love.",
                tweets.get(0).getText());
        Assert.assertEquals("Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.",
                tweets.get(1).getText());
        Assert.assertEquals("You can't stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.",
                tweets.get(2).getText());
        Assert.assertEquals("Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.",
                tweets.get(3).getText());
        Assert.assertEquals("It is more fun to talk with someone who doesn't use long, difficult words but rather short, easy words like \"What about lunch?\"",
                tweets.get(4).getText());
        Assert.assertEquals("Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.",
                tweets.get(5).getText());
        Assert.assertEquals("No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.",
                tweets.get(6).getText());
        Assert.assertEquals("Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.",
                tweets.get(7).getText());
        Assert.assertEquals("At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.",
                tweets.get(8).getText());
    }

    @Test
    public void addTest() {
        tweetDao.add("rroe", "Tweet text");

        List<Tweet> tweets = tweetDao.findByAccount(new Account(3L, "rroe", "password", "Richard Roe"));
        Assert.assertEquals(1, tweets.size());
        Assert.assertEquals("Tweet text",
                tweets.get(0).getText());
    }

    @Test
    public void deleteAllTest() {
        tweetDao.deleteAll("jsmith");

        List<Tweet> tweets = tweetDao.findByAccount(new Account(3L, "rroe", "password", "Richard Roe"));
        Assert.assertEquals(0, tweets.size());
    }

    @Test
    public void countByUsernameTest() {
        Assert.assertEquals(6, tweetDao.countByUsername("jsmith"));
    }
}
