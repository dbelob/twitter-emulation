import { Component } from "react";

export interface FollowProps {
}

export interface FollowState {
}

export default class Follow extends Component<FollowProps, FollowState> {
    constructor(props: FollowProps) {
        super(props);
    }

    render() {
        return (
            <div>Follow</div>
        );
    }
}
