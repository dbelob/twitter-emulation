import { ChangeEvent, Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { resolve } from 'inversify-react';
import { FormValidator } from '../common/validation/FormValidator';
import { ValidationMessages } from '../common/validation/ValidationMessages';
import { ValidatableTextarea } from '../common/validation/ValidatableTextarea';
import { TweetService } from '../common/services/TweetService';
import NonValidationMessageText from '../message/NonValidationMessageText';


type NewTweetProps = {};

type NewTweetState = {
    text: string;
    isSubmit: boolean;
}

export default class NewTweet extends Component<NewTweetProps, NewTweetState> {
    @resolve(TweetService)
    private readonly tweetService!: TweetService;

    private readonly rules: any;

    constructor(props: NewTweetProps) {
        super(props);

        this.state = {
            text: '',
            isSubmit: false
        };

        this.rules = {
            text: {required: true, minlength: 1, maxlength: 140},
        };
    }

    updateFormValue = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    submit = () => {
        this.tweetService.tweet(this.state.text)
            .then(() => {
                this.setState({
                    isSubmit: true
                });
            });
    };

    render() {
        return (
            <>
                {this.state.isSubmit ? <Navigate to="/account/show"/> :
                    <div className="container-dialog p-2">
                        <h3 className="bg-info p-1 text-white text-center rounded">New tweet</h3>

                        <FormValidator data={this.state} rules={this.rules}
                                       submit={this.submit} submitButtonTitle={'Tweet'}
                                       submitUsingEnter={false}
                                       rightButtons={
                                           <Link to="/account/show">
                                               <button className="btn btn-secondary m-1" id="register">Cancel</button>
                                           </Link>}>
                            <NonValidationMessageText/>
                            <ValidationMessages/>

                            <div className="mb-3">
                                <ValidatableTextarea className="form-control" rows={3} id="text" name="text"
                                                     value={this.state.text} onChange={this.updateFormValue}
                                                     autoFocus={true}/>
                            </div>
                        </FormValidator>
                    </div>
                }
            </>
        );
    }
}
