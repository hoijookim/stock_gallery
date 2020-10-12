
var x = false;
var corp_name = null;
function connectStockCheckEvent() {
	$(".corp_name").keyup(function(e){

		corp_name = $(this).val();
		$.getJSON("stock.check?corp_name="+corp_name, function(data){
			var sDiv = null;
			var cDiv = null;
			var tr = null;
			
			if (data.stock[0] !== null) {
				sDiv = $("<td></td>").text(corp_name);
				cDiv = $("<td></td>").text(data.stock[0].stock_code);
				tr = $("<tr></tr>").append(sDiv, cDiv);
				
				if (x == false) {
					$(".searchResultArea").empty();
					$(".searchResultArea").append(tr);
					$(".searchResultArea").css("background-color", "white");
					$(".searchResultArea").css("border", "solid 1px");
					x = true;
				}
			} else {
				x = false;
				$(".searchResultArea").empty();
				$(".searchResultArea").css("background-color", "transparent");
				$(".searchResultArea").css("border", "none");
			}
		});
		return false;
	});
}

var corp_code = null;
var y = null;
var z = null;
var year = new Date().toDateString().split(" ");
year = year[3] - 1;
function connectStockInfo(){

	$(".searchBtn").click(function(){
		$(".searchResultArea").empty();
		$(".searchResultArea").css("background-color", "transparent");
		$(".searchResultArea").css("border", "none");
		var corp_name = $(".corp_name").val();
		currentStockData(corp_name);
		clearInterval(z);
		z = setInterval(function(){
			$(".searchResultArea").empty();
			currentStockData(corp_name);
		}, 3000);
		
		var stock_code = null;
		$.getJSON("stock.check?corp_name="+corp_name, function(data){
			corp_code = data.stock[0].corp_code;
			stock_code = data.stock[0].stock_code;
			connectChartData(stock_code);
			connectFinanceInfo(corp_code);
			if(data.stock[0] !== null) {
				
				$("#content").css("visibility", "visible");
				$("#financeInfoArea").css("visibility", "visible");
				$(".wrapCompanyH2").text(corp_name);
				$(".wrapCompanyDiv").text(data.stock[0].stock_code);
				
			}else {
				$("#content").css("visibility", "hidden");
				$("#financeInfoArea").css("visibility", "hidden");
				alert("해당종목을 검색할 수 없습니다.");
				location.href="stock.search";
			}
		});
	});
}
function currentIndexData(){
	$.ajax({
		url : "stock.go",
		data : {corp_name : "KOSPI"},
		success : function(data){
			$(".kospiPrice").empty();
			$(".kospiImg").empty();
			$(".kospiUpDownRange").empty();
			$(".kospiRatio").empty();
			$(".kosdaqPrice").empty();
			$(".kosdaqImg").empty();
			$(".kosdaqUpDownRange").empty();
			$(".kosdaqRatio").empty();
			var kospiIndex = $(data).find("stockInfo").attr("kospiJisu");
			var kospiUpDown = $(data).find("stockInfo").attr("kospiDebi");
			var kosdaqIndex = $(data).find("stockInfo").attr("kosdaqJisu");
			var kosdaqUpDown = $(data).find("stockInfo").attr("kosdaqJisuDebi");
			
			var kospiRatio = ((kospiUpDown * 1) / (kospiIndex * 1)) * 100;
			var kosdaqRatio = ((kosdaqUpDown * 1) / (kosdaqIndex * 1)) * 100;
			kospiRatio = kospiRatio.toFixed(2);
			kosdaqRatio = kosdaqRatio.toFixed(2);
			if (kospiRatio > 0) {
				$(".kospiRatio").text("+" + kospiRatio + "%");
			} else {
				$(".kospiRatio").text(kospiRatio + "%");
			}
			if (kosdaqRatio > 0) {
				$(".kosdaqRatio").text("+" + kosdaqRatio + "%");
			} else {
				$(".kosdaqRatio").text(kosdaqRatio + "%");
			}

			$(".kospiPrice").text(kospiIndex);
			$(".kospiUpDownRange").text(kospiUpDown);
			$(".kosdaqPrice").text(kosdaqIndex);
			$(".kosdaqUpDownRange").text(kosdaqUpDown);
			
			var kospiBuho = $(data).find("stockInfo").attr("kospiBuho");
			var kosdaqBuho = $(data).find("stockInfo").attr("kosdaqJisuBuho");
			var upImg = $("<img>").attr("src", "resources/img/up.png").css("max-height", "14px");
			var downImg = $("<img>").attr("src", "resources/img/down.png").css("max-height", "14px");
			if(kospiBuho == "1" || kospiBuho == "2") {
				$(".kospiPrice").css("color", "red");
				$(".kospiUpDownRange").css("color", "red");
				$(".kospiRatio").css("color", "red");
				$(".kospiImg").text("▲");
				$(".kospiImg").css("color", "red");
			} else if (kospiBuho == "4" || kospiBuho == "5") {
				$(".kospiPrice").css("color", "blue");
				$(".kospiUpDownRange").css("color", "blue");
				$(".kospiRatio").css("color", "blue");
				$(".kospiImg").text("▼");
				$(".kospiImg").css("color", "blue");
			} else {
				$(".kospiPrice").css("color", "black");
				$(".kospiUpDownRange").css("color", "black");
				$(".kospiRatio").css("color", "black");
			}
			if(kosdaqBuho == "1" || kosdaqBuho == "2") {
				$(".kosdaqPrice").css("color", "red");
				$(".kosdaqUpDownRange").css("color", "red");
				$(".kosdaqRatio").css("color", "red");
				$(".kosdaqImg").text("▲");
				$(".kosdaqImg").css("color", "red");
			} else if (kosdaqBuho == "4" || kosdaqBuho == "5") {
				$(".kosdaqPrice").css("color", "blue");
				$(".kosdaqUpDownRange").css("color", "blue");
				$(".kosdaqRatio").css("color", "blue");
				$(".kosdaqImg").text("▼");
				$(".kosdaqImg").css("color", "blue");
			} else {
				$(".kosdaqPrice").css("color", "black");
				$(".kosdaqUpDownRange").css("color", "black");
				$(".kosdaqRatio").css("color", "black");
			}
		}
	});
}


