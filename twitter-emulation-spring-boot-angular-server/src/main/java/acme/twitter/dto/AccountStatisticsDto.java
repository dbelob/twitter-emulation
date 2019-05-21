package acme.twitter.dto;

/**
 * Account statistics DTO.
 */
public class AccountStatisticsDto {
    private String username;
    private String description;
    private int tweetsCount;
    private int followingCount;
    private int followersCount;
    private boolean follow;

    public AccountStatisticsDto(String username, String description, int tweetsCount, int followingCount, int followersCount, boolean follow) {
        this.username = username;
        this.description = description;
        this.tweetsCount = tweetsCount;
        this.followingCount = followingCount;
        this.followersCount = followersCount;
        this.follow = follow;
    }

    public String getUsername() {
        return username;
    }

    public String getDescription() {
        return description;
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
