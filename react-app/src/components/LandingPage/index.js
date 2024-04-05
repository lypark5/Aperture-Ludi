import React from "react";
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
import "./LandingPage.css"


function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const LoginTheDemoUserFunction = () => {
        const email = 'demo@aa.io';
        const password = 'password';
        return dispatch(sessionActions.login(email, password))
          .then (() => history.push('/photos/all'))
          .catch(async (res) => {
            const data = await res.json();
          });
      }

    return (
        <div id='landing-page-background-div' style={{backgroundImage: "url('https://images8.alphacoders.com/132/1320554.png')", }}>
            <span id='try'>
              <h1 id='inspiration'>Find your inspiration.</h1>
              <button id='demo' onClick={LoginTheDemoUserFunction}>Demo User</button>
            </span>
            <img className="background-image"></img>
        </div>
    )
}

export default LandingPage
