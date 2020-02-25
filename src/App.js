import React, { createRef, Component, contextRef } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import { HomePage } from "./pages/Home"
import { OtherProfilePage } from "./pages/OtherProfile"
import { SelfProfilePage } from "./pages/SelfProfile"
import { FeedPage } from "./pages/Feed"
import { FeedClassPage } from "./pages/FeedClass"
import { PostIdPage } from "./pages/PostId"
import { MakePostPage } from "./pages/MakePost"
import { LoginPage } from "./pages/Login"
import { RegisterPage } from "./pages/Register"
import { LeaderboardPage } from "./pages/Leaderboard"
import { SearchPage } from "./pages/Search"
import { Footer } from "./components/Footer"
import CustomNavbar from './components/CustomNavbar';
import { getSession } from "./utils/cookie_manager";


class SecretRoute extends Component {
  render() {
    if (getSession()) {
      return (
        <div ref={contextRef}>
          <CustomNavbar />
          {this.props.children}
        </div>
      );
    }
    else {
      return <Redirect to='/login' />
    }
  }
}

export default class App extends Component {
  contextRef = createRef()

  render(){
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              path="/login" 
              render={matchProps => (
                <LoginPage {...matchProps} />
              )} 
            />
            <Route  
              path="/register" 
              render={matchProps => (
                <RegisterPage {...matchProps} />
              )} 
            />
            <SecretRoute>
              <Route
                exact 
                path="/" 
                render={matchProps => (
                  <HomePage {...matchProps} />
                )} 
              />
              <Route
                path="/profile/:id" 
                render={matchProps => (
                  <OtherProfilePage {...matchProps} />
                )} 
              />
              <Route
                path="/profile" 
                render={matchProps => (
                  <SelfProfilePage {...matchProps} />
                )} 
              />
              <Route
                path="/feed/:id" 
                render={matchProps => (
                  <FeedClassPage {...matchProps} />
                )}
              />
              <Route
                path="/feed" 
                render={matchProps => (
                  <FeedPage {...matchProps} />
                )} 
              />
              <Route
                path="/post/:id" 
                render={matchProps => (
                  <PostIdPage {...matchProps} />
                )}
              />
              <Route
                exact
                path="/post" 
                render={matchProps => (
                  <MakePostPage {...matchProps} />
                )}
              />
              <Route
                path="/leaderboard" 
                render={matchProps => (
                  <LeaderboardPage {...matchProps} />
                )} 
              />
              <Route 
                path="/search" 
                render={matchProps => (
                  <SearchPage {...matchProps} />
                )} 
              />
            </SecretRoute>
          </Switch>
        </BrowserRouter>
        <Footer/>
      </div>
    );
  }
}

// imports semantic stylesheet
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);