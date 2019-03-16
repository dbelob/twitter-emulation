package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.exception.AccountExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Account controller.
 */
@Controller
@RequestMapping("/api/account")
public class AccountController {
    private AccountDao accountDao;

    @Autowired
    public AccountController(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    /**
     * Processes registration
     *
     * @param accountForm account form
     */
    @PostMapping("/register")
    public void processRegistration(@RequestBody AccountForm accountForm) {
        try {
            accountDao.add(accountForm.getUsername(), accountForm.getPassword(), accountForm.getDescription());
        } catch (AccountExistsException e) {
//            errors.reject("account.exists", messageSourceAccessor.getMessage("account.exists"));
            //TODO: implement (account exists)
        }
    }
}
