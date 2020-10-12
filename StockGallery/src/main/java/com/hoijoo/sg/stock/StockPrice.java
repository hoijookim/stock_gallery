package com.hoijoo.sg.stock;

public class StockPrice {
	private String s_date;
	private String s_endprice;
	private String s_startprice;
	private String s_highprice;
	private String s_lowprice;
	private String s_amount;
	
	public StockPrice() {
		// TODO Auto-generated constructor stub
	}

	public StockPrice(String s_date, String s_endprice, String s_startprice, String s_highprice, String s_lowprice,
			String s_amount) {
		super();
		this.s_date = s_date;
		this.s_endprice = s_endprice;
		this.s_startprice = s_startprice;
		this.s_highprice = s_highprice;
		this.s_lowprice = s_lowprice;
		this.s_amount = s_amount;
	}

	public String getS_date() {
		return s_date;
	}

	public void setS_date(String s_date) {
		this.s_date = s_date;
	}

	public String getS_endprice() {
		return s_endprice;
	}

	public void setS_endprice(String s_endprice) {
		this.s_endprice = s_endprice;
	}

	public String getS_startprice() {
		return s_startprice;
	}

	public void setS_startprice(String s_startprice) {
		this.s_startprice = s_startprice;
	}

	public String getS_highprice() {
		return s_highprice;
	}

	public void setS_highprice(String s_highprice) {
		this.s_highprice = s_highprice;
	}

	public String getS_lowprice() {
		return s_lowprice;
	}

	public void setS_lowprice(String s_lowprice) {
		this.s_lowprice = s_lowprice;
	}

	public String getS_amount() {
		return s_amount;
	}

	public void setS_amount(String s_amount) {
		this.s_amount = s_amount;
	}

}
