<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<td>
    <table class="followTable">
        <tr>
            <td>
                <sf:form action="${pageContext.request.contextPath}/follow/${account.username}" method="GET">
                    <input type="submit" value="Follow"/>
                </sf:form>
            </td>
        </tr>
    </table>
</td>
