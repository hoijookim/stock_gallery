package com.hoijoo.sg.stock;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hoijoo.sg.member.MemberDAO;

@Controller
public class StockController {
	
	@Autowired
	private StockDAO sDAO;
	
	@Autowired
	private MemberDAO mDAO;
	
	@RequestMapping(value = "/stock.chart", method = RequestMethod.GET,
			produces = "application/json; charset=utf-8")
	public @ResponseBody ArrayList<StockPrice> stockChartShow(Stock s, HttpServletResponse res, HttpServletRequest req) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return sDAO.getAllStock(s, req);
	} 
	
	@RequestMapping(value = "/stock.check", method = RequestMethod.GET,
						produces = "application/json; charset=utf-8")
	public @ResponseBody Stocks stockCheck(Stock s, HttpServletRequest req) {
		return sDAO.stockCheck(s);
	} 
	
	@RequestMapping(value = "/stock.check.finance", method = RequestMethod.GET,
			produces = "application/json; charset=utf-8")
	public @ResponseBody String stockFinanceCheck(Stock s, HttpServletResponse res, HttpServletRequest req) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return sDAO.getFinanceInfo(s, req);
	} 

	@RequestMapping(value = "/stock.go", method = RequestMethod.GET,
						produces = "application/xml; charset=utf-8")
	public @ResponseBody String stockGo(Stock s, HttpServletRequest req) {
		return sDAO.getPrice(s, req);
	}
	
	@RequestMapping(value = "/stock.search", method = RequestMethod.GET)
	public String stockSearch(HttpServletRequest req) {
		mDAO.loginCheck(req);
		req.setAttribute("contentPage", "search/search.jsp");
		return "index";
	}
	
	

}
