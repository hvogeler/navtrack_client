import * as React from "react";

export class LoginDlg extends React.Component<any, any> {

    public render() {
        return (
            <div className="container-fluid border border-light rounded">
                <form>
                    <div className="form-group row">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <div className="col-sm-12">
                            <input type="text" name="user" placeholder="Username" id="username"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="col-sm-12">
                            <input type="password" name="pass" placeholder="Password" id="password"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-12">
                            <input type="submit" name="login" className="login loginmodal-submit" value="Login"/>
                        </div>
                    </div>
                </form>

                <div className="form-group row">
                    <div className="col-sm-12">
                        <div className="login-help">
                            <a href="#">Register</a> - <a href="#">Forgot Password</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}