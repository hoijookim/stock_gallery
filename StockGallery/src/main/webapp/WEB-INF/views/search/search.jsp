<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript">
	
</script>

<title>Insert title here</title>
</head>
<body>
	<div align="center" class="searchArea">
			<input class="corp_name" name="corp_name" placeholder="종목명 검색" autocomplete="off">
			<button class="searchBtn">검색</button>
		<table class="searchResultArea" style="background-color: transparent;"></table>
	</div>
	<div align="center" id="searchResultMain">
		<div id="wrapCompany">
			<h2 class="wrapCompanyH2"></h2>
			<div class="wrapCompanyDiv"></div>
		</div>
		<div id="content">
			<div id="chartArea">
				<div class="rateInfo">
					<div class="today">
						<table id="priceInfo">
							<tr><td class="todayCurrentPrice"></td></tr>
							<tr>
								<td class="todayRateMenu">전일대비</td>
								<td class="upDown"></td>
								<td class="comparePrevPrice"></td>
								<td class="compareRatio"></td>
							</tr>
						</table>
					</div>
					<div class="todayRateInfo">
						<table>
							<tr>
								<td class="todayRateMenu" align="center">전일</td>
								<td class="yesterdayPrice" align="center"></td>
								<td class="todayRateMenu" align="center">고가</td>
								<td class="todayHighPrice" align="center"></td>
								<td class="todayRateMenu" align="center">거래량</td>
								<td class="todayTradeAmount" align="center" colspan="2"></td>
							</tr>
							<tr>
								<td class="todayRateMenu" align="center">시가</td>
								<td class="todayStartPrice" align="center"></td>
								<td class="todayRateMenu" align="center">저가</td>
								<td class="todayLowPrice" align="center"></td>
								<td class="todayRateMenu" align="center">거래대금</td>
								<td class="todayTradePrice" align="right"></td>
								<td class="todayRateMenu1">백만</td>
							</tr>
						</table>
					</div>
				</div>
				<div id="chartContainer" style="height: 450px; width: 100%;"></div>
			</div>
			
		</div>
		<div id="financeInfoArea">
			<div align="left"  class="corpPart">기업실적분석</div>
				<table class="corpFinanceInfo" border="1">
					<tr>
						<th rowspan="2">주요재무정보</th>
						<th colspan="3">최근연간실적</th>
						<th colspan="4">분기실적</th>
					</tr>
					<tr>
						<td class="twoYear">2017.12</td>
						<td class="lastYear">2018.12</td>
						<td class="curYear">2019.12</td>
						<td class="fourthQ">2019.03</td>
						<td class="thirdQ">2019.06</td>
						<td class="secondQ">2019.09</td>
						<td class="recentQ">2019.12</td>
					</tr>
					<tr>
						<th>매출액(억원)</th>
						<td class="twoYearslastSales"></td>
						<td class="lastYearSales"></td>
						<td class="curYearSales"></td>
						<td class="fourthQSales"></td>
						<td class="thirdQSales"></td>
						<td class="secondQSales"></td>
						<td class="recentQSales"></td>
					</tr>
					<tr>
						<th>영업이익(억원)</th>
						<td class="twoYearsLastOi"></td>
						<td class="lastYearOi"></td>
						<td class="curYearOi"></td>
						<td class="fourthQOi"></td>
						<td class="thirdQOi"></td>
						<td class="secondQOi"></td>
						<td class="recentQOi"></td>
					</tr>
					<tr>
						<th>당기순이익(억원)</th>
						<td class="twoYearsLastNi"></td>
						<td class="lastYearNi"></td>
						<td class="curYearNi"></td>
						<td class="fourthQNi"></td>
						<td class="thirdQNi"></td>
						<td class="secondQNi"></td>
						<td class="recentQNi"></td>
					</tr>
					<tr>
						<th>영업이익률(%)</th>
						<td class="twoOiPercent"></td>
						<td class="lastOiPercent"></td>
						<td class="curOiPercent"></td>
						<td class="fourthQOiPercent"></td>
						<td class="thirdQOiPercent"></td>
						<td class="secondQOiPercent"></td>
						<td class="recentQOiPercent"></td>
					</tr>
					<tr>
						<th>순이익률(%)</th>
						<td class="twoNiPercent"></td>
						<td class="lastNiPercent"></td>
						<td class="curNiPercent"></td>
						<td class="fourthQNiPercent"></td>
						<td class="thirdQNiPercent"></td>
						<td class="secondQNiPercent"></td>
						<td class="recentQNiPercent"></td>
					</tr>
					<tr>
						<th>ROE</th>
						<td class="twoROE"></td>
						<td class="lastROE"></td>
						<td class="curROE"></td>
						<td class="fourthQROE"></td>
						<td class="thirdQROE"></td>
						<td class="secondQROE"></td>
						<td class="recentQROE"></td>
					</tr>
				
				</table>
		</div>
	</div>

</body>
</html>