package acme.twitter.controller;

import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Component
public class RestErrorAttributes extends DefaultErrorAttributes {
    public static String CUSTOM_MESSAGE_ATTRIBUTE = "customMessage";

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, boolean includeStackTrace) {
        Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, includeStackTrace);

        Object customMessage = webRequest.getAttribute(CUSTOM_MESSAGE_ATTRIBUTE, WebRequest.SCOPE_REQUEST);
        if (customMessage instanceof String) {
            errorAttributes.put(CUSTOM_MESSAGE_ATTRIBUTE, customMessage);
        }

        return errorAttributes;
    }
}
