package com.hoijoo.sg.member;


public class Member {
	private String sg_email;
	private String sg_name;
	private String sg_pw;
	private String sg_gender;
	private String sg_addr;
	private String sg_photo;
	
	public Member() {
		// TODO Auto-generated constructor stub
	}

	public Member(String sg_email, String sg_name, String sg_pw, String sg_gender, String sg_addr, String sg_photo) {
		super();
		this.sg_email = sg_email;
		this.sg_name = sg_name;
		this.sg_pw = sg_pw;
		this.sg_gender = sg_gender;
		this.sg_addr = sg_addr;
		this.sg_photo = sg_photo;
	}

	public String getSg_email() {
		return sg_email;
	}

	public void setSg_email(String sg_email) {
		this.sg_email = sg_email;
	}

	public String getSg_name() {
		return sg_name;
	}

	public void setSg_name(String sg_name) {
		this.sg_name = sg_name;
	}

	public String getSg_pw() {
		return sg_pw;
	}

	public void setSg_pw(String sg_pw) {
		this.sg_pw = sg_pw;
	}

	public String getSg_gender() {
		return sg_gender;
	}

	public void setSg_gender(String sg_gender) {
		this.sg_gender = sg_gender;
	}

	public String getSg_addr() {
		return sg_addr;
	}

	public void setSg_addr(String sg_addr) {
		this.sg_addr = sg_addr;
	}

	public String getSg_photo() {
		return sg_photo;
	}

	public void setSg_photo(String sg_photo) {
		this.sg_photo = sg_photo;
	}

	
}

