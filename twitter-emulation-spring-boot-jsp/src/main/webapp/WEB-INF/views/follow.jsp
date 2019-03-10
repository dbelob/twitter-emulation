<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<sec:authorize access="isAuthenticated() and principal.username != '${account.username}'">
    <td>
        <table class="followTable">
            <tr>
                <td>
                    <c:choose>
                        <c:when test="${accountStatistics.follow}">
                            <sf:form action="${pageContext.request.contextPath}/account/unfollow/${account.username}" method="POST">
                                <input type="submit" value="Unfollow"/>
                            </sf:form>
                        </c:when>
                        <c:otherwise>
                            <sf:form action="${pageContext.request.contextPath}/account/follow/${account.username}" method="POST">
                                <input type="submit" value="Follow"/>
                            </sf:form>
                        </c:otherwise>
                    </c:choose>
                </td>
            </tr>
        </table>
    </td>
</sec:authorize>
<sec:authorize access="!isAuthenticated() or principal.username == '${account.username}'">
    <td>
        <table class="companyTable">
            <tr>
                <td>
                    &copy; Acme, <fmt:formatDate value="${copyrightDate}" pattern="yyyy"/>
                </td>
            </tr>
        </table>
    </td>
</sec:authorize>
