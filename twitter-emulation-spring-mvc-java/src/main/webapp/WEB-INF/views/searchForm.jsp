<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
        <table class="mainTable">
            <jsp:include page="topBar.jsp"/>
            <tr>
                <jsp:include page="accountTable.jsp"/>
                <td>
                    <table class="searchResultTable">
                        <c:forEach items="${searchAccountList}" var="searchAccount">
                            <tr>
                                <td>
                                    <a class="description" href="<c:url value="/account/${searchAccount.username}" />">${searchAccount.description}</a>
                                    &nbsp;
                                    @${searchAccount.username}
                                </td>
                            </tr>
                        </c:forEach>
                    </table>
                </td>
                <jsp:include page="companyTable.jsp"/>
            </tr>
        </table>
    </div>
</div>
</body>
</html>
