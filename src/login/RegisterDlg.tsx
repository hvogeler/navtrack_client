import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import {ChangeEvent, FormEvent} from "react";

export interface IRegisterDlg {
    registerUser: (email: string | null, user: string | null, password: string | null) => Promise<any>;
    isLoggedIn: boolean;
}

@observer
export class RegisterDlg extends React.Component<IRegisterDlg, any> {

    private email: string | null = null;
    private user: string | null = null;
    private password: string | null = null;

    @observable private errmsg: string | null = null;

    constructor(props: IRegisterDlg) {
        super(props);
        this.registerButtonClicked = this.registerButtonClicked.bind(this);
    }

    public render() {
        if (!this.props.isLoggedIn) {
            return (
                <div className="container col-md-5 mt-4 bg-light border rounded ">
                    <div className="card bg-light border-0">
                        <div className="card-body">
                            <div className="card-title font-weight-bold text-secondary">
                                <h1>Register</h1>
                            </div>
                            <div className="card-text">
                                <form
                                    onSubmit={(event: FormEvent<HTMLFormElement>) => this.registerButtonClicked(event)}>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <div className="col-md-12">
                                            <i className="material-icons">mail</i>
                                            <input type="email" name="email" placeholder="Email Address" id="email" size={40}
                                                   onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                       this.email = event.currentTarget.value;
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="username" className="sr-only">Username</label>
                                        <div className="col-sm-12">
                                            <i className="material-icons">perm_identity</i>
                                            <input type="text" name="user" placeholder="Username" id="username"
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
                                            <button type="submit" className="btn btn-outline-secondary">Register
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
        } else {
            return (
                <div/>
            );
        }
    }

    private registerButtonClicked(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.user === null || this.password === null || this.email === null) {
            this.errmsg = "Please enter username, password and email address!";
        } else {
            this.errmsg = null;
            this.props.registerUser(this.email, this.user, this.password).then(x => {
                if (!this.props.isLoggedIn) {
                    this.errmsg = "Registration failed, please try again"
                }
            });
        }
    }
}