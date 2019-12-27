import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <Switch>
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
          path="/feed" 
          render={matchProps => (
            <FeedPage {...matchProps} />
          )} 
        />
        <Route  
          path="/feed/:id" 
          render={matchProps => (
            <FeedClassPage {...matchProps} />
          )} 
        />
        <Route  
          path="/post/:id" 
          render={matchProps => (
            <FeedAllPage {...matchProps} />
          )} 
        />
        <Route  
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
        <Route  
          path="/leaderboard" 
          render={matchProps => (
            <LeaderboardPage {...matchProps} />
          )} 
        />
        <Route  
          path="/search" 
          render={matchProps => (
            <Search {...matchProps} />
          )} 
        />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
