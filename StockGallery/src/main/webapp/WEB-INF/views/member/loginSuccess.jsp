<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<span><img class="loginImg" src="resources/img/${sessionScope.loginMember.sg_photo }"></span>
	<span class="loginName">${sessionScope.loginMember.sg_name }</span>
	<table id="memberAreaTbl">
		<tr>
			<td class="memberAreaGo"><button onclick="memberInfoGo();">회원정보</button></td>
			<td class="memberAreaGo"><button onclick="logout();">로그아웃</button></td>
		</tr>
		
	
	</table>
</body>
</html>