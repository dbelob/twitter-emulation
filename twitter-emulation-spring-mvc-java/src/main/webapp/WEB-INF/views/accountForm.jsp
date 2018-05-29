<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<div class="webPage">
    <div class="centered">
        <table class="mainTable centered">
            <sec:authorize access="isAuthenticated()">
                <jsp:include page="authenticatedTopBar.jsp"/>
            </sec:authorize>
            <sec:authorize access="!isAuthenticated()">
                <jsp:include page="notAuthenticatedTopBar.jsp"/>
            </sec:authorize>
            <tr>
                <jsp:include page="accountTable.jsp"/>
                <td>
                    <table class="tweetTable">
                        <c:forEach items="${tweetList}" var="tweet">
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                <a class="description" href="<c:url value="/account/show/${tweet.account.username}" />">${tweet.account.description}</a>
                                                &nbsp;
                                                @${tweet.account.username}
                                                &nbsp;
                                                <fmt:formatDate value="${tweet.date}" pattern="dd.MM.yyyy HH:mm:ss"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                ${tweet.text}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </c:forEach>
                    </table>
                </td>
                <sec:authorize access="!isAuthenticated() or principal.username == '${account.username}'">
                    <jsp:include page="companyTable.jsp"/>
                </sec:authorize>
                <sec:authorize access="isAuthenticated() and principal.username != '${account.username}'">
                    <jsp:include page="followTable.jsp"/>
                </sec:authorize>
            </tr>
        </table>
    </div>
</div>
</body>
</html>
