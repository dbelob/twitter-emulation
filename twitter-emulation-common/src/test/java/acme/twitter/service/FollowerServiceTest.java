package acme.twitter.service;

import acme.twitter.dao.FollowerDao;
import acme.twitter.domain.Account;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RunWith(SpringRunner.class)
public class FollowerServiceTest {
    @TestConfiguration
    static class FollowerServiceTestContextConfiguration {
        @MockBean
        private FollowerDao followerDao;

        @Bean
        public FollowerService followerService() {
            return new FollowerServiceImpl(followerDao);
        }
    }

    @Autowired
    private FollowerDao followerDao;

    @Autowired
    private FollowerService followerService;

    @Before
    public void setUp() {
        Account jdoe = new Account(1, "jdoe", "password", "John Doe");
        Account rroe = new Account(2, "rroe", "password", "Richard Roe");

        Mockito.when(followerDao.countFollowingByUsername("jsmith")).thenReturn(2);
        Mockito.when(followerDao.countFollowersByUsername("jsmith")).thenReturn(1);
        Mockito.when(followerDao.isExist("jsmith", "jdoe")).thenReturn(true);
        Mockito.when(followerDao.isExist("jdoe", "rroe")).thenReturn(false);
        Mockito.when(followerDao.findFollowingByUsername("jsmith")).thenReturn(Arrays.asList(jdoe, rroe));
        Mockito.when(followerDao.findFollowersByUsername("jsmith")).thenReturn(Collections.singletonList(jdoe));
    }

    @Test
    public void whenValidName_thenShouldBeReturnCountFollowing() {
        Assert.assertEquals(2, followerService.countFollowingByUsername("jsmith"));
    }

    @Test
    public void whenValidName_thenShouldBeReturnCountFollowers() {
        Assert.assertEquals(1, followerService.countFollowersByUsername("jsmith"));
    }

    @Test
    public void whenValidNames_thenRecordShouldExist() {
        Assert.assertTrue(followerService.isExist("jsmith", "jdoe"));
        Assert.assertFalse(followerService.isExist("jdoe", "rroe"));
    }

    @Test
    public void whenAdded_thenShouldBeRunAdd() {
        followerService.add("jdoe", "rroe");
        Mockito.verify(followerDao, VerificationModeFactory.times(1)).add("jdoe", "rroe");
        Mockito.reset(followerDao);
    }

    @Test
    public void whenDeleted_thenShouldBeRunDelete() {
        followerService.delete("jsmith", "jdoe");
        Mockito.verify(followerDao, VerificationModeFactory.times(1)).delete("jsmith", "jdoe");
        Mockito.reset(followerDao);
    }

    @Test
    public void whenValidName_thenFollowingShouldBeFound() {
        List<Account> accounts = followerService.findFollowingByUsername("jsmith");

        Assert.assertEquals(2, accounts.size());
        Assert.assertEquals("jdoe", accounts.get(0).getUsername());
        Assert.assertEquals("rroe", accounts.get(1).getUsername());
    }

    @Test
    public void whenValidName_thenFollowersShouldBeFound() {
        List<Account> accounts = followerService.findFollowersByUsername("jsmith");

        Assert.assertEquals(1, accounts.size());
        Assert.assertEquals("jdoe", accounts.get(0).getUsername());
    }
}
