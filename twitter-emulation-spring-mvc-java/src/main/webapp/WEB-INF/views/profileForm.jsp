<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ page session="false" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<h1>Profile</h1>

<sf:form method="POST" modelAttribute="accountForm">
    <sf:errors path="*" element="div" cssClass="errors"/>
    <table>
        <tr>
            <td><sf:label path="username" cssErrorClass="error">Username</sf:label>:</td>
            <td><sf:input path="username" disabled="true" cssErrorClass="error"/></td>
        </tr>
        <tr>
            <td><sf:label path="password" cssErrorClass="error">Password</sf:label>:</td>
            <td><sf:password path="password" cssErrorClass="error"/></td>
        </tr>
        <tr>
            <td><sf:label path="passwordConfirmation" cssErrorClass="error">Confirmation</sf:label>:</td>
            <td><sf:password path="passwordConfirmation" cssErrorClass="error"/></td>
        </tr>
        <tr>
            <td><sf:label path="description" cssErrorClass="error">Description</sf:label>:</td>
            <td><sf:input path="description" cssErrorClass="error"/></td>
        </tr>
    </table>
    <p>
        <a href="<c:url value="/account/delete/${accountForm.username}" />">Delete</a>
        &nbsp;
        <input type="submit" value="Cancel"/>
        <input type="submit" value="Save"/>
    </p>
</sf:form>
</body>
</html>
