import React from "react";

import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
} from "../../../Server/Connections/connect";

import "../../../Style/style.css";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import { loginJSON, registerJSON } from "../../../Model/Util/JSONModel.js";

//========================================================

export class LoginMain extends React.Component {
  render() {
    let LoginPop;
    let logged = this.props.logged;
 
    if (logged) {
      LoginPop = () => <LoggedIn />;
    } else {
      LoginPop = () => <LoggedOut />;
    }
    return (
      <div>
        <LoginPop />
      </div>
    );
  }
}

export class LoggedOut extends React.Component {
  render() {
    const popover = (
      <Popover>
        <Popover.Content>
          <LoginPopup />
        </Popover.Content>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">Login/Signup</Button>
      </OverlayTrigger>
    );
  }
}

export class LoggedIn extends React.Component {
  render() {
    return (
      <div>
        <Logout />
      </div>
    );
  }
}

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "login",
    };
  }

  render() {
    var loginscreen = (
      <div>
        <button
          className="login-option"
          onClick={() => this.setState({ screen: "login" })}
        >
          <span>Already have an account? Login now.</span>
        </button>
      </div>
    );

    var registerscreen = (
      <div>
        <button
          className="login-option"
          onClick={() => this.setState({ screen: "register" })}
        >
          <span>Don't have an account? Register now.</span>
        </button>
      </div>
    );

    var forgotpassowrdscreen = (
      <div>
        <button
          className="login-option"
          onClick={() => this.setState({ screen: "forgotpassword" })}
        >
          <span>Forgot your password? Lmao.</span>
        </button>
      </div>
    );

    var screen;
    if (this.state.screen === "login") {
      screen = (
        <div>
          <div>
            {" "}
            <Login />{" "}
          </div>
          <Dropdown.Divider />
          <div>
            {registerscreen}
            {forgotpassowrdscreen}
          </div>
        </div>
      );
    } else if (this.state.screen === "register") {
      screen = (
        <div>
          <div>
            {" "}
            <Register />{" "}
          </div>
          <Dropdown.Divider />
          <div>
            {loginscreen}
            {forgotpassowrdscreen}
          </div>
        </div>
      );
    } else if (this.state.screen === "forgotpassword") {
      screen = (
        <div>
          <div>
            {" "}
            <ForgotPassword />{" "}
          </div>
          <Dropdown.Divider />
          <div>
            {registerscreen}
            {loginscreen}
          </div>
        </div>
      );
    }

    return <div style={{ padding: "6px" }}>{screen}</div>;
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  }

  submitData = (event) => {
    event.preventDefault();
    var json = JSON.stringify(loginJSON(this.state));

    fetchLogin(json);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitData}>
          <p>Username</p>
          <input
            type="text"
            className="form-control"
            required
            onChange={({ target: { value } }) =>
              this.setState({ username: value })
            }
          ></input>

          <p>Password</p>
          <input
            type="password"
            className="form-control"
            required
            onChange={({ target: { value } }) =>
              this.setState({ password: value })
            }
          ></input>

          <br></br>
          <Button variant="primary" type="submit" value="Submit">
            {" "}
            Login{" "}
          </Button>
        </form>
      </div>
    );
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      username: null,
      password: null,

      typed: null,
      confirm: null,
      disabled: true,
    };
  }

  submitData = (event) => {
    event.preventDefault();
    var json = JSON.stringify(registerJSON(this.state));

    fetchRegister(json);
  };

  passwordsAreSame(password, confirm) {
    if (password != null) this.setState({ typed: password });
    if (confirm != null) this.setState({ confirm: confirm });

    if (password === confirm) {
      this.setState({ disabled: false });
      this.setState({ password: password });
    } else {
      this.setState({ disabled: true });
      this.setState({ password: null });
    }
  }

  render() {
    let password = this.state.typed;
    let confirm = this.state.confirm;

    return (
      <div>
        <form onSubmit={this.submitData}>
          <p>E-mail</p>
          <input
            type="email"
            className="form-control"
            required
            onChange={({ target: { value } }) =>
              this.setState({ email: value })
            }
          ></input>

          <p>Username</p>
          <input
            type="text"
            className="form-control"
            required
            onChange={({ target: { value } }) =>
              this.setState({ username: value })
            }
          ></input>

          <p>Password</p>
          <input
            type="password"
            className="form-control"
            required
            onChange={({ target: { value } }) => {
              password = value;
              this.passwordsAreSame(password, confirm);
            }}
          ></input>

          <p>Confirm Password</p>
          <input
            type="password"
            className="form-control"
            required
            onChange={({ target: { value } }) => {
              confirm = value;
              this.passwordsAreSame(password, confirm);
            }}
          ></input>

          <br></br>
          <Button
            variant="primary"
            type="submit"
            value="Submit"
            disabled={this.state.disabled}
          >
            {" "}
            Register{" "}
          </Button>
        </form>
      </div>
    );
  }
}

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
    };
  }

  submitData = (event) => {
    event.preventDefault();
    var json = JSON.stringify({
      email: this.state.password,
    });

    alert("TODO" + json);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitData}>
          <p>E-mail</p>
          <input type="email" className="form-control" required></input>

          <br></br>
          <Button variant="primary" type="submit" value="Submit">
            {" "}
            Reset Password{" "}
          </Button>
        </form>
      </div>
    );
  }
}

class Logout extends React.Component {
  submitData = (event) => {
    event.preventDefault();

    fetchLogout();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitData}>
          <Button variant="danger" type="submit" value="Submit">
            {" "}
            Logout{" "}
          </Button>
        </form>
      </div>
    );
  }
}
