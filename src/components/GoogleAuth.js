import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  //state = { isSignedIn: null }; // not needed to implement component level state inorder to make the login status available to other components as well

  componentDidMount() {
    /*the google auth process works as - 
    Loading the gapi and then fetching the client api and making an initializatuon to it which then sends a promise
    which then gives access to google auth and then the user's state of signedIn/signedOut is known */
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "842370859852-r595gm7r1te7s2rv9fe0so6ljqivg803.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // this promise gives access to google auth to the whole app to sign a user in/out
          this.auth = window.gapi.auth2.getAuthInstance();
          //this.setState({ isSignedIn: this.auth.isSignedIn.get() }); // can be refactore as - this.onAuthChange();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange); //it listens to the change of the state of isSignedIn and gives a callback(onAuthChange) which then updates the auth text through
        });
    });
  }

  //since the below function is  a callback function so we ned to implement it as arrow function to make it bound to the component
  // In reality, "onAuthChange" is called with a boolean value that gives true/false according to whether user is signed in or not
  // so we dont need to check the login status separetly using, "this.auth.isSignedIn.get()" , we can take instead a boolean value as argument
  /* onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };*/

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn == null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div> {this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
