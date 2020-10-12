<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
		<c:if test="${curPage != 1 }">
		<table id="snsL">
			<tr>
				<td align="center" onclick="snsPageChange(${curPage - 1 });">&lt;</td>
			</tr>
		</table>
	</c:if>
	
	<c:if test="${curPage != allPageCount }">
		<table id="snsR">
			<tr>
				<td align="center" onclick="snsPageChange(${curPage + 1 });">&gt;</td>
			</tr>
		</table>
	</c:if>

	<table id="snsWriteArea" style="left: -420px;">
		<tr>
			<td>
				<form action="sns.search" name="snsSearchForm"
					onsubmit="return snsSearchCheck();" method="post">
					<table id="snsSearchTable">
						<tr>
							<td id="sstTd1">
								<input name="search" maxlength="10"
								autocomplete="off" placeholder="찾기"></td>
							<td id="sstTd2"><input type="image"
								src="resources/img/search.png" style="width: 30px;"></td>
						</tr>
					</table>
				</form>
			</td>
			<td id="snsWriteAreaSummoner" align="center" rowspan="2"><img src="resources/img/menu.png"
				style="cursor: pointer;"></td>
		</tr>
		<tr>
			<td align="center">
				<form action="sns.write" name="snsWriteForm"
					onsubmit="return snsWriteCheck();" method="post">
					<input name="token" value="${token }" type="hidden">
					<table id="snsWriteTable">
						<tr>
							<td id="swtTd1"><textarea name="sgs_txt" placeholder="내용"
									maxlength="250"></textarea></td>
							<td id="swtTd2"><input type="image"
								src="resources/img/write.png" style="width: 30px;"></td>
						</tr>
					</table>
				</form>
			</td>
		</tr>
	</table>
	<div id="snsMsgArea">
	<c:forEach var="sm" items="${msgs }">
		<table class="sm">
			<tr> 
				<td rowspan="5" align="center" valign="top" style="width: 95px;">
					<img class="smPhoto" src="resources/img/${sm.sg_photo }">
				</td>
				<td class="smOwner">${sm.sg_email }</td>
			</tr>
			<tr> 
				<td class="smDate" align="right"><fmt:formatDate
						value="${sm.sgs_when }" type="both" dateStyle="long" timeStyle="short" /></td>
			</tr>
			<tr>
				<td class="smTxt">${sm.sgs_txt }</td>
			</tr>
			<tr>
				<td id="smReplyArea">
				<c:forEach var="sr" items="${sm.reply }">
						
					<span class="smReplyID">${sr.sgsr_owner }</span> ${sr.sgsr_txt }
						<button onclick="snsReplyDelete(${sr.sgsr_no});">삭제</button><br>
						
				</c:forEach> 
					<form action="sns.reply.write" method="post" onsubmit="snsWriteReplyCheck(this);">
						<input name="token" value=${token } type="hidden">
						<input name="sgsr_sgs_no" value="${sm.sgs_no }" type="hidden">
						<span class="smReplyID">${sessionScope.loginMember.sg_email}</span>
						<input name="sgsr_txt" style="border-bottom: black solid 1px;" maxlength="100" placeholder="댓글">
						<button>쓰기</button>
				</form>				
				</td>
			</tr>
			<tr>
				<td colspan="2" align="left">
					<c:if test="${sm.sg_email == sessionScope.loginMember.sg_email }">
						<button onclick="snsMsgUpdate(${sm.sgs_no}, ${sm.sgs_txt });">수정</button>
						<button onclick="snsMsgDelete(${sm.sgs_no});">삭제</button>
					</c:if>
				</td>
			</tr>
		</table>
	</c:forEach>
	</div>
</body>
</html>