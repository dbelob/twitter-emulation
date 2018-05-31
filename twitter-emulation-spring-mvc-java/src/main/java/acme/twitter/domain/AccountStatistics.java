package acme.twitter.domain;

/**
 * Account statistics.
 */
public class AccountStatistics {
    private int tweetsCount;
    private int followingCount;
    private int followersCount;

    public AccountStatistics(int tweetsCount, int followingCount, int followersCount) {
        this.tweetsCount = tweetsCount;
        this.followingCount = followingCount;
        this.followersCount = followersCount;
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
}