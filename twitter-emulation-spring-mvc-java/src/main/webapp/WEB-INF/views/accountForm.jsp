<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
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
            <jsp:include page="topBar.jsp"/>
            <tr>
                <jsp:include page="accountTable.jsp"/>
                <td>
                    <c:if test="${title != null}">
                        <h3>${title}</h3>
                    </c:if>
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
                <jsp:include page="rightTable.jsp"/>
            </tr>
        </table>
    </div>
</div>
</body>
</html>
