function connectSNSWriteAreaSummonEvent(){
	var swaVisible = false;
	$("#snsWriteAreaSummoner").click(function(){
		if (swaVisible) {
			$("#snsWriteArea").css("left", "-420px");
		}else {
			$("#snsWriteArea").css("left", "0px");
		}
		swaVisible = !swaVisible;
	});
}

function connectIdCheckEvent(){
	$(".joinEmailInput").keyup(function(e){
			var sg_email = $(this).val();
			$.getJSON("member.idcheck?sg_email="+sg_email, function(data){
				if(data.member[0] !== null){
					$(".sg_email").css("color", "red");
				} else {
					$(".sg_email").css("color", "black");
				}
			});
			return false;
	});
}

function connectAddressSearchEvent(){
	$(".addrBtn").click(function(){
		  new daum.Postcode({
		        oncomplete: function(data) {
		            // alert(JSON.stringify(data));
		        	$(".joinInputAddr1").val(data.zonecode);
		        	$(".joinInputAddr2").val(data.address);
		        }
		    }).open();
	})
}

function infoAreaSummonEvent(){
	$(".loginName").mouseenter(function(){
		$("#memberAreaTbl").css("visibility", "visible");
		$("#memberAreaTbl").css("transition", "all 2s ease-out");
	});
	$(".loginName").mouseleave(function(){
		$("#memberAreaTbl").css("transition", "all 2s ease-out");
		$("#memberAreaTbl").css("visibility", "hidden");
	});
}

$(function(){
	connectAddressSearchEvent();
	connectIdCheckEvent();
	connectSNSWriteAreaSummonEvent();
	infoAreaSummonEvent();
});
