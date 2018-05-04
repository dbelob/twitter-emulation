package acme.twitter.web.validation;

import acme.twitter.web.RegistrationForm;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordsMatchValidator implements ConstraintValidator<PasswordsMatch, RegistrationForm> {
    @Override
    public boolean isValid(RegistrationForm value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        } else {
            return (value.getPassword() == null) || value.getPassword().equals(value.getPasswordConfirmation());
        }
    }
}