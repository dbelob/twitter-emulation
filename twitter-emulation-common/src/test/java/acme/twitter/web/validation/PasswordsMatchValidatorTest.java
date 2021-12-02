package acme.twitter.web.validation;

import acme.twitter.web.AccountForm;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.params.provider.Arguments.arguments;

@DisplayName("PasswordsMatchValidator class tests")
class PasswordsMatchValidatorTest {
    @Nested
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    @DisplayName("isValid method tests")
    class IsValidTest {
        private Stream<Arguments> data() {
            AccountForm accountForm0 = new AccountForm();

            AccountForm accountForm1 = new AccountForm();
            accountForm1.setPassword("42");

            AccountForm accountForm2 = new AccountForm();
            accountForm2.setPassword("42");
            accountForm2.setPasswordConfirmation("42");

            AccountForm accountForm3 = new AccountForm();
            accountForm3.setPassword("42");
            accountForm3.setPasswordConfirmation("43");

            return Stream.of(
                    arguments(null, true),
                    arguments(accountForm0, true),
                    arguments(accountForm1, false),
                    arguments(accountForm2, true),
                    arguments(accountForm3, false)
            );
        }

        @ParameterizedTest
        @MethodSource("data")
        void isValid(AccountForm value, boolean expected) {
            assertEquals(expected, new PasswordsMatchValidator().isValid(value, null));
        }
    }
}
