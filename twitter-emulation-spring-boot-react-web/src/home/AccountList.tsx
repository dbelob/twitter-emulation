import { Component } from 'react';
import { Link } from 'react-router';
import { Account } from '../common/models/Account';

type AccountListProps = {
    title: string;
    accounts: Account[];
};

type AccountListState = {};

export default class AccountList extends Component<AccountListProps, AccountListState> {
    render() {
        return (
            <>
                <h5 className="fw-bold">{this.props.title}</h5>
                <table>
                    <tbody>
                        {this.props.accounts.map(account =>
                            <tr key={account.username}>
                                <td>
                                    <Link to={`/account/show/${account.username}`} className="fw-bold">{account.description}</Link> @{account.username}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        );
    }
}
