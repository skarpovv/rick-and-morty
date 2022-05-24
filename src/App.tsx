import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Characters from "./components/Characters/Characters";
import {Provider} from "react-redux";
import store from "./redux/store";
import {HashRouter, Route, Routes} from "react-router-dom";
import CharacterPage from "./components/Characters/CharacterPage";
import Home from "./components/Home/Home";
import EpisodePage from "./components/Episodes/EpisodePage";
import Episodes from "./components/Episodes/Episodes";
import LocationPage from "./components/Locations/LocationPage";
import About from "./components/About";
import Locations from "./components/Locations/Locations";

function App() {
  return (
      <HashRouter>
          <Provider store={store}>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/characters" element={<Characters/>} />
                    <Route path="/characters/:id" element={<CharacterPage/>} />
                    <Route path="/episodes" element={<Episodes/>} />
                    <Route path="/episodes/:id" element={<EpisodePage/>} />
                    <Route path="/locations" element={<Locations/>} />
                    <Route path="/locations/:id" element={<LocationPage/>} />
                    <Route path="/about" element={<About/>} />
                </Routes>
            </div>
          </Provider>
      </HashRouter>
  );
}

export default App;
