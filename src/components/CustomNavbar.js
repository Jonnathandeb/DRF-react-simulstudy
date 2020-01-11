/*import React, { Component, createRef } from 'react';
import { Menu, Input, Sticky } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";
import ClassesDropdown from './ClassesDropdown';

import { useAuth0 } from "../react-auth0-spa";

function withAuth0Hook(Component) {
    return function WrappedComponent(props) {
        const auth0Value = useAuth0([]);
        console.log(auth0Value)
        return <Component {...props}  />;
        // auth0Value={{isAuthenticated, loginWithRedirect, logout}}
    }
}

class CustomNavbar extends Component {
    contextRef = createRef()

    render() {
        return (
            <Sticky context={this.contextRef}>
                <Menu stackable>
                    <Menu.Item>
                        <img src='/SS_logo.png' alt="Simulstudy Logo" />
                    </Menu.Item>
                    <Menu.Item
                        exact
                        as={NavLink}
                        to="/"
                        name='home'
                    />
                    <ClassesDropdown id="5" active={true} />
                    <Menu.Item
                        as={NavLink}
                        to="/profile"
                        name='profile'
                    />
                    <Menu.Item
                        as={NavLink}
                        to="/leaderboard"
                        name='leaderboard'
                    />
                    <Menu.Item>
                        <Input className='icon' placeholder='Search...' action="search"/>
                    </Menu.Item>
                    {!isAuthenticated && (
                        <button onClick={() => loginWithRedirect({})}>Log in</button>
                    )}

                    {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
                </Menu>
            </Sticky>
        )

        return <div>hi</div>
    }
}

CustomNavbar = withAuth0Hook(CustomNavbar)
export default CustomNavbar;*/

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const CustomNavbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default CustomNavbar;