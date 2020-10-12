package com.hoijoo.sg.member;

import java.io.File;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

@Service
public class MemberDAO {
	
	@Autowired
	private SqlSession ss;
	
	public void bye(HttpServletRequest req) {
		try {
			Member m = (Member) req.getSession().getAttribute("loginMember");
			if (ss.getMapper(MemberMapper.class).bye(m) == 1) {
				req.setAttribute("r", "탈퇴성공");
				String sg_photo = m.getSg_photo(); 
				sg_photo = URLDecoder.decode(sg_photo, "utf-8"); 
				String path = req.getSession().getServletContext().getRealPath("resources/img");
				System.out.println(path);
				new File(path + "/" + sg_photo).delete();

			} else {
				req.setAttribute("r", "탈퇴실패");
			}
		} catch (Exception e) {
			e.printStackTrace();
			req.setAttribute("r", "탈퇴실패");
		}
	}

	public void divideAddr(HttpServletRequest req) {
		Member m = (Member) req.getSession().getAttribute("loginMember"); // 세션에 로그인된 사람 정보 꺼내기
		String addr = m.getSg_addr();
		String[] addr2 = addr.split("!");
		req.setAttribute("addr", addr2);
	}
	
	public Members idCheck(Member inputM) {
		List<Member> members = new ArrayList<Member>();
		members.add(ss.getMapper(MemberMapper.class).getMemberByID(inputM));
		Members ms = new Members(members);
		return ms;
	}
	
	public void login(Member inputM, HttpServletRequest req) {
		try {
			Member dbM = ss.getMapper(MemberMapper.class).getMemberByID(inputM);
			if (dbM != null) {
				if (dbM.getSg_pw().equals(inputM.getSg_pw())) {
					req.getSession().setAttribute("loginMember", dbM);
					req.getSession().setMaxInactiveInterval(600);
				} else { 
					req.setAttribute("r", "로그인실패(PW오류)");
				}
			} else {
				req.setAttribute("r", "로그인실패(미가입ID)");
			}

		} catch (Exception e) {
			e.printStackTrace();
			req.setAttribute("r", "로그인실패(DB서버문제)");
		}
	}

	
	public boolean loginCheck(HttpServletRequest req) {
		Member m = (Member) req.getSession().getAttribute("loginMember");
		if (m != null) {
			req.setAttribute("loginPage", "member/loginSuccess.jsp");
			return true;
		} else {
			req.setAttribute("loginPage", "member/loginClick.jsp");
			return false;
		}
	}
	
	public void logout(HttpServletRequest req) {
		req.getSession().setAttribute("loginMember", null);
	}
	
	public void join(Member m, HttpServletRequest req) {
		String path = req.getSession().getServletContext().getRealPath("resources/img");
		MultipartRequest mr = null;
		try {
			mr = new MultipartRequest(req, path, 10 * 1024 * 1024,
					"utf-8", 
					new DefaultFileRenamePolicy() 
			);
		} catch (Exception e) {
			e.printStackTrace();
			req.setAttribute("r", "가입실패(파일용량초과");
			return;
		}

		// 파일 업로드 성공
		try {
			String sg_email = mr.getParameter("sg_email");
			String sg_name = mr.getParameter("sg_name");
			String sg_pw = mr.getParameter("sg_pw");
			String sg_addr1 = mr.getParameter("sg_addr1");
			String sg_addr2 = mr.getParameter("sg_addr2");
			String sg_addr3 = mr.getParameter("sg_addr3");
			String sg_addr = sg_addr2 + "!" + sg_addr3 + "!" + sg_addr1;
			String sg_gender = mr.getParameter("sg_gender");
			String sg_photo = mr.getFilesystemName("sg_photo");
			sg_photo = URLEncoder.encode(sg_photo, "utf-8");
			sg_photo = sg_photo.replace("+", " ");
			m.setSg_email(sg_email);
			m.setSg_name(sg_name);
			m.setSg_pw(sg_pw);
			m.setSg_gender(sg_gender);
			m.setSg_addr(sg_addr);
			m.setSg_photo(sg_photo);
			if (ss.getMapper(MemberMapper.class).join(m) == 1) {
				req.setAttribute("r", "가입성공");
			} else {
				req.setAttribute("r", "가입실패");
			}

		} catch (Exception e) {
			e.printStackTrace();
			req.setAttribute("r", "가입실패(DB서버문제)");

			String sg_photo = mr.getFilesystemName("sg_photo");
			File f = new File(path + "/" + sg_photo);
			f.delete();
		}
	}
	
public void update(Member m, HttpServletRequest req) {
		
		// 사진 파일은 최대 10MB
		// 수정시도 : 파일을 10MB넘게하면 -> 무조건 실패
		String path = req.getSession().getServletContext().getRealPath("resources/img");
		MultipartRequest mr = null;
		try {
			mr = new MultipartRequest(req, path, 10 * 1024 * 1024,
					"utf-8", new DefaultFileRenamePolicy());
		} catch (Exception e) {
			e.printStackTrace();
			req.setAttribute("r", "수정실패(파일용량초과)");
			return;
		}
		
		// 현재 로그인 된 회원 정보(수정되기 전)
		Member lm = (Member)req.getSession().getAttribute("loginMember");
		
		// 기존 사진 파일명
		String oldFile = lm.getSg_photo(); // %2A.png
		
		// 새 파일명
		String newFile = mr.getFilesystemName("sg_photo");	// ㅎ.png
		try {
				
			String sg_email = mr.getParameter("sg_email");
			String sg_name = mr.getParameter("sg_name");
			String sg_pw = mr.getParameter("sg_pw");
			String sg_gender = mr.getParameter("sg_gender");
			String sg_addr1 = mr.getParameter("sg_addr1");
			String sg_addr2 = mr.getParameter("sg_addr2");
			String sg_addr3 = mr.getParameter("sg_addr3");
			
			// 사진은 수정 안하는
			if (newFile == null) {
				newFile = oldFile;
			} else {
				newFile = URLEncoder.encode(newFile, "utf-8");
				newFile = newFile.replace("+", " ");
			}
			m.setSg_email(sg_email);
			m.setSg_name(sg_name);
			m.setSg_pw(sg_pw);
			m.setSg_gender(sg_gender);
			m.setSg_addr(sg_addr2 + "!" + sg_addr3 +"!" + sg_addr1);
			m.setSg_photo(newFile);
			
			if (ss.getMapper(MemberMapper.class).update(m) == 1) {
				req.setAttribute("r", "수정성공");
				
				// 사이트에 반영
				req.getSession().setAttribute("loginMember", m);
				loginCheck(req);
				
				// 프사 바꾸는 상황 : 옛날 프사 지우기
				if (!oldFile.equals(newFile)) {
					oldFile = URLDecoder.decode(oldFile, "utf-8");
					new File(path + "/" + oldFile).delete();
				}
				
			} else {
				req.setAttribute("r", "수정실패");
				
				// 프사 바꾸는 상황 : 새 프사 지우기
				if (!oldFile.equals(newFile)) {
					newFile = URLDecoder.decode(newFile, "utf-8");
					new File(path + "/" + newFile).delete();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			req.setAttribute("r", "수정실패");
		}
	}
}
