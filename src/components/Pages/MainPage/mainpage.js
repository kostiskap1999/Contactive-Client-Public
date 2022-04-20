import React from "react";

import "../../Style/style.css";

import { SearchBar } from "./Elements/searchbar";
import { NavBar } from "./Elements/navbar";

//========================================================

export class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: this.props.logged,
      userId: this.props.userId,
    };
  }

  LogIn(uid) {
    this.setState({ logged: true });
    this.setState({ userId: uid });
  }

  LogOut() {
    this.setState({ logged: false });
    this.setState({ userId: null });
  }

  render() {
    return (
      <div className="flex-column" style={{ overflow: "hidden" }}>
        <NavBar {...this.state} />
          <div className="screen">
            <div className="welcome-text">
              <div style={{ margin: "30px 0", fontSize: "40px" }}>Welcome to Contactive.</div>
              <h3>Search a public contact.</h3>
            </div>
            <SearchBar />
        </div>
      </div>
    );
  }
}