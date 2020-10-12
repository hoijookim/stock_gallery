<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="memberArea" align="center">
		<form action="member.login" class="loginArea" name="loginForm" onsubmit="loginCheck()" method="post">
			<input class="loginInput" name="sg_email" placeholder="이메일 주소 입력"><p>	
			<input class="loginInput" name="sg_pw" placeholder="비밀번호 입력" type="password"><p>	
			<button class="loginBtn">로그인</button>
		</form>
		<div class="joinClick">아직 계정이 없으신가요? <span class="joinClick"><a href="join.go">가입하기</a></span></div>
	</div>
</body>
</html>