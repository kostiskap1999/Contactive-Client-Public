import React from "react";
import ReactDOM from "react-dom";

import { checkACookieExists } from "./components/Server/Util/cookies";

import { MainPage } from "./components/Pages/MainPage/mainpage";
import { Profile } from "./components/Pages/Profile/profile";
import { ErrorPage } from "./components/Pages/Error/error";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./components/Style/style.css";

import { User } from "./components/Model/User";
import { InfoView } from "./components/Pages/Profile/Elements/infoview";
import { extractUser } from "./components/Server/Extractors/ExtractUser";
import { fetchRenew } from "./components/Server/Connections/connect";
import { SearchPage } from "./components/Pages/Search/search";
import { getContactByKey } from "./components/Server/Connections/contacts";

//========================================================

export class Main extends React.Component {
  constructor(props) {
    super(props);

    var loginStatus = checkACookieExists("authorization");

    this.state = {
      logged: loginStatus,
      userData: new User("", "", "", []),

      viewportWidth: 0,
      viewportHeight: 0,
      smallScreen: false,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    if (loginStatus)
      fetchRenew().then(async () => {
        if (window.location.pathname === "/") {
          await extractUser().then(async (data) => {
            await data.fetchContacts();
            this.setState({ userData: data });
          });
        }
      });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    });
    if (window.innerWidth <= 1000) this.setState({ smallScreen: true });
    else this.setState({ smallScreen: false });
  }

  render() {
    return (
      <>
        <Switch>
          <Route
            path="/"
            component={() => (
              <MainPage
                logged={this.state.logged}
                userId={this.state.userData.id}
              />
            )}
            exact
          />
          <Route
            path="/profile"
            render={(match) => (
              <Profile
                userData={this.state.userData}
                smallScreen={this.state.smallScreen}
                {...match}
              />
            )}
            exact
          />
          <Route
            path="/search"
            render={() => (
              <SearchPage
                logged={this.state.logged}
                userId={this.state.userData.id}
              />
            )}
            exact
          />
          <Route
            path="/contact/:contactId"
            render={(match) => <InfoView isOwnProfile={false} {...match} />}
            exact
          />
          <Route
            path="/join/:key"
            render={(url) =>
              getContactByKey(url.match.params.key).then((data) => {
                window.location = `/contact/${data.contact.id}`;
              })
            }
            exact
          />
          <Route
            path="*"
            component={() => (
              <ErrorPage
                errorCode={"404"}
                errorMessage={"This page does not exist."}
              />
            )}
            exact
          />
        </Switch>
      </>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById("root")
);
