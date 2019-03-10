<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/style.css" />">
</head>
<body>
<div class="webPage">
    <table class="mainTable centered">
        <jsp:include page="topBar.jsp"/>
        <tr>
            <jsp:include page="accountInfo.jsp"/>
            <td>
                <h3>${title}</h3>
                <table class="searchResultTable">
                    <c:forEach items="${searchAccountList}" var="searchAccount">
                        <tr>
                            <td>
                                <a class="description" href="<c:url value="/account/show/${searchAccount.username}" />">${searchAccount.description}</a>
                                &nbsp;
                                @${searchAccount.username}
                            </td>
                        </tr>
                    </c:forEach>
                </table>
            </td>
            <jsp:include page="follow.jsp"/>
        </tr>
    </table>
</div>
</body>
</html>
