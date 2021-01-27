import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.components";
import ShopPage from "./pages/shoppage/shoppage.component";
import HatsPage from "./pages/hatspage/hatspage.component";
import JacketsPage from "./pages/jacketspage/jacketspage.component";
import SneakersPage from "./pages/sneakerspage/sneakerspage.component";
import MensPage from "./pages/menspage/menspage.component";
import WomensPage from "./pages/womenspage/womenspage.component";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/shop/hats" component={HatsPage} />
        <Route exact path="/shop/jackets" component={JacketsPage} />
        <Route exact path="/shop/sneakers" component={SneakersPage} />
        <Route exact path="/shop/mens" component={MensPage} />
        <Route exact path="/shop/womens" component={WomensPage} />
      </Switch>
    </div>
  );
}

export default App;
