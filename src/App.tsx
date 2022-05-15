import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Characters from "./components/Characters/Characters";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
      <Provider store={store}>
    <div className="App">
        <Header/>
        <Characters/>
    </div>
      </Provider>
  );
}

export default App;
