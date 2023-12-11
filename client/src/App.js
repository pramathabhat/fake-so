// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import './stylesheets/App.css';
import FakeStackOverflow from './components/fakestackoverflow.js';
import React from 'react';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import authReducer from "./components/users/auth-reducer";
const store = configureStore(
    {
        reducer: {
            user:  authReducer}});

function App() {
  return (
    <section className="fakeso">
        <Provider store={store}>
            <HashRouter>
                <FakeStackOverflow />
            </HashRouter>
        </Provider>
    </section>
  );
}

export default App;
