package acme.twitter.dto;

/**
 * Account statistics DTO.
 */
public record AccountStatisticsDto(String username, String description, int tweetsCount,
                                   int followingCount, int followersCount, boolean follow) {
}
