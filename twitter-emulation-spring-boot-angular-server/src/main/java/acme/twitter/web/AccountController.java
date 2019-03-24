package acme.twitter.web;

import acme.twitter.dao.AccountDao;
import acme.twitter.dao.exception.AccountExistsException;
import acme.twitter.dao.exception.AccountNotExistsException;
import acme.twitter.domain.Account;
import acme.twitter.dto.AccountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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
    public ResponseEntity<Void> register(@RequestBody AccountForm accountForm) throws AccountExistsException {
        accountDao.add(accountForm.getUsername(), accountForm.getPassword(), accountForm.getDescription());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/profile")
    @ResponseBody
    public AccountDto profile(Principal principal) throws AccountNotExistsException {
        Account account = accountDao.findByUsername(principal.getName());

        return new AccountDto(account.getUsername(), account.getPassword(), account.getDescription());
    }

    @PostMapping("/profile")
    public ResponseEntity<Void> profile(@RequestBody AccountForm accountForm) {
        accountDao.update(accountForm.getUsername(), accountForm.getPassword(), accountForm.getDescription());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
