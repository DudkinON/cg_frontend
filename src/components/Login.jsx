import React from "react";
import {connect} from "react-redux";
import Form from "./common/form";
import OAuth from "./common/OAuth";
import auth from "../services/auth";
import {setMessage} from "../actions"
import {loginSchema} from "./common/shemas";


class Login extends Form {

  state = {
    data: { email: '', password: '' },
    errors: {}
  };

  schema = loginSchema();

  componentDidMount() {
    if (this.props.user) {
      this.props.onLoggedIn();
      this.props.history.push("/");
    }
  }

  doSubmit = () => auth.login(this.state.data)
    .then(token => {
      if (token) this.props.history.replace("/profile")
    });


  render() {
    return (
      <div className="container page-height">
        <div className="row justify-content-md-center">
          <form onSubmit={this.handleSubmit} className="col-sm-12 col-md-8 col-lg-5">
            <h1 className="h3 text-muted text-center">Sign In</h1>
            <hr/>
            <div className="h70">
              {this.renderInput("email", "Email", "text", true)}
            </div>
            <div className="h70">
              {this.renderInput("password", "Password", "password")}
            </div>
            {this.renderButton("Sign in")}
            <hr/>
            <span className="h4 w100 flex-center text-muted">or</span>
            <hr/>
            <span className="col-6 d-inline-block">
            <div className="flex-center">
              {this.renderLink("sign up", "/register")}
            </div>
          </span>
            <span className="col-6 d-inline-block">
            <OAuth classes="link-gray mr-3 h4"/>
          </span>
          </form>
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    user: state.user,
    token: state.token,
    config: state.config
  }),
  dispatch => ({
    onLoggedIn: () => dispatch(setMessage({error: "You are already logged in"}))
  })
)(Login);