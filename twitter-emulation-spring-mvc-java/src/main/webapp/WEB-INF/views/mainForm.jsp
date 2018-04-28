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
                        <span class="description">${account.description}</span>
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
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <span class="description">Description</span>&nbsp;@user&nbsp;29.04.2018 00:42
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <span class="description">Description</span>&nbsp;@user&nbsp;29.04.2018 00:42
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <span class="description">Description</span>&nbsp;@user&nbsp;29.04.2018 00:42
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <span class="description">Description</span>&nbsp;@user&nbsp;29.04.2018 00:42
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <span class="description">Description</span>&nbsp;@user&nbsp;29.04.2018 00:42
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <span class="description">Description</span>&nbsp;@user&nbsp;29.04.2018 00:42
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </td>
                            </tr>
                        </table>
                    </td>
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
