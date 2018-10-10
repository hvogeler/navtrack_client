import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import {ChangeEvent, FormEvent, MouseEvent} from "react";

export interface ILoginDlg {
    setCredentials: (user: string | null, password: string | null) => Promise<any>;
    logout: () => void;
    isLoggedIn: boolean;
    forgotPassword: (user: string) => Promise<any>;
}

@observer
export class LoginDlg extends React.Component<ILoginDlg, any> {

    private user: string | null = null;
    private password: string | null = null;

    @observable private errmsg: string | null = null;

    constructor(props: ILoginDlg) {
        super(props);
        this.loginButtonClicked = this.loginButtonClicked.bind(this);
        this.forgotPasswordClicked = this.forgotPasswordClicked.bind(this);
    }

    public render() {
        if (!this.props.isLoggedIn) {
            return (
                <div className="container col-sm-5 mt-4 bg-light border rounded ">
                    <div className="card bg-light border-0">
                        <div className="card-body">
                            <div className="card-title font-weight-bold text-secondary">
                                <h1>Login</h1>
                            </div>
                            <div className="card-text">

                                <form onSubmit={(event: FormEvent<HTMLFormElement>) => this.loginButtonClicked(event)}>
                                    <div className="form-group row">
                                        <label htmlFor="username" className="sr-only">Username</label>
                                        <div className="col-sm-12">
                                            <i className="material-icons">perm_identity</i>
                                            <input type="text" name="user" placeholder="Username" id="username"
                                                   autoFocus={true}
                                                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                       this.user = event.currentTarget.value;
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <div className="col-sm-12">
                                            <i className="material-icons">lock_open</i>
                                            <input type="password" name="pass" placeholder="Password" id="password"
                                                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                       this.password = event.currentTarget.value;
                                                   }}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-12">
                                            <button type="submit" className="btn btn-outline-secondary">Login
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <div className="login-help">
                                            <a href="#" onClick={this.forgotPasswordClicked}>Forgot Password</a>
                                        </div>
                                    </div>
                                </div>
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
        } else {
            return (
                <div className="container col-sm-5 bg-light mt-4 pt-4 pb-4 border rounded">
                    <button onClick={() => {
                        this.user = null;
                        this.password = null;
                        this.props.logout()
                    }}>Log Out
                    </button>
                </div>
            );
        }
    }

    private loginButtonClicked(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.user === null || this.password === null) {
            this.errmsg = "Please enter username and password!";
        } else {
            this.errmsg = null;
            this.props.setCredentials(this.user, this.password).then(value => {
                if (!this.props.isLoggedIn) {
                    this.errmsg = value;
                }
            });
        }
    }

    private forgotPasswordClicked(event: MouseEvent<HTMLAnchorElement>) {
        if (this.user === null) {
            this.errmsg = "Please enter username";
        } else {
            this.errmsg = null;
            this.props.forgotPassword(this.user).then( (value => {
                this.errmsg = value;
            }));
        }
    }
}