// 현재가 실시간
function currentStockData(corp_name){
	$(".searchResultArea").empty();
	$.ajax({
		url : "stock.go",
		data : {corp_name : corp_name},
		success : function(data){
				$(".upDown").empty();
				$(".comparePrevPrice").empty();
				$(".yesterdayPrice").empty();
				$(".todayCurrentPrice").empty();
				$(".todayStartPrice").empty();
				$(".todayHighPrice").empty();
				$(".todayLowPrice").empty();
				$(".todayTradeAmount").empty();
				$(".todayTradePrice").empty();
				$(".compareRatio").empty();
			var yesterdayPrice = $(data).find("TBL_StockInfo").attr("PrevJuka");
			var comparePrevPrice = $(data).find("TBL_StockInfo").attr("Debi");
			var curPrice = $(data).find("TBL_StockInfo").attr("CurJuka");
			var upDown = $(data).find("TBL_StockInfo").attr("DungRak");
			var startPrice = $(data).find("TBL_StockInfo").attr("StartJuka");
			var highPrice = $(data).find("TBL_StockInfo").attr("HighJuka");
			var lowPrice = $(data).find("TBL_StockInfo").attr("LowJuka");
			var tradeVolume = $(data).find("TBL_StockInfo").attr("Volume");
			var tradeAmount = $(data).find("TBL_StockInfo").attr("Money");
			tradeAmount = tradeAmount.split(",");
			var tradeAmountShort = "";
			for (var i = 0; i < tradeAmount.length - 2; i++) {
				if (i == (tradeAmount.length - 3)) {
					tradeAmountShort += tradeAmount[i];
				} else{
					tradeAmountShort += tradeAmount[i] + ",";
				}
			}
			var upImg = $("<img>").attr("src", "resources/img/up.png").css("max-height", "14px");
			var downImg = $("<img>").attr("src", "resources/img/down.png").css("max-height", "14px");
			if(upDown == "1" || upDown == "2") {
				$(".todayCurrentPrice").css("color", "red");
				$(".comparePrevPrice").css("color", "red");
				$(".compareRatio").css("color", "red");
				$(".upDown").append(upImg);
				
			} else if (upDown == "4" || upDown == "5") {
				$(".todayCurrentPrice").css("color", "blue");
				$(".comparePrevPrice").css("color", "blue");
				$(".compareRatio").css("color", "blue");
				$(".upDown").append(downImg);
			} else {
				$(".todayCurrentPrice").css("color", "black");
				$(".comparePrevPrice").css("color", "black");
				$(".compareRatio").css("color", "black");
				
			}
			$(".comparePrevPrice").text(comparePrevPrice);
			$(".yesterdayPrice").text(yesterdayPrice);
			$(".todayCurrentPrice").text(curPrice);
			$(".todayStartPrice").text(startPrice);
			$(".todayHighPrice").text(highPrice);
			$(".todayLowPrice").text(lowPrice);
			$(".todayTradeAmount").text(tradeVolume);
			$(".todayTradePrice").text(tradeAmountShort);
			var curPriceAsNum = "";
			var yesterdayPriceAsNum = "";
			
			if (curPrice.indexOf(",") != null) {
				curPrice = curPrice.split(",")
				for (var i = 0; i < curPrice.length; i++) {
					curPriceAsNum += curPrice[i];
				}
			} else{
				curPriceAsNum = curPrice;
			}
			if (yesterdayPrice.indexOf(",") != null) {
				yesterdayPrice = yesterdayPrice.split(",")
				for (var i = 0; i < yesterdayPrice.length; i++) {
					yesterdayPriceAsNum += yesterdayPrice[i];
				}
			} else{
				yesterdayPriceAsNum = yesterdayPrice;
			}
			var compareRatio = (((curPriceAsNum * 1) / (yesterdayPriceAsNum * 1)) - 1) * 100;
			compareRatio = compareRatio.toFixed(2);
			if (compareRatio > 0) {
				$(".compareRatio").text("+" + compareRatio + "%");
				
			} else {
				$(".compareRatio").text(compareRatio + "%");
			}
		},
	});
}
// 차트데이터
function connectChartData(stock_code){
	var dps1 = [], dps2= [];
	  var stockChart = new CanvasJS.StockChart("chartContainer",{
	    theme: "light2",
	    exportEnabled: true,
	    charts: [{
	      axisX: {
	        crosshair: {
	          enabled: true,
	          snapToDataPoint: true
	        }
	      },
	      axisY: {
	        prefix: "￦"
	      },
	      data: [{
	        type: "candlestick",
	        risingColor: "#FF1744",
	        fallingColor: "#2962FF",
	        yValueFormatString: "￦###,###",
	        dataPoints : dps1
	      }]
	    }],
	    navigator: {
	      data: [{
	        dataPoints: dps2
	      }],
	      slider: {
	        minimum: new Date(2020, 04, 01),
	        maximum: new Date(2020, 09, 22)
	      }
	    }
	  });
	  var dataLength = null;
	  $.getJSON("stock.chart?stock_code=" + stock_code, function(data) {
		var date = null; 
		dataLength = data.length;
	    for(var i = 0; i < data.length; i++){
	    	date = data[i].s_date;
	    	date = date.split(" ");
	    	dps1.push({x: new Date(date[0]), y: [Number(data[i].s_startprice), Number(data[i].s_highprice), Number(data[i].s_lowprice), Number(data[i].s_endprice)]});
	    	dps2.push({x: new Date(date[0]), y: Number(data[i].s_endprice)});
	    }
	    var curPrice = null;
	    var startPrice = null;
	    var highPrice = null;
	    var lowPrice = null;
	    $.ajax({
	    	url : "stock.go",
	    	data : {corp_name : corp_name},
	    	success : function(currentData){
	    		date = $(currentData).find("stockprice").attr("querytime");
	    		date = date.split(" ");
	    		curPrice = $(currentData).find("TBL_StockInfo").attr("CurJuka").replace(",", "");
	    		startPrice = $(currentData).find("TBL_StockInfo").attr("StartJuka").replace(",", "");
	    		highPrice = $(currentData).find("TBL_StockInfo").attr("HighJuka").replace(",", "");
	    		lowPrice = $(currentData).find("TBL_StockInfo").attr("LowJuka").replace(",", "");
	    		dps1.push({x: new Date(date[0]), y: [Number(startPrice), Number(highPrice), Number(lowPrice), Number(curPrice)]});
	    		dps2.push({x: new Date(date[0]), y: Number(curPrice)});
	    	}
	    });
	    clearInterval(y);
		y = setInterval(function(){
			$.ajax({
				url : "stock.go",
				data : {corp_name : corp_name},
				success : function(currentData){
					dps1.pop();
					dps2.pop();
					date = $(currentData).find("stockprice").attr("querytime");
					date = date.split(" ");
					curPrice = $(currentData).find("TBL_StockInfo").attr("CurJuka").replace(",", "");
					startPrice = $(currentData).find("TBL_StockInfo").attr("StartJuka").replace(",", "");
					highPrice = $(currentData).find("TBL_StockInfo").attr("HighJuka").replace(",", "");
					lowPrice = $(currentData).find("TBL_StockInfo").attr("LowJuka").replace(",", "");
					dps1.push({x: new Date(date[0]), y: [Number(startPrice), Number(highPrice), Number(lowPrice), Number(curPrice)]});
					dps2.push({x: new Date(date[0]), y: Number(curPrice)});
				}
			});
		}, 3000);	
	    stockChart.render();
	  });
}

