<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ page session="false" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<h1>Registration</h1>

<sf:form method="POST" modelAttribute="registrationForm">
    <sf:errors path="*" element="div" cssClass="errors"/>
    <table>
        <tr>
            <td><sf:label path="username" cssErrorClass="error">Username</sf:label>:</td>
            <td><sf:input path="username" cssErrorClass="error"/></td>
        </tr>
        <tr>
            <td><sf:label path="password" cssErrorClass="error">Password</sf:label>:</td>
            <td><sf:input path="password" cssErrorClass="error"/></td>
        </tr>
        <tr>
            <td><sf:label path="passwordConfirmation" cssErrorClass="error">Confirmation</sf:label>:</td>
            <td><sf:input path="passwordConfirmation" cssErrorClass="error"/></td>
        </tr>
        <tr>
            <td><sf:label path="description" cssErrorClass="error">Description</sf:label>:</td>
            <td><sf:input path="description" cssErrorClass="error"/></td>
        </tr>
    </table>
    <p>
        <a href="<c:url value="/account/login" />">Log in</a>
        &nbsp;
        <input type="submit" value="Register"/>
    </p>
</sf:form>
</body>
</html>
