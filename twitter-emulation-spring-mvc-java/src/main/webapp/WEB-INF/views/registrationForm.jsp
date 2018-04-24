<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<h1>Registration</h1>

<form method="POST">
    <table>
        <tr>
            <td>Username:</td>
            <td><input type="text" name="username"/></td>
        </tr>
        <tr>
            <td>Password:</td>
            <td><input type="password" name="password"/></td>
        </tr>
        <tr>
            <td>Confirmation:</td>
            <td><input type="password" name="passwordConfirmation"/></td>
        </tr>
        <tr>
            <td>Description:</td>
            <td><input type="text" name="description"/></td>
        </tr>
    </table>
    <p>
        <a href="<c:url value="/login" />">Log in</a>
        <input type="submit" value="Register"/>
    </p>
</form>
</body>
</html>
