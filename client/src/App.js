import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ContactPage from "./containers/ContactPage/ContactPage";
import Create from "./containers/CreateProfile/CreateProfile";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";
import InProfile from "./containers/InProfile/InProfile";
import Update from "./containers/UpdateProfile/UpdateProfile";
// import Footer from "./components/Footer/Footer";
import { useCookies } from "react-cookie";
import ContactRedirect from "./containers/ContactPage/ContactRedirect";

function ConditionalNavBar() {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["username"]);
  if (cookies.username === "") {
    return null;
  } else {
    return <NavBar></NavBar>;
  }
}

function ConditionalLogin() {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["username"]);
  if (cookies.username === "") {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/create" component={Create} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/contact/" component={ContactPage} />
        <Route exact path="/contact/:id" component={ContactPage} />
        <Route exact path="/contactRedirect/" component={ContactRedirect} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/update" component={Update} />
        <Route path="/inProfile/:id" component={InProfile} />
        <Route exact path="/update/:id" component={Update} />
      </Switch>
    );
  }
}

function App() {
  return (
    <div>
      <Router>
        <ConditionalNavBar></ConditionalNavBar>

        <ConditionalLogin></ConditionalLogin>
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
