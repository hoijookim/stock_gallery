package com.hoijoo.sg.stock;

import java.util.List;

public class Stocks {
	private List<Stock> stock;
	
	public Stocks() {
		// TODO Auto-generated constructor stub
	}

	public Stocks(List<Stock> stock) {
		super();
		this.stock = stock;
	}

	public List<Stock> getStock() {
		return stock;
	}

	public void setStock(List<Stock> stock) {
		this.stock = stock;
	}
	
}
