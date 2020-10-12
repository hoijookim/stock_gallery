package com.hoijoo.sg.sns;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class SNSMsg {
	private String sg_photo;
	private String sg_email;
	
	private Date sgs_when;
	private String sgs_txt;
	private BigDecimal sgs_no;
	
	private List<SNSReply> reply;		
	public SNSMsg() {
		// TODO Auto-generated constructor stub
	}
	public SNSMsg(String sg_photo, String sg_email, Date sgs_when, String sgs_txt, BigDecimal sgs_no,
			List<SNSReply> reply) {
		super();
		this.sg_photo = sg_photo;
		this.sg_email = sg_email;
		this.sgs_when = sgs_when;
		this.sgs_txt = sgs_txt;
		this.sgs_no = sgs_no;
		this.reply = reply;
	}
	public String getSg_photo() {
		return sg_photo;
	}
	public void setSg_photo(String sg_photo) {
		this.sg_photo = sg_photo;
	}
	public String getSg_email() {
		return sg_email;
	}
	public void setSg_email(String sg_email) {
		this.sg_email = sg_email;
	}
	public Date getSgs_when() {
		return sgs_when;
	}
	public void setSgs_when(Date sgs_when) {
		this.sgs_when = sgs_when;
	}
	public String getSgs_txt() {
		return sgs_txt;
	}
	public void setSgs_txt(String sgs_txt) {
		this.sgs_txt = sgs_txt;
	}
	public BigDecimal getSgs_no() {
		return sgs_no;
	}
	public void setSgs_no(BigDecimal sgs_no) {
		this.sgs_no = sgs_no;
	}
	public List<SNSReply> getReply() {
		return reply;
	}
	public void setReply(List<SNSReply> reply) {
		this.reply = reply;
	}
	
	
	
}
