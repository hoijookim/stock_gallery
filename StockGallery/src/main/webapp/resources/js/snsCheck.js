function msgCheck() {
	var msgInput = document.msgForm.sgs_txt;
	
	if (checkLetter(msgInput)) {
		alert("글?");
		msgInput.value="";
		msgInput.focus();
		return false;
	}
	return true;
}

function snsSearchCheck() {
	var searchInput = document.snsSearchForm.search;

	if (checkLetter(searchInput)) {
		alert("내용을 입력하세요");
		searchInput.value = "";
		searchInput.focus();
		return false;
	}
	return true;
}

function snsWriteCheck() {
	var txtInput = document.snsWriteForm.sgs_txt;

	if (checkLetter(txtInput)) {
		alert("내용을 입력하세요");
		txtInput.value = "";
		txtInput.focus();
		return false;
	}
	return true;
}
function snsWriteReplyCheck(f) {
	// <form name="snsWriteReplyForm">속의 <input name="sgsr_txt">
	var txtInput = f.sgsr_txt;
	
	if (checkLetter(txtInput)) {
		alert("내용을 입력하세요");
		txtInput.value="";
		txtInput.focus();
		return false;
	}
	return true;
}

function snsWriteLoginCheck(){
	
}
