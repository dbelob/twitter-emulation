package acme.twitter.domain;

/**
 * Account statistics.
 */
public class AccountStatistics {
    private int tweetsCount;
    private int followingCount;
    private int followersCount;
    private boolean follow;

    public AccountStatistics(int tweetsCount, int followingCount, int followersCount, boolean follow) {
        this.tweetsCount = tweetsCount;
        this.followingCount = followingCount;
        this.followersCount = followersCount;
        this.follow = follow;
    }

    public int getTweetsCount() {
        return tweetsCount;
    }

    public int getFollowingCount() {
        return followingCount;
    }

    public int getFollowersCount() {
        return followersCount;
    }

    public boolean isFollow() {
        return follow;
    }
}