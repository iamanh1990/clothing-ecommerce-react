import React from "react";
import { Route, Switch } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import "./App.css";
import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.components";
import ShopPage from "./pages/shoppage/shoppage.component";
import HatsPage from "./pages/hatspage/hatspage.component";
import JacketsPage from "./pages/jacketspage/jacketspage.component";
import SneakersPage from "./pages/sneakerspage/sneakerspage.component";
import MensPage from "./pages/menspage/menspage.component";
import WomensPage from "./pages/womenspage/womenspage.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/shop/hats" component={HatsPage} />
          <Route exact path="/shop/jackets" component={JacketsPage} />
          <Route exact path="/shop/sneakers" component={SneakersPage} />
          <Route exact path="/shop/mens" component={MensPage} />
          <Route exact path="/shop/womens" component={WomensPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
