import React from "react";

import "../../../Style/style.css";

import { Link } from "react-router-dom";
import { fetchSearchResults } from "../../../Server/Connections/contacts";
import { Button } from "react-bootstrap";

//========================================================


function debounce(func, timeout = 300){
  let timer;  
  clearTimeout(timer);
  timer = setTimeout(() => { func.apply(this); }, timeout);
}


export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      display: "none",
      searchQuery: this.props.searchQuery ? decodeURIComponent(this.props.searchQuery) : "",
      searchResult: [],
    };
  }

  
  search = (event) => {    
    this.setState({ searchQuery: encodeURIComponent(event.target.value) });
    debounce(() => fetchSearchResults(
      event.target.value === "" ? null : encodeURIComponent(event.target.value),
      0,
      5
    ).then(async (data) => {
      this.setState({ searchResult: data.contacts });
    }));
    this.setState({ display: "" });
  };

  render() {

    
    let page = 0;
    let buffer = 10;
    let searchPage = `${window.location.protocol}//${window.location.host}/search?q=${this.state.searchQuery}&p=${page}&b=${buffer}`
    return (
      <div>
        <div className="flex-column">
          <div className="flex-row" style={{margin: "5px"}}>
            <input
              onChange={this.search}
              className="form-control search-bar"
              placeholder="Search a contact"
              defaultValue={this.state.searchQuery}
              style={{ width: "600px" }}
            ></input>
            <Button onClick={() => window.location = searchPage} variant="secondary">
              <span className="fas fa-search" />
            </Button>
          </div>
          <div
            className="search-results"
            style={{ display: this.state.display }}
          >
            {this.state.searchResult.map((contact) => {
              return (
                <Link key={contact.id} to={"/contact/" + contact.id}>
                  <p>{contact.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
