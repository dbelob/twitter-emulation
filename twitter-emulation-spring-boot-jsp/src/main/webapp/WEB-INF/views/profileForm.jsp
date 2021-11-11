<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/css/style.css" />">
</head>
<body onload="document.accountForm.password.focus();">
<div class="webPage">
    <h1>Profile</h1>

    <sf:form name="accountForm" method="POST" modelAttribute="accountForm">
        <sf:errors path="*" element="div" cssClass="errors"/>
        <table class="centered">
            <tr>
                <td><sf:label path="username" cssErrorClass="error">Username</sf:label>:</td>
                <td><sf:input path="username" readonly="true" cssErrorClass="error"/></td>
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
            <input type="submit" name="save" value="Save"/>
            <input type="submit" name="cancel" value="Cancel"/>
            &nbsp;
            <a href="<c:url value="/account/delete" />">Delete</a>
        </p>
    </sf:form>
</div>
</body>
</html>
