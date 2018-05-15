package acme.hello.web;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(urlPatterns = "/", loadOnStartup = 1)
public class HelloWorldServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        final String PAGE_HEADER = "<html><head><title>Twitter</title></head><body>";
        final String PAGE_FOOTER = "</body></html>";

        resp.setContentType("text/html");

        PrintWriter writer = resp.getWriter();
        writer.println(PAGE_HEADER);
        writer.println("<h1>Hello, world!</h1>");
        writer.println("<p>HTTP Servlet (@WebServlet annotation)</p>");
        writer.println(PAGE_FOOTER);
        writer.close();
    }
}