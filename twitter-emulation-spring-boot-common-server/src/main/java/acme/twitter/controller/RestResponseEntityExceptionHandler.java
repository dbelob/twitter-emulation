package acme.twitter.controller;

import acme.twitter.dao.exception.AccountException;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotAllowedException;
import acme.twitter.dao.exception.AccountNotExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler({
            AccountExistsException.class,
            AccountNotExistsException.class,
            AccountNotAllowedException.class
    })
    public final ResponseEntity<Object> handleCustomException(AccountException ex, WebRequest request) throws AccountException {
        String customMessage = null;

        if (ex instanceof AccountExistsException) {
            customMessage = "Account with the same name already exists";
        } else if (ex instanceof AccountNotExistsException) {
            customMessage = "Account does not exist";
        } else if (ex instanceof AccountNotAllowedException) {
            customMessage = "Account not allowed";
        }

        if (customMessage != null) {
            request.setAttribute(RestErrorAttributes.CUSTOM_MESSAGE_ATTRIBUTE, customMessage, RequestAttributes.SCOPE_REQUEST);
        }

        throw ex;
    }
}
