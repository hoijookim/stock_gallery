package com.hoijoo.sg.stock;

import java.util.List;

public class StockPriceByDate {
	private List<StockPrice> stockPrices;
	
	public StockPriceByDate() {
		// TODO Auto-generated constructor stub
	}

	public StockPriceByDate(List<StockPrice> stockPrices) {
		super();
		this.stockPrices = stockPrices;
	}

	public List<StockPrice> getStockPrices() {
		return stockPrices;
	}

	public void setStockPrices(List<StockPrice> stockPrices) {
		this.stockPrices = stockPrices;
	}
	
}
