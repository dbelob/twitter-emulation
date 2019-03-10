<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<sec:authorize access="isAuthenticated()">
    <tr>
        <td>
            <a href="<c:url value="/account/show" />">Main</a>
        </td>
        <td>
            <sf:form action="${pageContext.request.contextPath}/account/search" method="POST" modelAttribute="searchForm">
                <table class="searchTable">
                    <tr>
                        <td>
                            <div class="inputWrapper">
                                <sf:input type="search" placeholder="Search accounts..." path="usernamePart"
                                          class="searchInput"/>
                            </div>
                            <input type="submit" class="searchButton" value="Search"/>
                        </td>
                    </tr>
                </table>

                <%--<table class="searchTable">--%>
                <%--<tr>--%>
                <%--<td>--%>
                <%--<sf:input type="search" placeholder="Search accounts..." path="usernamePart"/>--%>
                <%--</td>--%>
                <%--<td>--%>
                <%--<input type="submit" value="Search"/>--%>
                <%--</td>--%>
                <%--</tr>--%>
                <%--</table>--%>
            </sf:form>
        </td>
        <td>
            <sf:form action="${pageContext.request.contextPath}/tweet" method="GET">
                <table class="tweetButtonTable">
                    <tr>
                        <td>
                            <input type="submit" value="Tweet"/>
                        </td>
                        <td>
                            <a href="<c:url value="/account/profile" />">Profile</a>
                        </td>
                        <td>
                            <a href="<c:url value="/logout" />">Log out</a>
                        </td>
                    </tr>
                </table>
            </sf:form>
        </td>
    </tr>
</sec:authorize>
<sec:authorize access="!isAuthenticated()">
    <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>
            <a href="<c:url value="/login" />">Log in</a>
        </td>
    </tr>
</sec:authorize>
