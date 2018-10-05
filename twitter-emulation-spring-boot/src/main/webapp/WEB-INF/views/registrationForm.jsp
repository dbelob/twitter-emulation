<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/style.css" />">
</head>
<body onload="document.accountForm.username.focus();">
<div class="webPage">
    <h1>Registration</h1>

    <sf:form name="accountForm" method="POST" modelAttribute="accountForm">
        <sf:errors path="*" element="div" cssClass="errors"/>
        <table class="centered">
            <tr>
                <td><sf:label path="username" cssErrorClass="error">Username</sf:label>:</td>
                <td><sf:input path="username" cssErrorClass="error"/></td>
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
            <a href="<c:url value="/login" />">Log in</a>
            &nbsp;
            <input type="submit" value="Register"/>
        </p>
    </sf:form>
</div>
</body>
</html>
