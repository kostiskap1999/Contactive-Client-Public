import React from "react";

import "../../../Style/style.css";

import { LoginMain } from "./connect";
import { Link } from "react-router-dom";
import { SearchBar } from "./searchbar";

import Button from "react-bootstrap/Button";

//========================================================

export class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: this.props.logged,
      userId: this.props.userId,
    };
  }

  render() {
    return (
      <div className="nav-bar">
        <div>
          <Link className="nav" to="/">
            <div className="logo">
              <span> Contactive </span>
            </div>
          </Link>
        </div>

        {window.location.pathname === "/search"
          &&
          <SearchBar searchQuery={this.props.searchQuery ? this.props.searchQuery : ""}/>
        }

        <span className="nav-divider"></span>
        <div
          className="flex-row nav"
          style={{ float: "right", margin: "10px" }}
        >
          {this.state.logged && (
            <div>
              {this.state.userId !== undefined ? (
                <div style={{margin: "0 16px"}}>
                  <Link to={"/profile"}>
                    <Button variant="secondary"> Profile </Button>
                  </Link>
                </div>
              ) : (
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
              )}
            </div>
          )}
          <LoginMain logged={this.state.logged} />
        </div>
      </div>
    );
  }
}