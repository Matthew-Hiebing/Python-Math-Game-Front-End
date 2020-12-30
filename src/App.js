import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Game from './Components/Game/Game';
import Scores from './Components/Scores/Scores';
import Login from './Components/Unauthenticated/Login';
import Signup from './Components/Unauthenticated/Signup';
import Logged_In from './Components/Authenticated/Logged_In';
import Logged_Out from './Components/Authenticated/Logged_Out';
import Signed_In from './Components/Authenticated/Signed_In';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_logged_in: false
    }
  }

  logoutHandler = () => {
    let tempState = this.state;
    tempState.is_logged_in = false;

    localStorage.clear()

    this.setState(tempState);
  }

  loginHandler = () => {
    let tempState = this.state;
    tempState.is_logged_in = true;

    this.setState(tempState);
  }

  componentDidMount() {
    let tempState = this.state;
    // Check if local storage has something in it because it means they are logged in
    console.log(localStorage.getItem('access_token'))
    if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
      tempState.is_logged_in = true;
      this.setState(tempState);
    } else {
      tempState.is_logged_in = false;
      this.setState(tempState);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Container>
            {
              (this.state.is_logged_in) ?
              (
                  <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                      <Link className="navbar-brand" to="/">Home</Link>
                      <Link className="navbar-brand" to="/game">Game</Link>
                      <Link className="navbar-brand" to="/scores">Scores</Link>
                      <Link className="navbar-brand" to="/admin">Admin</Link>
                    </div>
                  </Navbar>
              ) :
              (
                  <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                      <Link className="navbar-brand" to="/">Home</Link>
                    </div>
                  </Navbar>
              )
            }

            {
              (this.state.is_logged_in) ? // if logged in see below
                (
                  <div>
                    <Switch>
                      <Route exact path="/" component={props => (<Home {...props} {...this.state} logoutHandler={this.logoutHandler} />)} />
                      <Route path="/game" component={props => (<Game {...props} />)} />
                      <Route path="/scores" component={props => (<Scores {...props} />)} />
                    </Switch>
                  </div>
                ) : // else show
                (
                  <div>
                    <Switch>
                      <Route exact path="/" component={props => (<Home {...props} {...this.state} logoutHandler={this.logoutHandler} />)} />
                      <Route path="/login" component={props => (<Login {...props} loginHandler={this.loginHandler} />)} />
                      <Route path="/signup" component={props => (<Signup {...props} />)} />
                    </Switch>
                  </div>
                )
            }
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
