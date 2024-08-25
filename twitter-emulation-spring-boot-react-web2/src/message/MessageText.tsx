import { Component } from 'react';
import { resolve } from 'inversify-react';
import { MessageService } from './MessageService';
import { Message } from '../common/models/Message';

type MessageTextProps = {
    autoHide: boolean;
    hidingTime: number;
}

type MessageTextState = {
    lastMessage: Message | undefined;
}

export default class MessageText extends Component<MessageTextProps, MessageTextState> {
    public static defaultProps = {
        autoHide: true,
        hidingTime: 10
    };

    @resolve(MessageService)
    private readonly messageService!: MessageService;


    constructor(props: MessageTextProps) {
        super(props);
        
        this.state = {
            lastMessage: undefined
        };
    }

    componentDidMount() {
        this.messageService.messages.subscribe(m => this.setState({lastMessage: m}));
    }

    isVisible(): boolean {
        if (this.state.lastMessage) {
            if (this.props.autoHide) {
                if (this.state.lastMessage.date) {
                    let timeDifference = Date.now() - this.state.lastMessage.date.getTime();

                    return timeDifference <= this.props.hidingTime * 1000;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    render() {
        return (
            <>
                {this.isVisible() &&
                    <div data-testid="message" className={`alert alert-info text-center ${this.state.lastMessage?.error && 'alert-danger'}`}>
                        {this.state.lastMessage?.text}
                    </div>}
            </>
        );
    }
}
