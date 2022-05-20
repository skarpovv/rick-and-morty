import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Characters from "./components/Characters/Characters";
import {Provider} from "react-redux";
import store from "./redux/store";
import {HashRouter, Route, Routes} from "react-router-dom";
import CharacterPage from "./components/Characters/CharacterPage";

function App() {
  return (
      <HashRouter>
          <Provider store={store}>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/characters" element={<Characters/>} />
                    <Route path="/characters/:id" element={<CharacterPage/>} />
                </Routes>
            </div>
          </Provider>
      </HashRouter>
  );
}

export default App;
