package com.hoijoo.sg.sns;

import java.math.BigDecimal;
import java.util.Date;

public class SNSReply {
	private BigDecimal sgsr_no;
	private BigDecimal sgsr_sgs_no;
	private String sgsr_owner;
	private String sgsr_txt;
	private Date sgsr_when;
	
	public SNSReply() {
		// TODO Auto-generated constructor stub
	}

	public SNSReply(BigDecimal sgsr_no, BigDecimal sgsr_sgs_no, String sgsr_owner, String sgsr_txt, Date sgsr_when) {
		super();
		this.sgsr_no = sgsr_no;
		this.sgsr_sgs_no = sgsr_sgs_no;
		this.sgsr_owner = sgsr_owner;
		this.sgsr_txt = sgsr_txt;
		this.sgsr_when = sgsr_when;
	}

	public BigDecimal getSgsr_no() {
		return sgsr_no;
	}

	public void setSgsr_no(BigDecimal sgsr_no) {
		this.sgsr_no = sgsr_no;
	}

	public BigDecimal getSgsr_sgs_no() {
		return sgsr_sgs_no;
	}

	public void setSgsr_sgs_no(BigDecimal sgsr_sgs_no) {
		this.sgsr_sgs_no = sgsr_sgs_no;
	}

	public String getSgsr_owner() {
		return sgsr_owner;
	}

	public void setSgsr_owner(String sgsr_owner) {
		this.sgsr_owner = sgsr_owner;
	}

	public String getSgsr_txt() {
		return sgsr_txt;
	}

	public void setSgsr_txt(String sgsr_txt) {
		this.sgsr_txt = sgsr_txt;
	}

	public Date getSgsr_when() {
		return sgsr_when;
	}

	public void setSgsr_when(Date sgsr_when) {
		this.sgsr_when = sgsr_when;
	}
	
	
}
