package com.hoijoo.sg.stock;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBManager {
	public static Connection connect() throws SQLException  {
		String addr = "jdbc:oracle:thin:@183.102.147.123:1521:xe";
		return DriverManager.getConnection(addr, "hoijoo", "1234");
	}
	public static void close(Connection con, PreparedStatement pstmt, ResultSet rs)	{
		try {			
			rs.close();
		} catch (Exception e) {
		}
		try {
			pstmt.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
