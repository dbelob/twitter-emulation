<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<td>
    <table class="accountTable">
        <tr>
            <td colspan="3">
                ${account.description}
            </td>
        </tr>
        <tr>
            <td colspan="3">
                @${account.username}
            </td>
        </tr>
        <tr>
            <td class="small"><a class="statistics" href="<c:url value="/account/tweets/${account.username}" />">Tweets</a></td>
            <td class="small"><a class="statistics" href="<c:url value="/account/following/${account.username}" />">Following</a></td>
            <td class="small"><a class="statistics" href="<c:url value="/account/followers/${account.username}" />">Followers</a></td>
        </tr>
        <tr>
            <td class="small"><a class="statistics" href="<c:url value="/account/tweets/${account.username}" />">${accountStatistics.tweetsCount}</a></td>
            <td class="small"><a class="statistics" href="<c:url value="/account/following/${account.username}" />">${accountStatistics.followingCount}</a></td>
            <td class="small"><a class="statistics" href="<c:url value="/account/followers/${account.username}" />">${accountStatistics.followersCount}</a></td>
        </tr>
    </table>
</td>
