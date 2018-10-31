package <%= reversedomain %>;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kumori.Utils;

@WebServlet("/hello")
public class Rest extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String answer = getComponent().doRequest();
		response.setContentType("text/plain");
		response.getWriter().append(answer);
	}

	Component getComponent() {
		return (Component)(Utils.getComponent());
	}

}
