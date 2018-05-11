<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ page session="false" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<h1>Delete account</h1>

<sf:form method="POST">
    <p>Are you sure to delete account?</p>
    <p>
        <input type="submit" name="cancel" value="Cancel"/>
        <input type="submit" name="delete" value="Delete"/>
    </p>
</sf:form>
</body>
</html>
