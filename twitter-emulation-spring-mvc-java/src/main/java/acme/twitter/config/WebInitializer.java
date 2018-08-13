package acme.twitter.config;

import acme.twitter.web.WebConfig;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

/**
 * Spring MVC web initializer.
 */
public class WebInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    private static final String PROFILES_ACTIVE_PROPERTY = "spring.profiles.active";

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{RootConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{WebConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);

        if (System.getProperty(PROFILES_ACTIVE_PROPERTY) == null) {
            servletContext.setInitParameter(PROFILES_ACTIVE_PROPERTY, "development");
        }
    }
}