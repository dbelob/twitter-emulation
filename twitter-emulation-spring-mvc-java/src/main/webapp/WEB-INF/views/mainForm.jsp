<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
    <title>Twitter</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/resources/style.css" />">
</head>
<body>
<table class="mainTable">
    <tr>
        <td>
            <a href="<c:url value="/account/${account.username}" />">Main</a>
        </td>
        <td></td>
        <td>
            <a href="<c:url value="/account/login" />">Log out</a>
        </td>
    </tr>
    <tr>
        <td>
            <table class="accountTable">
                <tr>
                    <td>
                        ${account.description}
                    </td>
                </tr>
                <tr>
                    <td>
                        @${account.username}
                    </td>
                </tr>
            </table>
        </td>
        <td>
            <table class="twitterTable">
                <tr>
                    <td>First</td>
                </tr>
                <tr>
                    <td>Second</td>
                </tr>
                <tr>
                    <td>Third</td>
                </tr>
                <tr>
                    <td>Fourth</td>
                </tr>
                <tr>
                    <td>Fifth</td>
                </tr>
                <tr>
                    <td>Sixth</td>
                </tr>
            </table>
        </td>
        <td>
            <table class="companyTable">
                <tr>
                    <td>
                        &copy; Acme, 2018
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
