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
		<form action="member.update" method="post" enctype="multipart/form-data" name="joinForm" onsubmit="return memberUpdateCheck();">
			<div><input name="sg_email" class="joinEmailInput" value="${sessionScope.loginMember.sg_email }" readonly="readonly" autocomplete="off"></div>
			<div><input name="sg_name" class="joinInput" value="${sessionScope.loginMember.sg_name }" readonly="readonly" autocomplete="off"></div>
			<div><input name="sg_pw" class="joinInput" value="${sessionScope.loginMember.sg_pw }" placeholder="4~12자"maxlength="12" autocomplete="off" type="password"></div>
			<div><input name="sg_addr1" class="joinInputAddr1" value="${addr[2] }" placeholder="우편번호"><span class="addrBtn">[주소검색]</span></div>
			<div><input name="sg_addr2" class="joinInputAddr2" value="${addr[0] }" placeholder="주소"></div>
			<div><input name="sg_addr3" class="joinInputAddr3" value="${addr[1] }" placeholder="상세주소"></div>
			<div><input name="sg_gender" class="joinInput" value="${sessionScope.loginMember.sg_gender }" readonly="readonly"></div>
			<div>
			<img src="resources/img/${sessionScope.loginMember.sg_photo }">
			<input name="sg_photo" class="joinInput" placeholder="사진" type="file">
			</div>
			<div class="updateBtn"><button>수정</button></div>
		</form>
			<div class="byeBtn"><button onclick="bye();">탈퇴</button></div>
	</div>
</body>
</html>