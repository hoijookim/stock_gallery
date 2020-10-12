function joinCheck() {
	var emailInput = document.joinForm.sg_email;
	var pwInput = document.joinForm.sg_pw;
	var nameInput = document.joinForm.sg_name;
	var genderInput = document.joinForm.sg_gender;
	var addrInput = document.joinForm.sg_addr;
	var photoInput = document.joinForm.sg_photo;
	
	var emailSameCheck = $(".joinEmailInput").css("color") == "rgb(255, 0, 0)";
	if (checkLetter(emailInput) || notContains(emailInput, "@.") || containsHS(emailInput) || emailSameCheck) {
		alert("email?");
		emailInput.value="";
		emailInput.focus();
		return false;
	}
	if (checkLetter(nameInput)) {
		alert("이름?");
		nameInput.value="";
		nameInput.focus();
		return false;
	}
	if (checkLetter(pwInput) || notContains(pwInput, "1234567890")) {
		alert("pw?");
		pwInput.value="";
		pwInput.focus();
		return false;
	}
	if (checkLetter(genderInput) || notContains(genderInput, "남자여자기타")) {
		alert("성별?");
		genderInput.value="";
		genderInput.focus();
		return false;
	}
	
	if (checkLetter(photoInput) || containjpg(photoInput,"jpg") && containjpg(photoInput, "gif")
				&& containjpg(photoInput,"png") && containjpg(photoInput,"bmp") ) {
		alert("사진?");
		photoInput.value="";
		photoInput.focus();
		return false;
	}
	return true;
}

function loginCheck(){
	var emailInput = document.loginForm.sg_email;
	var pwInput = document.loginForm.sg_pw;
	
	if (checkLetter(idInput) || checkLetter(pwInput)) {
		alert("???");
		idInput.value="";
		pwInput.value="";
		idInput.focus();
		return false;
	}
	return true;
}

function memberUpdateCheck() {
	var emailInput = document.joinForm.sg_email;
	var pwInput = document.joinForm.sg_pw;
	var addrInput = document.joinForm.sg_addr;
	var photoInput = document.joinForm.sg_photo;
	
	if (checkLetter(pwInput) || notContains(pwInput, "1234567890")) {
		alert("pw?");
		pwInput.value="";
		pwInput.focus();
		return false;
	}
	if (checkLetter(photoInput)) {
		return true;
	}
	
	if (containjpg(photoInput,"jpg") && containjpg(photoInput, "gif")
				&& containjpg(photoInput,"png") && containjpg(photoInput,"bmp") ) {
		alert("사진?");
		photoInput.value="";
		photoInput.focus();
		return false;
	}
	return true;
}
