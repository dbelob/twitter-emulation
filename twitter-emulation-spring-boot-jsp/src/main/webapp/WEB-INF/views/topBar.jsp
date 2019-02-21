<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<sec:authorize access="isAuthenticated()">
    <jsp:include page="authenticatedTopBar.jsp"/>
</sec:authorize>
<sec:authorize access="!isAuthenticated()">
    <jsp:include page="unauthenticatedTopBar.jsp"/>
</sec:authorize>
