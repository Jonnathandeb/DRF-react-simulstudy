import React, { createRef } from 'react';
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

const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

function App() {
  let contextRef = createRef()

  return (
    <div>
      <BrowserRouter>
        <div ref={contextRef}>
          <CustomNavbar />
          <Switch>
            <SecretRoute 
              exact 
              path="/" 
              render={matchProps => (
                <HomePage {...matchProps} />
              )} 
            />
            <SecretRoute  
              path="/profile/:id" 
              render={matchProps => (
                <OtherProfilePage {...matchProps} />
              )} 
            />
            <SecretRoute  
              path="/profile" 
              render={matchProps => (
                <SelfProfilePage {...matchProps} />
              )} 
            />
            <SecretRoute  
              path="/feed/:id" 
              render={matchProps => (
                <FeedClassPage {...matchProps} />
              )} 
            />
            <SecretRoute  
              path="/feed" 
              render={matchProps => (
                <FeedPage {...matchProps} />
              )} 
            />
            <SecretRoute  
              path="/post/:id" 
              render={matchProps => (
                <PostIdPage {...matchProps} />
              )}
            />
            <SecretRoute  
              path="/post" 
              render={matchProps => (
                <MakePostPage {...matchProps} />
              )} 
            />
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
            <SecretRoute  
              path="/leaderboard" 
              render={matchProps => (
                <LeaderboardPage {...matchProps} />
              )} 
            />
            <SecretRoute  
              path="/search" 
              render={matchProps => (
                <SearchPage {...matchProps} />
              )} 
            />
          </Switch>
        </div>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

// imports semantic stylesheet
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default App;