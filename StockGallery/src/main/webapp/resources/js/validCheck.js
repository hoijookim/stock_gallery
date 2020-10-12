// 자바스크립트 유효성 검사 라이브러리 제작

// 일반적으로 유효성검사 하는 것들
// 함수형태로 정리해서
// 나중에 쓰기 편하게
// .jar
// 문제가 있으면 true, 괜찮으면 false
// <input>을 넣으면
// 거기 글자가 없으면 true, 있으면 false
function checkLetter(input){
	return !input.value;
}

// <input>, 글자수를 넣으면 
// 그 글자수보다 적게 썼으면 true, 많이 썼으면 false

function minChar(input, mc){
	return input.value.length < mc;
}


// <input>을 넣으면
// 한글/특수문자 들어있으면 true, 아니면 false

function containsHS(input){
	var ok = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890@._";
	
	for (var i = 0; i < input.value.length; i++) {
		if (ok.indexOf(input.value[i]) == -1) {
			return true;
		}
	}
	return false;
	
}

//<input>x2 넣으면
//내용이 다르면 true, 같으면 false
function notEquals(input1, input2){
	return input1.value != input2.value;
}

XXX(pwInput, "1234567890")
//<input>, 문자열셋트 넣으면
//그 문자열셋트의 글자가 포함 안되어있으면 true
//들어있으면 false
function notContains(input, set){
	// input.value : qwerASD123
	// set : 1234567890
	for (var i = 0; i < set.length; i++) {
		if (input.value.indexOf(set[i]) != -1) {
			return false;
		}
	}
	return true;
}

//<input>을 넣어주면 숫자만 있는지
//불순물이 있으면 true, 아니면 false
function containsNo(input){
	return isNaN(input.value);
}

XXX(photoInput, "jpg")
// <input>, 확장자를 넣
//  그게 아니면 true, 그거면 false

function containjpg(input, type){
		type = "." + type;
		return input.value.indexOf(type) == -1;
}

// <input>이 음수면
// true 양수면 false
function onlyPositive(input){
	if (input > 0) {
		return false;
	}
	return true;
}