package acme.twitter.service;

import acme.twitter.dao.TweetDao;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
public class TweetServiceTest {
    @TestConfiguration
    static class TweetServiceTestContextConfiguration {
        @MockBean
        private TweetDao tweetDao;

        @Bean
        public TweetService tweetService() {
            return new TweetServiceImpl(tweetDao);
        }
    }

    @Autowired
    private TweetDao tweetDao;

    @Autowired
    private TweetService tweetService;

    @Before
    public void setUp() {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Tweet tweet0 = new Tweet(jsmith, "Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.", new Date());
        Tweet tweet1 = new Tweet(jsmith, "Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.", new Date());
        Tweet tweet2 = new Tweet(jsmith, "Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.", new Date());
        Tweet tweet3 = new Tweet(jsmith, "No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.", new Date());
        Tweet tweet4 = new Tweet(jsmith, "Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.", new Date());
        Tweet tweet5 = new Tweet(jsmith, "At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.", new Date());

        Mockito.when(tweetDao.findByAccount(jsmith)).thenReturn(Arrays.asList(tweet0, tweet1, tweet2, tweet3, tweet4, tweet5));
    }

    @Test
    public void whenValidAccount_thenTweetsShouldBeFound() {
        List<Tweet> tweets = tweetService.findByAccount(new Account(1L, "jsmith", "password", "John Smith"));

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
}
