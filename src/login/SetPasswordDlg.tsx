import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import {ChangeEvent, FormEvent} from "react";

export interface ISetPasswordDlg {
    confirmationkey: string;
    setPassword: (password: string, confirmationkey: string) => Promise<any>;
}

@observer
export class SetPasswordDlg extends React.Component<ISetPasswordDlg, any> {

    private passwordNew: string | null = null;
    private passwordCheck: string | null = null;

    @observable private errmsg: string | null = null;

    constructor(props: ISetPasswordDlg) {
        super(props);
        this.setPasswordClicked = this.setPasswordClicked.bind(this);
    }

    public render() {
        return (
            <div className="container col-sm-5 mt-4 bg-light border rounded ">
                <div className="card bg-light border-0">
                    <div className="card-body">
                        <div className="card-title font-weight-bold text-secondary">
                            <h1>Set Password</h1>
                        </div>
                        <div className="card-text">

                            <form onSubmit={(event: FormEvent<HTMLFormElement>) => this.setPasswordClicked(event)}>
                                <div className="form-group row">
                                    <label htmlFor="passwordNew" className="sr-only">Password</label>
                                    <div className="col-sm-12">
                                        <i className="material-icons">lock_open</i>
                                        <input type="password" name="pass" placeholder="Password" id="passwordNew"
                                               autoFocus={true}
                                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                   this.passwordNew = event.currentTarget.value;
                                               }}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="passwordCheck" className="sr-only">Password</label>
                                    <div className="col-sm-12">
                                        <i className="material-icons">lock_open</i>
                                        <input type="password" name="pass" placeholder="Password" id="passwordCheck"
                                               onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                   this.passwordCheck = event.currentTarget.value;
                                               }}/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <button type="submit" className="btn btn-outline-secondary">Change Password
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {
                                (this.errmsg != null) ?
                                    <div className="text-danger text-center">
                                        {this.errmsg}
                                    </div>
                                    : <div/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    private setPasswordClicked(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.passwordNew === null || this.passwordCheck === null) {
            this.errmsg = "Please enter password twice!";
            return
        }

        if (this.passwordNew !== this.passwordCheck) {
            this.errmsg = "Passwords differ!";
            return
        }

        if (this.passwordNew.length < 6) {
            this.errmsg = "Passwords must be longer than 6 characters!";
            return
        }

        this.errmsg = "Password has not been reset";
        this.props.setPassword(this.passwordNew, this.props.confirmationkey).then(value => {
            this.errmsg = value;
        });
    }
}