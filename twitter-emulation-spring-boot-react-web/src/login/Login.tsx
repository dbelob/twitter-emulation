import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../common/authentication/AuthProvider';

export default function Login() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let username = formData.get("username") as string;
        let password = formData.get("password") as string;

        auth.signin(username, password, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, {replace: true});
        });
    }

    // TODO: implement
    return (
        <div className="container-dialog p-2">
            <h3 className="bg-info p-1 text-white text-center rounded">Log in</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" name="username" autoFocus/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password"/>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary m-1">Log in</button>
                    <Link to="/account/register">
                        <button className="btn btn-link m-1" id="register">Register</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