// 기간별 요약재무상태표
function connectFinanceInfo(corp_code) {
	$(".curYearSales").empty();		$(".lastYearSales").empty();	$(".twoYearslastSales").empty();
	$(".curYearOi").empty();		$(".lastYearOi").empty();		$(".twoYearslastOi").empty();
	$(".curYearNi").empty();		$(".lastYearNi").empty();		$(".twoYearslastNi").empty();
	
	$(".curOiPercent").empty();		$(".lastOiPercent").empty();	$(".twoOiPercent").empty();
	$(".curNiPercent").empty();		$(".lastNiPercent").empty();	$(".twoNiPercent").empty();
	$(".curROE").empty();			$(".lastROE").empty();			$(".twoROE").empty();

	$(".fourthQSales").empty();		$(".thirdQSales").empty();		$(".secondQSales").empty();		$(".recentQSales").empty();
	$(".fourthQOi").empty();		$(".thirdQOi").empty();			$(".secondQOi").empty();		$(".recentQOi").empty();
	$(".fourthQNi").empty();		$(".thirdQNi").empty();			$(".secondQNi").empty();		$(".recentQNi").empty();
	$(".fourthQOiPercent").empty();	$(".thirdQOiPercent").empty();	$(".secondQOiPercent").empty();	$(".recentQOiPercent").empty();
	$(".fourthQNiPercent").empty();	$(".thirdQNiPercent").empty();	$(".secondQNiPercent").empty();	$(".recentQNiPercent").empty();
	$(".fourthQROE").empty();		$(".thirdQROE").empty();		$(".secondQROE").empty();		$(".recentQROE").empty();
	$.ajax({
		url : "stock.check.finance",
		data : {corp_code : corp_code, year : year, reprt_code : 11011},
		success : function(data){
			var curSales = null;	var lastSales = null;	var twoSales = null;
			var curOi = null;		var lastOi = null;		var twoOi = null;
			var curNi = null;		var lastNi = null;		var twoNi = null;
			var curEquity = null;	var lastEquity = null;	var twoEquity = null;
			$.each(data.list, function(i, d){
				// 자본총계
				if (d.account_nm == "자본총계") {
					curEquity = d.thstrm_amount;
					lastEquity = d.frmtrm_amount;
					twoEquity = d.bfefrmtrm_amount;
				}
				// 매출액
				if (d.sj_nm.includes("손익계산서") && ((d.account_nm.includes("매출액")) || (d.account_nm.includes("영업수익")))) {
					curSales = d.thstrm_amount;
					lastSales = d.frmtrm_amount;
					twoSales = d.bfefrmtrm_amount;
					var curYearSales = curSales.split("");
					var curYearSalesShort = "";
					for (var i = 0; i < curYearSales.length - 8; i++) {
						if (i == (curYearSales.length - 12) || i == (curYearSales.length - 15)) {
							curYearSalesShort += curYearSales[i] + ","; 
						} else {
							curYearSalesShort += curYearSales[i]; 
						}	
					}
					$(".curYearSales").text(curYearSalesShort);
					var lastYearSales = lastSales.split("");
					var lastYearSalesShort = "";
					for (var i = 0; i < lastYearSales.length - 8; i++) {
						if (i == (lastYearSales.length - 12) || i == (lastYearSales.length - 15)) {
							lastYearSalesShort += lastYearSales[i] + ","; 
						} else {
							lastYearSalesShort += lastYearSales[i]; 
						}	
					}
					$(".lastYearSales").text(lastYearSalesShort);
					var twoYearsLastSales = twoSales.split("");
					var twoYearsLastSalesShort = "";
					for (var i = 0; i < twoYearsLastSales.length - 8; i++) {
						if (i == (twoYearsLastSales.length - 12) || i == (twoYearsLastSales.length - 15)) {
							twoYearsLastSalesShort += twoYearsLastSales[i] + ","; 
						} else {
							twoYearsLastSalesShort += twoYearsLastSales[i]; 
						}	
					}
					$(".twoYearslastSales").text(twoYearsLastSalesShort);
				}

				// 영업이익
				if (d.sj_nm.includes("손익계산서") && d.account_nm == ("영업이익(손실)")) {
					curOi = d.thstrm_amount;
					lastOi = d.frmtrm_amount;
					twoOi = d.bfefrmtrm_amount;
					var curYearOi = curOi.split("");
					var curYearOiShort = "";
					for (var i = 0; i < curYearOi.length - 8; i++) {
						if (i == (curYearOi.length - 12) || i == (curYearOi.length - 15)) {
							curYearOiShort += curYearOi[i] + ","; 
						} else {
							curYearOiShort += curYearOi[i]; 
						}	
					}
					$(".curYearOi").text(curYearOiShort);
					var lastYearOi = lastOi.split("");
					var lastYearOiShort = "";
					for (var i = 0; i < lastYearOi.length - 8; i++) {
						if (i == (lastYearOi.length - 12) || i == (lastYearOi.length - 15)) {
							lastYearOiShort += lastYearOi[i] + ","; 
						} else {
							lastYearOiShort += lastYearOi[i]; 
						}	
					}
					$(".lastYearOi").text(lastYearOiShort);
					var twoYearsLastOi = twoOi.split("");
					var twoYearsLastOiShort = "";
					for (var i = 0; i < twoYearsLastOi.length - 8; i++) {
						if (i == (twoYearsLastOi.length - 12) || i == (twoYearsLastOi.length - 15)) {
							twoYearsLastOiShort += twoYearsLastOi[i] + ","; 
						} else {
							twoYearsLastOiShort += twoYearsLastOi[i]; 
						}	
					}
					$(".twoYearsLastOi").text(twoYearsLastOiShort);
				}
				
				// 당기순이익
				if (d.sj_nm.includes("손익계산서") && (d.account_nm == ("당기순이익(손실)"))) {
					curNi = d.thstrm_amount;
					lastNi = d.frmtrm_amount;
					twoNi = d.bfefrmtrm_amount;
					var curYearNi = curNi.split("");
					var curYearNiShort = "";
					for (var i = 0; i < curYearNi.length - 8; i++) {
						if (i == (curYearNi.length - 12) || i == (curYearNi.length - 15)) {
							curYearNiShort += curYearNi[i] + ","; 
						} else {
							curYearNiShort += curYearNi[i]; 
						}	
					}
					$(".curYearNi").text(curYearNiShort);
					var lastYearNi = lastNi.split("");
					var lastYearNiShort = "";
					for (var i = 0; i < lastYearNi.length - 8; i++) {
						if (i == (lastYearNi.length - 12) || i == (lastYearNi.length - 15)) {
							lastYearNiShort += lastYearNi[i] + ","; 
						} else {
							lastYearNiShort += lastYearNi[i]; 
						}	
					}
					$(".lastYearNi").text(lastYearNiShort);
					var twoYearsLastNi = twoNi.split("");
					var twoYearsLastNiShort = "";
					for (var i = 0; i < twoYearsLastNi.length - 8; i++) {
						if (i == (twoYearsLastNi.length - 12) || i == (twoYearsLastNi.length - 15)) {
							twoYearsLastNiShort += twoYearsLastNi[i] + ","; 
						} else {
							twoYearsLastNiShort += twoYearsLastNi[i]; 
						}	
					}
					$(".twoYearsLastNi").text(twoYearsLastNiShort);
				}
			});
			// 영업이익률
			var curOiPercent = (curOi*1) / (curSales*1) * 100;
			$(".curOiPercent").text(curOiPercent.toFixed(2) + "%");
			var lastOiPercent = (lastOi*1) / (lastSales*1) * 100;
			$(".lastOiPercent").text(lastOiPercent.toFixed(2) + "%");
			var twoOiPercent = (twoOi*1) / (twoSales*1) * 100;
			$(".twoOiPercent").text(twoOiPercent.toFixed(2) + "%");
			// 순이익률
			var curNiPercent = (curNi*1) / (curSales*1) * 100;
			$(".curNiPercent").text(curNiPercent.toFixed(2) + "%");
			var lastNiPercent = (lastNi*1) / (lastSales*1) * 100;
			$(".lastNiPercent").text(lastNiPercent.toFixed(2) + "%");
			var twoNiPercent = (twoNi*1) / (twoSales*1) * 100;
			$(".twoNiPercent").text(twoNiPercent.toFixed(2) + "%");
			// ROE
			var curROE = (curNi*1) / (curEquity*1) * 100;
			$(".curROE").text(curROE.toFixed(2) + "%");
			var lastROE = (lastNi*1) / (lastEquity*1) * 100;
			$(".lastROE").text(lastROE.toFixed(2) + "%");
			var twoROE = (twoNi*1) / (twoEquity*1) * 100;
			$(".twoROE").text(twoROE.toFixed(2) + "%");
		}
	});
	// 3분기
	$.ajax({
		url : "stock.check.finance",
		data : {corp_code : corp_code, year : year, reprt_code : 11014},
		success : function(data){
			var curSales = null;	
			var curOi = null;		
			var curNi = null;		
			var curEquity = null;	
			$.each(data.list, function(i, d){
				// 자본총계
				if (d.account_nm == "자본총계") {
					curEquity = d.thstrm_amount;
				}
				// 매출액
				if (d.sj_nm.includes("손익계산서") && ((d.account_nm.includes("매출액")) || (d.account_nm.includes("영업수익")))) {
					curSales = d.thstrm_amount;
					var curYearSales = curSales.split("");
					var curYearSalesShort = "";
					for (var i = 0; i < curYearSales.length - 8; i++) {
						if (i == (curYearSales.length - 12) || i == (curYearSales.length - 15)) {
							curYearSalesShort += curYearSales[i] + ","; 
						} else {
							curYearSalesShort += curYearSales[i]; 
						}	
					}
					$(".secondQSales").text(curYearSalesShort);
				}
				
				// 영업이익
				if (d.sj_nm.includes("손익계산서") && d.account_nm == ("영업이익(손실)")) {
					curOi = d.thstrm_amount;
					var curYearOi = curOi.split("");
					var curYearOiShort = "";
					for (var i = 0; i < curYearOi.length - 8; i++) {
						if (i == (curYearOi.length - 12) || i == (curYearOi.length - 15)) {
							curYearOiShort += curYearOi[i] + ","; 
						} else {
							curYearOiShort += curYearOi[i]; 
						}	
					}
					$(".secondQOi").text(curYearOiShort);
				}
				
				// 당기순이익
				if (d.sj_nm.includes("손익계산서") && (d.account_nm == ("당기순이익(손실)"))) {
					curNi = d.thstrm_amount;
					var curYearNi = curNi.split("");
					var curYearNiShort = "";
					for (var i = 0; i < curYearNi.length - 8; i++) {
						if (i == (curYearNi.length - 12) || i == (curYearNi.length - 15)) {
							curYearNiShort += curYearNi[i] + ","; 
						} else {
							curYearNiShort += curYearNi[i]; 
						}	
					}
					$(".secondQNi").text(curYearNiShort);
				}
			});
			// 영업이익률
			var curOiPercent = (curOi*1) / (curSales*1) * 100;
			$(".secondQOiPercent").text(curOiPercent.toFixed(2) + "%");
			// 순이익률
			var curNiPercent = (curNi*1) / (curSales*1) * 100;
			$(".secondQNiPercent").text(curNiPercent.toFixed(2) + "%");
			// ROE
			var curROE = (curNi*1) / (curEquity*1) * 100;
			$(".secondQROE").text(curROE.toFixed(2) + "%");
		}
	});
	// 4분기
	$.ajax({
		url : "stock.check.finance",
		data : {corp_code : corp_code, year : year, reprt_code : 11011},
		success : function(data){
			var curSales = null;	
			var curOi = null;		
			var curNi = null;		
			var curEquity = null;	
			$.each(data.list, function(i, d){
				// 자본총계
				if (d.account_nm == "자본총계") {
					curEquity = d.thstrm_amount;
				}
				// 매출액
				if (d.sj_nm.includes("손익계산서") && ((d.account_nm.includes("매출액")) || (d.account_nm.includes("영업수익")))) {
					curSales = d.thstrm_amount;
					var curYearSales = curSales.split("");
					var curYearSalesShort = "";
					for (var i = 0; i < curYearSales.length - 8; i++) {
						if (i == (curYearSales.length - 12) || i == (curYearSales.length - 15)) {
							curYearSalesShort += curYearSales[i] + ","; 
						} else {
							curYearSalesShort += curYearSales[i]; 
						}	
					}
					$(".recentQSales").text(curYearSalesShort);
				}
				
				// 영업이익
				if (d.sj_nm.includes("손익계산서") && d.account_nm == ("영업이익(손실)")) {
					curOi = d.thstrm_amount;
					var curYearOi = curOi.split("");
					var curYearOiShort = "";
					for (var i = 0; i < curYearOi.length - 8; i++) {
						if (i == (curYearOi.length - 12) || i == (curYearOi.length - 15)) {
							curYearOiShort += curYearOi[i] + ","; 
						} else {
							curYearOiShort += curYearOi[i]; 
						}	
					}
					$(".recentQOi").text(curYearOiShort);
				}
				
				// 당기순이익
				if (d.sj_nm.includes("손익계산서") && (d.account_nm == ("당기순이익(손실)"))) {
					curNi = d.thstrm_amount;
					var curYearNi = curNi.split("");
					var curYearNiShort = "";
					for (var i = 0; i < curYearNi.length - 8; i++) {
						if (i == (curYearNi.length - 12) || i == (curYearNi.length - 15)) {
							curYearNiShort += curYearNi[i] + ","; 
						} else {
							curYearNiShort += curYearNi[i]; 
						}	
					}
					$(".recentQNi").text(curYearNiShort);
				}
			});
			// 영업이익률
			var curOiPercent = (curOi*1) / (curSales*1) * 100;
			$(".recentQOiPercent").text(curOiPercent.toFixed(2) + "%");
			// 순이익률
			var curNiPercent = (curNi*1) / (curSales*1) * 100;
			$(".recentQNiPercent").text(curNiPercent.toFixed(2) + "%");
			// ROE
			var curROE = (curNi*1) / (curEquity*1) * 100;
			$(".recentQROE").text(curROE.toFixed(2) + "%");
		}
	});
	// 반기
	$.ajax({
		url : "stock.check.finance",
		data : {corp_code : corp_code, year : year, reprt_code : 11012},
		success : function(data){
			var curSales = null;	
			var curOi = null;		
			var curNi = null;		
			var curEquity = null;	
			$.each(data.list, function(i, d){
				// 자본총계
				if (d.account_nm == "자본총계") {
					curEquity = d.thstrm_amount;
				}
				// 매출액
				if (d.sj_nm.includes("손익계산서") && ((d.account_nm.includes("매출액")) || (d.account_nm.includes("영업수익")))) {
					curSales = d.thstrm_amount;
					var curYearSales = curSales.split("");
					var curYearSalesShort = "";
					for (var i = 0; i < curYearSales.length - 8; i++) {
						if (i == (curYearSales.length - 12) || i == (curYearSales.length - 15)) {
							curYearSalesShort += curYearSales[i] + ","; 
						} else {
							curYearSalesShort += curYearSales[i]; 
						}	
					}
					$(".thirdQSales").text(curYearSalesShort);
				}
				
				// 영업이익
				if (d.sj_nm.includes("손익계산서") && d.account_nm == ("영업이익(손실)")) {
					curOi = d.thstrm_amount;
					var curYearOi = curOi.split("");
					var curYearOiShort = "";
					for (var i = 0; i < curYearOi.length - 8; i++) {
						if (i == (curYearOi.length - 12) || i == (curYearOi.length - 15)) {
							curYearOiShort += curYearOi[i] + ","; 
						} else {
							curYearOiShort += curYearOi[i]; 
						}	
					}
					$(".thirdQOi").text(curYearOiShort);
				}
				
				// 당기순이익
				if (d.sj_nm.includes("손익계산서") && (d.account_nm == ("당기순이익(손실)"))) {
					curNi = d.thstrm_amount;
					var curYearNi = curNi.split("");
					var curYearNiShort = "";
					for (var i = 0; i < curYearNi.length - 8; i++) {
						if (i == (curYearNi.length - 12) || i == (curYearNi.length - 15)) {
							curYearNiShort += curYearNi[i] + ","; 
						} else {
							curYearNiShort += curYearNi[i]; 
						}	
					}
					$(".thirdQNi").text(curYearNiShort);
				}
			});
			// 영업이익률
			var curOiPercent = (curOi*1) / (curSales*1) * 100;
			$(".thirdQOiPercent").text(curOiPercent.toFixed(2) + "%");
			// 순이익률
			var curNiPercent = (curNi*1) / (curSales*1) * 100;
			$(".thirdQNiPercent").text(curNiPercent.toFixed(2) + "%");
			// ROE
			var curROE = (curNi*1) / (curEquity*1) * 100;
			$(".thirdQROE").text(curROE.toFixed(2) + "%");
		}
	});
	// 1분기
	$.ajax({
		url : "stock.check.finance",
		data : {corp_code : corp_code, year : year, reprt_code : 11013},
		success : function(data){
			var curSales = null;	
			var curOi = null;		
			var curNi = null;		
			var curEquity = null;	
			$.each(data.list, function(i, d){
				// 자본총계
				if (d.account_nm == "자본총계") {
					curEquity = d.thstrm_amount;
				}
				// 매출액
				if (d.sj_nm.includes("손익계산서") && ((d.account_nm.includes("매출액")) || (d.account_nm.includes("영업수익")))) {
					curSales = d.thstrm_amount;
					var curYearSales = curSales.split("");
					var curYearSalesShort = "";
					for (var i = 0; i < curYearSales.length - 8; i++) {
						if (i == (curYearSales.length - 12) || i == (curYearSales.length - 15)) {
							curYearSalesShort += curYearSales[i] + ","; 
						} else {
							curYearSalesShort += curYearSales[i]; 
						}	
					}
					$(".fourthQSales").text(curYearSalesShort);
				}
				
				// 영업이익
				if (d.sj_nm.includes("손익계산서") && d.account_nm == ("영업이익(손실)")) {
					curOi = d.thstrm_amount;
					var curYearOi = curOi.split("");
					var curYearOiShort = "";
					for (var i = 0; i < curYearOi.length - 8; i++) {
						if (i == (curYearOi.length - 12) || i == (curYearOi.length - 15)) {
							curYearOiShort += curYearOi[i] + ","; 
						} else {
							curYearOiShort += curYearOi[i]; 
						}	
					}
					$(".fourthQOi").text(curYearOiShort);
				}
				
				// 당기순이익
				if (d.sj_nm.includes("손익계산서") && (d.account_nm == ("당기순이익(손실)"))) {
					curNi = d.thstrm_amount;
					var curYearNi = curNi.split("");
					var curYearNiShort = "";
					for (var i = 0; i < curYearNi.length - 8; i++) {
						if (i == (curYearNi.length - 12) || i == (curYearNi.length - 15)) {
							curYearNiShort += curYearNi[i] + ","; 
						} else {
							curYearNiShort += curYearNi[i]; 
						}	
					}
					$(".fourthQNi").text(curYearNiShort);
				}
			});
			// 영업이익률
			var curOiPercent = (curOi*1) / (curSales*1) * 100;
			$(".fourthQOiPercent").text(curOiPercent.toFixed(2) + "%");
			// 순이익률
			var curNiPercent = (curNi*1) / (curSales*1) * 100;
			$(".fourthQNiPercent").text(curNiPercent.toFixed(2) + "%");
			// ROE
			var curROE = (curNi*1) / (curEquity*1) * 100;
			$(".fourthQROE").text(curROE.toFixed(2) + "%");
		}
	});
}


var q = null;
$(function(){
	connectStockCheckEvent();
	connectStockInfo();
	currentIndexData();
	clearInterval(q);
	q = setInterval(function(){
		currentIndexData();
	}, 10000);
	
});