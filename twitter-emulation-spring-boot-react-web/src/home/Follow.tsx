import { Component } from "react";
import { format } from "date-fns";

type FollowProps = {};

type FollowState = {
    copyrightDate: Date;
};

export default class Follow extends Component<FollowProps, FollowState> {
    constructor(props: FollowProps) {
        super(props);

        // TODO: change
        this.state = {
            copyrightDate: new Date()
        };
    }

    render() {
        return (
            <div className="card p-3 bg-light">
                <div className="row m-1">
                    &copy; Acme, {this.state.copyrightDate && format(this.state.copyrightDate, 'yyyy')}
                </div>
            </div>
        );
    }
}
