<td>
    <table class="accountTable">
        <tr>
            <td colspan="3">
                <span class="description">${account.description}</span>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                @${account.username}
            </td>
        </tr>
        <tr>
            <td class="small">Tweets</td>
            <td class="small">Following</td>
            <td class="small">Followers</td>
        </tr>
        <tr>
            <td class="small">${accountStatistics.tweetsCount}</td>
            <td class="small">${accountStatistics.followingCount}</td>
            <td class="small">${accountStatistics.followersCount}</td>
        </tr>
    </table>
</td>
