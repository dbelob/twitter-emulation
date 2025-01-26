package acme.twitter.service;

import acme.twitter.dao.TweetDao;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("TweetService class tests")
@ExtendWith(SpringExtension.class)
class TweetServiceTest {
    @TestConfiguration
    static class TweetServiceTestContextConfiguration {
        @Bean
        public TweetDao tweetDao() {
            return Mockito.mock(TweetDao.class);
        }

        @Bean
        public TweetService tweetService() {
            return new TweetServiceImpl(tweetDao());
        }
    }

    @Autowired
    private TweetDao tweetDao;

    @Autowired
    private TweetService tweetService;

    @BeforeEach
    public void setUp() {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account jdoe = new Account(2, "jdoe", "password", "John Doe");

        Tweet jsmithTweet0 = new Tweet(0, jsmith, "Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.", new Date());
        Tweet jsmithTweet1 = new Tweet(1, jsmith, "Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.", new Date());
        Tweet jsmithTweet2 = new Tweet(2, jsmith, "Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.", new Date());
        Tweet jsmithTweet3 = new Tweet(3, jsmith, "No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.", new Date());
        Tweet jsmithTweet4 = new Tweet(4, jsmith, "Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.", new Date());
        Tweet jsmithTweet5 = new Tweet(5, jsmith, "At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.", new Date());
        Tweet jdoeTweet0 = new Tweet(6, jdoe, "Some people care too much. I think it's called love.", new Date());

        Mockito.when(tweetDao.findByAccount(jsmith)).thenReturn(Arrays.asList(jsmithTweet0, jsmithTweet1, jsmithTweet2, jsmithTweet3, jsmithTweet4, jsmithTweet5));
        Mockito.when(tweetDao.findTimelineByAccount(jsmith)).thenReturn(Arrays.asList(jdoeTweet0, jsmithTweet0, jsmithTweet1));
        Mockito.when(tweetDao.countByUsername("jsmith")).thenReturn(6);
    }

    @AfterEach
    void tearDown() {
        Mockito.reset(tweetDao);
    }

    @Test
    void whenValidAccount_thenTweetsShouldBeFound() {
        List<Tweet> tweets = tweetService.findByAccount(new Account(1L, "jsmith", "password", "John Smith"));

        assertEquals(6, tweets.size());
        assertEquals("Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.",
                tweets.get(0).getText());
        assertEquals("jsmith",
                tweets.get(0).getAccount().getUsername());
        assertEquals("Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.",
                tweets.get(1).getText());
        assertEquals("jsmith",
                tweets.get(1).getAccount().getUsername());
        assertEquals("Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.",
                tweets.get(2).getText());
        assertEquals("jsmith",
                tweets.get(2).getAccount().getUsername());
        assertEquals("No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.",
                tweets.get(3).getText());
        assertEquals("jsmith",
                tweets.get(3).getAccount().getUsername());
        assertEquals("Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.",
                tweets.get(4).getText());
        assertEquals("jsmith",
                tweets.get(4).getAccount().getUsername());
        assertEquals("At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.",
                tweets.get(5).getText());
        assertEquals("jsmith",
                tweets.get(5).getAccount().getUsername());
    }

    @Test
    void whenValidAccount_thenTimelineShouldBeFound() {
        List<Tweet> tweets = tweetService.findTimelineByAccount(new Account(1L, "jsmith", "password", "John Smith"));

        assertEquals(3, tweets.size());
        assertEquals("Some people care too much. I think it's called love.",
                tweets.get(0).getText());
        assertEquals("jdoe",
                tweets.get(0).getAccount().getUsername());
        assertEquals("Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.",
                tweets.get(1).getText());
        assertEquals("jsmith",
                tweets.get(1).getAccount().getUsername());
        assertEquals("Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.",
                tweets.get(2).getText());
        assertEquals("jsmith",
                tweets.get(2).getAccount().getUsername());
    }

    @Test
    void whenAdded_thenShouldBeRunAdd() {
        tweetService.add("rroe", "Tweet text");
        Mockito.verify(tweetDao, VerificationModeFactory.times(1)).add("rroe", "Tweet text");
    }

    @Test
    void whenValidName_thenShouldBeReturnCount() {
        assertEquals(6, tweetService.countByUsername("jsmith"));
    }
}
