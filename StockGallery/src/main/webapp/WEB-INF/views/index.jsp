<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Stock Gallery</title>
<link rel="stylesheet" href="resources/css/index.css">
<link rel="stylesheet" href="resources/css/home.css">
<link rel="stylesheet" href="resources/css/member.css">
<link rel="stylesheet" href="resources/css/search.css">
<link rel="stylesheet" href="resources/css/sns.css">
<script type="text/javascript" src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="https://canvasjs.com/assets/script/canvasjs.stock.min.js"></script>
<script type="text/javascript" src="resources/js/go.js"></script>
<script type="text/javascript" src="resources/js/loginCheck.js"></script>
<script type="text/javascript" src="resources/js/sg_jQuery.js"></script>
<script type="text/javascript" src="resources/js/snsCheck.js"></script>
<script type="text/javascript" src="resources/js/member_jQuery.js"></script>
<script type="text/javascript" src="resources/js/jQuery.js"></script>
<script type="text/javascript" src="resources/js/validCheck.js"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

</head>
<body>
	
	<div id="header">
		<div class="logo"><a href="index.do"><img class="logoImg" src="resources/img/stockGallery.png"></a>
		</div>
		<span class="alert">${r }</span>
		
		<div class="loginCategory">
		<jsp:include page="${loginPage }"></jsp:include>
		</div>
		
		<div class="menuArea">
			<div class="menuAreaTab"><a href="sns.go">게시판</a></div>
			<div class="menuAreaTab"><a href="stock.search">종목정보</a></div>
		</div>
	</div>
	<div id="mainArea" align="center"><jsp:include page="${contentPage }"></jsp:include></div>
	<table id="today"></table>
</body>
</html>