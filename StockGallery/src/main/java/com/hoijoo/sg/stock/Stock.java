package com.hoijoo.sg.stock;

public class Stock {
	private String stock_code;
	private String corp_name;
	private String corp_code;

	public Stock() {
		// TODO Auto-generated constructor stub
	}

	public Stock(String stock_code, String corp_name, String corp_code) {
		super();
		this.stock_code = stock_code;
		this.corp_name = corp_name;
		this.corp_code = corp_code;
	}

	public String getStock_code() {
		return stock_code;
	}

	public void setStock_code(String stock_code) {
		this.stock_code = stock_code;
	}

	public String getCorp_name() {
		return corp_name;
	}

	public void setCorp_name(String corp_name) {
		this.corp_name = corp_name;
	}

	public String getCorp_code() {
		return corp_code;
	}

	public void setCorp_code(String corp_code) {
		this.corp_code = corp_code;
	}
	
	
}


