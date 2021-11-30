package acme.twitter.dao;

import acme.twitter.dao.utils.TestSupport;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

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

    @BeforeEach
    public void setUp() throws SQLException {
        testSupport.setUp();
    }

    @AfterEach
    public void tearDown() throws SQLException {
        testSupport.tearDown();
    }

    @AfterAll
    public static void stop() {
        testSupport.stop();
    }

    @Test
    public void findByAccountTest() {
        List<Tweet> tweets = tweetDao.findByAccount(new Account(1L, "jsmith", "password", "John Smith"));

        assertEquals(6, tweets.size());
        assertEquals("Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.",
                tweets.get(0).getText());
        assertEquals("Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.",
                tweets.get(1).getText());
        assertEquals("Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.",
                tweets.get(2).getText());
        assertEquals("No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.",
                tweets.get(3).getText());
        assertEquals("Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.",
                tweets.get(4).getText());
        assertEquals("At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.",
                tweets.get(5).getText());
    }

    @Test
    public void findTimelineByAccountTest() {
        List<Tweet> tweets = tweetDao.findTimelineByAccount(new Account(1L, "jsmith", "password", "John Smith"));

        assertEquals(9, tweets.size());
        assertEquals("Some people care too much. I think it's called love.",
                tweets.get(0).getText());
        assertEquals("Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.",
                tweets.get(1).getText());
        assertEquals("You can't stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.",
                tweets.get(2).getText());
        assertEquals("Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.",
                tweets.get(3).getText());
        assertEquals("It is more fun to talk with someone who doesn't use long, difficult words but rather short, easy words like \"What about lunch?\"",
                tweets.get(4).getText());
        assertEquals("Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.",
                tweets.get(5).getText());
        assertEquals("No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.",
                tweets.get(6).getText());
        assertEquals("Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.",
                tweets.get(7).getText());
        assertEquals("At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.",
                tweets.get(8).getText());
    }

    @Test
    public void addTest() {
        tweetDao.add("rroe", "Tweet text");

        List<Tweet> tweets = tweetDao.findByAccount(new Account(3L, "rroe", "password", "Richard Roe"));
        assertEquals(1, tweets.size());
        assertEquals("Tweet text",
                tweets.get(0).getText());
    }

    @Test
    public void deleteAllTest() {
        tweetDao.deleteAll("jsmith");

        List<Tweet> tweets = tweetDao.findByAccount(new Account(3L, "rroe", "password", "Richard Roe"));
        assertEquals(0, tweets.size());
    }

    @Test
    public void countByUsernameTest() {
        assertEquals(6, tweetDao.countByUsername("jsmith"));
    }
}
