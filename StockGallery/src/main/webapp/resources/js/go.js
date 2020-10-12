function joinGo(){
	location.href="member.join.go";
}

function logout() {
	var ok = confirm("로그아웃하시겠습니까");
	if (ok) {
		alert("확인");
		location.href="member.logout";
	}
}

function memberInfoGo() {
	location.href = "member.info.go";
}

function bye(){
	if (confirm("탈퇴하시겠습니까")) {
		location.href="member.bye";
	}
}

function snsMsgDelete(no) {
	if (confirm("게시글을 삭제하시겠습니까")) {
		location.href = "sns.delete?sgs_no=" + no;
	}
}
function snsReplyDelete(no) {
	if (confirm("댓글을 삭제하시겠습니까")) {
		location.href = "sns.reply.delete?sgsr_no=" + no;
	}
}

function snsMsgUpdate(no, txt) {
	var x = prompt("할말", txt);
	alert(x);
	if(txt != null && txt.length > 0 && txt.length < 250) {
		location.href = "sns.update?sgs_no=" + no + "&sgs_txt=" + txt;
	}
}

function snsPageChange(page) {
	location.href = "sns.page.change?p=" + page;
}