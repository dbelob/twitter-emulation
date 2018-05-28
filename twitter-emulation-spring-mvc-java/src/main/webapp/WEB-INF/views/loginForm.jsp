<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%@ page session="false" contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body onload="document.loginForm.username.focus();">
<div class="webPage">
    <div class="centered">
        <h1>Log in</h1>

        <form name="loginForm" action="<c:url value="/login" />" method="POST">
            <!-- use param.error assuming FormLoginConfigurer#failureUrl contains the query parameter error -->
            <c:if test="${param.error != null}">
                <div class="errors">
                    Failed to login.
                    <c:if test="${SPRING_SECURITY_LAST_EXCEPTION != null}">
                        Reason: <c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}" />
                    </c:if>
                </div>
            </c:if>
            <!-- the configured LogoutConfigurer#logoutSuccessUrl is /login?logout and contains the query param logout -->
            <c:if test="${param.logout != null}">
                <div>
                    You have been logged out.
                </div>
            </c:if>

            <table class="centered">
                <tr>
                    <td>Username:</td>
                    <td><input type="text" name="username"/></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="password" name="password"/></td>
                </tr>
            </table>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            <p>
                <a href="<c:url value="/account/register" />">Register</a>
                &nbsp;
                <input type="submit" value="Log in"/>
            </p>
        </form>
    </div>
</div>
</body>
</html>
