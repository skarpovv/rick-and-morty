import React from 'react';
import PreloaderGif from "./../assets/Preloader.gif";

const Preloader = () => {
    return (
        <div style={{backgroundColor: "#fff", textAlign: "center"}}>
            <img src={PreloaderGif}></img>
        </div>
    );
};

export default Preloader;