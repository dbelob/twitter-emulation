<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<table class="mainTable">
    <tr>
        <td>
            <a href="<c:url value="/account/${account.username}" />">Main</a>
        </td>
        <td></td>
        <td>
            <sf:form action="${pageContext.request.contextPath}/tweet/${account.username}" method="GET">
                <input type="submit" value="Tweet"/>
                &nbsp;
                <a href="<c:url value="/account/profile/${account.username}" />">Profile</a>
                &nbsp;
                <a href="<c:url value="/account/login" />">Log out</a>
            </sf:form>
        </td>
    </tr>
    <tr>
        <td>
            <table class="accountTable">
                <tr>
                    <td>
                        <span class="description">${account.description}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        @${account.username}
                    </td>
                </tr>
            </table>
        </td>
        <td>
            <table class="twitterTable">
                <c:forEach items="${tweetList}" var="tweet">
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        <span class="description">${tweet.account.description}</span>&nbsp;@${tweet.account.username}&nbsp;<fmt:formatDate value="${tweet.date}" pattern="dd.MM.yyyy HH:mm:ss" />
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
        <td>
            <table class="companyTable">
                <tr>
                    <td>
                        &copy; Acme, 2018
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
