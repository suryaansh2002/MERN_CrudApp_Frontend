import "./App.css";
import NavigationBar from "./components/NavigationBar";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import UpdateForm from "./components/UpdateForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Welcome from "./components/Welcome";

function App() {
  const [user, setUser] = useState();
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  return (
    <Router>
      <NavigationBar
        cookie={cookie}
        removeCookie={removeCookie}
        setCookie={setCookie}
        user={user}
        setUser={setUser}
      />
      <Switch>
        <Route path="/" exact>
        <Welcome cookie={cookie}/>
          <BlogList cookie={cookie}/>
        </Route>
       {cookie.user? <Route path="/add" exact>
          <BlogForm cookie={cookie} />
        </Route> : null}
        <Route  path="/edit/:_id" exact>
          <UpdateForm cookie={cookie}/>
        </Route>
        <Route path="/" >
        Hello World
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
