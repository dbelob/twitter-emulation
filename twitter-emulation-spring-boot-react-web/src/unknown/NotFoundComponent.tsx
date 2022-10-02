import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundComponent extends Component {
    render() {
        return (
            <div className="container-dialog p-2">
                <h3 className="bg-info p-1 text-white text-center rounded">Page not found</h3>

                <div className="text-center">
                    Go to <Link to="/account/show">Main page</Link>
                </div>
            </div>
        );
    }
}
