<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<tr>
    <td>
        <a href="<c:url value="/account/${authenticatedAccount.username}" />">Main</a>
    </td>
    <td>
        <sf:form action="${pageContext.request.contextPath}/account/search/${authenticatedAccount.username}" method="POST" modelAttribute="searchForm">
            <table class="searchTable">
                <tr>
                    <td>
                        <sf:input type="search" placeholder="Search accounts..." path="usernamePart"/>
                    </td>
                    <td>
                        <input type="submit" value="Search"/>
                    </td>
                </tr>
            </table>
        </sf:form>
    </td>
    <td>
        <sf:form action="${pageContext.request.contextPath}/tweet/${authenticatedAccount.username}" method="GET">
            <table class="tweetButtonTable">
                <tr>
                    <td>
                        <input type="submit" value="Tweet"/>
                    </td>
                    <td>
                        <a href="<c:url value="/account/profile/${authenticatedAccount.username}" />">Profile</a>
                    </td>
                    <td>
                        <a href="<c:url value="/logout" />">Log out</a>
                    </td>
                </tr>
            </table>
        </sf:form>
    </td>
</tr>
