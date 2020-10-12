package com.hoijoo.sg.stock;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserFactory;

@Service
public class StockDAO {
	
	@Autowired
	private SqlSession ss;
	
	public ArrayList<StockPrice> getAllStock(Stock s, HttpServletRequest req) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			con = DBManager.connect();
			String stock_code = s.getStock_code();
			
			String sql = "select * from s_" + stock_code + " order by s_date";
			pstmt = con.prepareStatement(sql);
			rs = pstmt.executeQuery();
			ArrayList<StockPrice> stocks = new ArrayList<StockPrice>();
			StockPrice sp = null;
			while (rs.next()) {
			sp =	new StockPrice(rs.getString("s_date"), rs.getString("s_endprice"), rs.getString("s_startprice"), rs.getString("s_highprice"), rs.getString("s_lowprice"), rs.getString("s_amount"));
			stocks.add(sp);
			}
			
			return stocks;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			DBManager.close(con, pstmt, rs);
		}
		
	}
	
	public String getFinanceInfo(Stock s, HttpServletRequest req) {
		s = (ss.getMapper(StockMapper.class).searchCode(s));
		
		int lastYear = Integer.parseInt(req.getParameter("year"));
		int reprt_code = Integer.parseInt(req.getParameter("reprt_code"));
		
		try {
			URL u = new URL("https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json"
					+ "?crtfc_key=61f9046510cf08525a9d6a580aaf752a4bc0f789&corp_code=" + s.getCorp_code() 
					+ "&bsns_year=" + lastYear + "&reprt_code=" + reprt_code +"&fs_div=CFS");
			HttpURLConnection huc = (HttpURLConnection) u.openConnection();
			InputStream is = huc.getInputStream();
			InputStreamReader isr = new InputStreamReader(is, "utf-8");
			BufferedReader br= new BufferedReader(isr);
			String line = null;
			StringBuffer sb = new StringBuffer();
			
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			return sb.toString();
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	public String getPrice(Stock s, HttpServletRequest req) {
		s = (ss.getMapper(StockMapper.class).searchName(s));
		req.setAttribute("corpName", s.getCorp_name());
		req.setAttribute("stockCode", s.getStock_code());
		try {
			URL u = new URL("http://asp1.krx.co.kr/servlet/krx.asp.XMLSiseEng?code="+ s.getStock_code());
			HttpURLConnection huc = (HttpURLConnection) u.openConnection();
			InputStream is = huc.getInputStream();
			InputStreamReader isr = new InputStreamReader(is, "utf-8");
			BufferedReader br= new BufferedReader(isr);
			
			String line = null;
			StringBuffer sb = new StringBuffer();
			while ((line = br.readLine()) != null) {
				if (line.equals("\n")) {
					line.replace("\n", "");
				}
				sb.append(line);
				
			}
			return sb.toString();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public Stocks stockCheck(Stock inputS) {
		List<Stock> stocks = new ArrayList<Stock>();
		stocks.add(ss.getMapper(StockMapper.class).searchName(inputS));
		Stocks sts = new Stocks(stocks);
		return sts;
	}
	
}
