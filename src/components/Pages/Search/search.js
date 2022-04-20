import React from "react";
import { Link } from "react-router-dom";
import { fetchSearchResults } from "../../Server/Connections/contacts";
import { NavBar } from "../MainPage/Elements/navbar";
import { ContactButton } from "../Profile/Elements/contact-button";
import Button from "react-bootstrap/Button";

export class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfPages: null,
      publicContacts: null,
    };

    this.numberOfPages = []
    const urlParams = new URLSearchParams(window.location.search);
    this.query = urlParams.get('q')
    this.page = urlParams.get('p')
    this.buffer = urlParams.get('b')
    this.query = encodeURIComponent(this.query)
    fetchSearchResults(this.query, this.page, this.buffer).then(async (data) => {
      for(let i=0; i<data.pages; i++)
        this.numberOfPages[i] = i
      this.setState({ publicContacts: data.contacts });
    });
  }

  changePage(pageNumber) {
    var searchPage = `${window.location.protocol}//${window.location.host}/search?q=${this.query}&p=${pageNumber}&b=${this.buffer}`
    window.location = searchPage;
  }

  render() {
    return (
      <>
        <NavBar searchQuery={this.query} logged={this.props.logged} userId={this.props.userId} />
        {this.state.publicContacts != null ? (
          <>
            {this.state.publicContacts.length !== 0 ? (
              <div style={{overflow: "auto", height:  "calc(100vh - 55px)"}}>
                {this.state.publicContacts.map((contact, index) => {
                  return (
                    <div key={contact.id}>
                      <Link to={"/contact/" + contact.id}>
                        {<ContactButton contact={contact} parentPage={"search"} />}
                      </Link>
                    </div>
                  );
                })}
                <div className="flex-row">
                  {this.numberOfPages.map((pageNumber) => {
                    return (
                      <div style={{margin: "0 1px"}}>
                        <Button variant="secondary" onClick={() => this.changePage(pageNumber)}>{pageNumber + 1}</Button>
                      </div>
                    );
                  })}
                    
                </div>
              </div>
            ) : (
              <h2>No results</h2>
            )}
          </>
        ) : (
          <h2>Fetching data...</h2>
        )}
      </>
    );
  }
}
