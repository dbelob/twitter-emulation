package acme.twitter.web.validation;

import acme.twitter.web.AccountForm;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordsMatchValidator implements ConstraintValidator<PasswordsMatch, AccountForm> {
    @Override
    public boolean isValid(AccountForm value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        } else {
            return (value.getPassword() == null) || value.getPassword().equals(value.getPasswordConfirmation());
        }
    }
}
