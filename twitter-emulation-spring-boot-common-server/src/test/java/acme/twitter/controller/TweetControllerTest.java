package acme.twitter.controller;

import acme.twitter.config.SecurityConfig;
import acme.twitter.domain.Account;
import acme.twitter.domain.Tweet;
import acme.twitter.service.AccountService;
import acme.twitter.service.TweetService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.Date;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("TweetController tests")
@WebMvcTest(TweetController.class)
@Import(SecurityConfig.class)
class TweetControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private DataSource dataSource;

    @MockitoBean
    private TweetService tweetService;

    @MockitoBean
    private AccountService accountService;

    @Test
    void whenGetTweets_thenReturnJsonArray() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Tweet jsmithTweet0 = new Tweet(0, jsmith, "Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.", new Date());
        Tweet jsmithTweet1 = new Tweet(1, jsmith, "Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.", new Date());
        Tweet jsmithTweet2 = new Tweet(2, jsmith, "Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.", new Date());
        Tweet jsmithTweet3 = new Tweet(3, jsmith, "No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.", new Date());
        Tweet jsmithTweet4 = new Tweet(4, jsmith, "Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.", new Date());
        Tweet jsmithTweet5 = new Tweet(5, jsmith, "At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.", new Date());

        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);
        BDDMockito.given(tweetService.findByAccount(jsmith)).willReturn(Arrays.asList(jsmithTweet0, jsmithTweet1, jsmithTweet2, jsmithTweet3, jsmithTweet4, jsmithTweet5));

        mvc.perform(get("/api/tweet/tweets/jsmith")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(6)))
                .andExpect(jsonPath("$[0].text", is("Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.")))
                .andExpect(jsonPath("$[0].username", is("jsmith")))
                .andExpect(jsonPath("$[1].text", is("Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.")))
                .andExpect(jsonPath("$[1].username", is("jsmith")))
                .andExpect(jsonPath("$[2].text", is("Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.")))
                .andExpect(jsonPath("$[2].username", is("jsmith")))
                .andExpect(jsonPath("$[3].text", is("No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.")))
                .andExpect(jsonPath("$[3].username", is("jsmith")))
                .andExpect(jsonPath("$[4].text", is("Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.")))
                .andExpect(jsonPath("$[4].username", is("jsmith")))
                .andExpect(jsonPath("$[5].text", is("At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.")))
                .andExpect(jsonPath("$[5].username", is("jsmith")));
        Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsername("jsmith");
        Mockito.verify(tweetService, VerificationModeFactory.times(1)).findByAccount(jsmith);
        Mockito.reset(accountService);
        Mockito.reset(tweetService);
    }

    @Test
    void whenPostTweet_thenCreateTweet() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Tweet tweet = new Tweet(0, jsmith, "Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.", new Date());

        mvc.perform(post("/api/tweet/tweets")
                        .with(user("jsmith"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tweet.getText())
                        .with(csrf())
                )
                .andExpect(status().isOk());
        Mockito.verify(tweetService, VerificationModeFactory.times(1)).add("jsmith", tweet.getText());
        Mockito.reset(tweetService);
    }

    @Test
    void whenGetTimeline_thenReturnJsonArray() throws Exception {
        Account jsmith = new Account(1, "jsmith", "password", "John Smith");
        Account jdoe = new Account(2, "jdoe", "password", "John Doe");
        Tweet jsmithTweet0 = new Tweet(0, jsmith, "Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.", new Date());
        Tweet jsmithTweet1 = new Tweet(1, jsmith, "Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.", new Date());
        Tweet jdoeTweet0 = new Tweet(2, jdoe, "Some people care too much. I think it's called love.", new Date());

        BDDMockito.given(accountService.findByUsername("jsmith")).willReturn(jsmith);
        BDDMockito.given(tweetService.findTimelineByAccount(jsmith)).willReturn(Arrays.asList(jdoeTweet0, jsmithTweet0, jsmithTweet1));

        mvc.perform(get("/api/tweet/timeline")
                        .with(user("jsmith"))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].text", is("Some people care too much. I think it's called love.")))
                .andExpect(jsonPath("$[0].username", is("jdoe")))
                .andExpect(jsonPath("$[1].text", is("Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.")))
                .andExpect(jsonPath("$[1].username", is("jsmith")))
                .andExpect(jsonPath("$[2].text", is("Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.")))
                .andExpect(jsonPath("$[2].username", is("jsmith")));
        Mockito.verify(accountService, VerificationModeFactory.times(1)).findByUsername("jsmith");
        Mockito.verify(tweetService, VerificationModeFactory.times(1)).findTimelineByAccount(jsmith);
        Mockito.reset(accountService);
        Mockito.reset(tweetService);
    }
}
