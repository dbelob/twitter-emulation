<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<sec:authorize access="!isAuthenticated() or principal.username == '${account.username}'">
    <jsp:include page="companyTable.jsp"/>
</sec:authorize>
<sec:authorize access="isAuthenticated() and principal.username != '${account.username}'">
    <jsp:include page="followTable.jsp"/>
</sec:authorize>
