<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="boxTodayIndex">
			<div class="kospi">
				<h2>코스피 지수</h2>
				<div class="kospiIndex">
  				  <strong class="kospiPrice"></strong>
   				  <span class="kospiImg"></span>
  				  <span class="kospiUpDownRange"></span>
   				  <span class="kospiRatio"></span>
				</div>
				<img class="kospiChart" src="https://t1.daumcdn.net/finance/chart/kr/daumindex/i/D0011001.png?t=202010012130" alt="일별 차트">
			</div>
			<div class="kosdaq">
				<h2>코스닥 지수</h2>
				<div class="kosdaqIndex">
  				  <strong class="kosdaqPrice"></strong>
   				  <span class="kosdaqImg"></span>
  				  <span class="kosdaqUpDownRange"></span>
   				  <span class="kosdaqRatio"></span>
				</div>
				<img class="kosdaqChart" src="https://t1.daumcdn.net/finance/chart/kr/daumindex/i/E4012001.png?t=202010012130" alt="일별 차트">
			</div>
	</div>
</body>
</html>