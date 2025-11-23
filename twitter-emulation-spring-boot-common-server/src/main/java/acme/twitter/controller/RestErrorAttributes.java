package acme.twitter.controller;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.webmvc.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Component
public class RestErrorAttributes extends DefaultErrorAttributes {
    public static final String CUSTOM_MESSAGE_ATTRIBUTE = "customMessage";

    @Override
    public Map<String, Object> getErrorAttributes(WebRequest webRequest, ErrorAttributeOptions options) {
        Map<String, Object> errorAttributes = super.getErrorAttributes(webRequest, options);

        Object customMessage = webRequest.getAttribute(CUSTOM_MESSAGE_ATTRIBUTE, RequestAttributes.SCOPE_REQUEST);
        if (customMessage instanceof String) {
            errorAttributes.put(CUSTOM_MESSAGE_ATTRIBUTE, customMessage);
        }

        return errorAttributes;
    }
}
