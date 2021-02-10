import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { setCurrentUser } from "./redux/user/user.action";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import "./App.css";
import { selectCurrentUser } from "./redux/user/user.selectors";
import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.components";
import ShopPage from "./pages/shoppage/shoppage.component";
import HatsPage from "./pages/hatspage/hatspage.component";
import JacketsPage from "./pages/jacketspage/jacketspage.component";
import SneakersPage from "./pages/sneakerspage/sneakerspage.component";
import MensPage from "./pages/menspage/menspage.component";
import WomensPage from "./pages/womenspage/womenspage.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkoutpage/checkout.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/shop/hats" component={HatsPage} />
          <Route exact path="/shop/jackets" component={JacketsPage} />
          <Route exact path="/shop/sneakers" component={SneakersPage} />
          <Route exact path="/shop/mens" component={MensPage} />
          <Route exact path="/shop/womens" component={WomensPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
