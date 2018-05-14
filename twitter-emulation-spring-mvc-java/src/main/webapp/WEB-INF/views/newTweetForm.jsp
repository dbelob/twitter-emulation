<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<h1>New tweet</h1>

<sf:form method="POST" modelAttribute="tweetForm">
    <sf:errors path="*" element="div" cssClass="errors"/>
    <sf:textarea path="text" cssClass="tweetTextarea"/>
    <p>
        <input type="submit" name="cancel" value="Cancel"/>
        <input type="submit" name="tweet" value="Tweet"/>
    </p>
</sf:form>
</body>
</html>
