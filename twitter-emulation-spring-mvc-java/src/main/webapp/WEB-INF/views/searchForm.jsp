<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<table class="mainTable">
    <jsp:include page="topBar.jsp" />
    <tr>
        <jsp:include page="accountTable.jsp" />
        <td>
            <table class="searchResultTable">
                <c:forEach items="${searchAccountList}" var="searchAccount">
                    <tr>
                        <td>
                            <span class="description">${searchAccount.description}</span>&nbsp;@${searchAccount.username}
                        </td>
                    </tr>
                </c:forEach>
            </table>
        </td>
        <jsp:include page="companyTable.jsp" />
    </tr>
</table>
</body>
</html>
