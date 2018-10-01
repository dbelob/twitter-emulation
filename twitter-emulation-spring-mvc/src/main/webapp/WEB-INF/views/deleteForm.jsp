<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/style.css" />">
</head>
<body>
<div class="webPage">
    <div class="centered">
        <h1>Delete account</h1>

        <sf:form method="POST">
            <p>Are you sure to delete account '<sec:authentication property="principal.username" />'?</p>
            <p>
                <input type="submit" name="cancel" value="Cancel"/>
                <input type="submit" name="delete" value="Delete"/>
            </p>
        </sf:form>
    </div>
</div>
</body>
</html>
