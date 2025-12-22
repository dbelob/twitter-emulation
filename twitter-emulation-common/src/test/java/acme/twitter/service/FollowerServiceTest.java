package acme.twitter.service;

import acme.twitter.dao.FollowerDao;
import acme.twitter.domain.Account;
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
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("FollowerService class tests")
@ExtendWith(SpringExtension.class)
class FollowerServiceTest {
    @TestConfiguration
    static class FollowerServiceTestContextConfiguration {
        @Bean
        public FollowerDao followerDao() {
            return Mockito.mock(FollowerDao.class);
        }

        @Bean
        public FollowerService followerService() {
            return new FollowerServiceImpl(followerDao());
        }
    }

    @Autowired
    private FollowerDao followerDao;

    @Autowired
    private FollowerService followerService;

    @BeforeEach
    void setUp() {
        Account jdoe = new Account(1, "jdoe", "password", "John Doe");
        Account rroe = new Account(2, "rroe", "password", "Richard Roe");

        Mockito.when(followerDao.countFollowingByUsername("jsmith")).thenReturn(2);
        Mockito.when(followerDao.countFollowersByUsername("jsmith")).thenReturn(1);
        Mockito.when(followerDao.isExist("jsmith", "jdoe")).thenReturn(true);
        Mockito.when(followerDao.isExist("jdoe", "rroe")).thenReturn(false);
        Mockito.when(followerDao.findFollowingByUsername("jsmith")).thenReturn(Arrays.asList(jdoe, rroe));
        Mockito.when(followerDao.findFollowersByUsername("jsmith")).thenReturn(Collections.singletonList(jdoe));
    }

    @AfterEach
    void tearDown() {
        Mockito.reset(followerDao);
    }

    @Test
    void whenValidName_thenShouldBeReturnCountFollowing() {
        assertEquals(2, followerService.countFollowingByUsername("jsmith"));
    }

    @Test
    void whenValidName_thenShouldBeReturnCountFollowers() {
        assertEquals(1, followerService.countFollowersByUsername("jsmith"));
    }

    @Test
    void whenValidNames_thenRecordShouldExist() {
        assertTrue(followerService.isExist("jsmith", "jdoe"));
        assertFalse(followerService.isExist("jdoe", "rroe"));
    }

    @Test
    void whenAdded_thenShouldBeRunAdd() {
        followerService.add("jdoe", "rroe");
        Mockito.verify(followerDao, VerificationModeFactory.times(1)).add("jdoe", "rroe");
    }

    @Test
    void whenDeleted_thenShouldBeRunDelete() {
        followerService.delete("jsmith", "jdoe");
        Mockito.verify(followerDao, VerificationModeFactory.times(1)).delete("jsmith", "jdoe");
    }

    @Test
    void whenValidName_thenFollowingShouldBeFound() {
        List<Account> accounts = followerService.findFollowingByUsername("jsmith");

        assertEquals(2, accounts.size());
        assertEquals("jdoe", accounts.get(0).getUsername());
        assertEquals("rroe", accounts.get(1).getUsername());
    }

    @Test
    void whenValidName_thenFollowersShouldBeFound() {
        List<Account> accounts = followerService.findFollowersByUsername("jsmith");

        assertEquals(1, accounts.size());
        assertEquals("jdoe", accounts.get(0).getUsername());
    }
}
