import React from 'react';
import {Box} from "@mui/material";
import rick from "./../../assets/Rick.jpeg";
import locations from "./../../assets/locations.jpg";
import episodes from "./../../assets/episodes.jpg"
import {Link} from "react-router-dom";

const StyledHomeContainer = {
    margin: "0",
    backgroundColor: "#FEFBE8",
    "h1": {
        marginTop: "0px",
        marginBottom: "21px",
        paddingTop: "21px",
    },
    "h1, h2": {
        textAlign: "center",
    },
    ".line": {
        height: "3px",
        background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(102,218,255,1) 30%, rgba(242,255,72,1) 50%, rgba(107,219,255,1) 70%, rgba(255,255,255,1) 100%)",
    },
    ".choose": {
        marginTop: "30px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        "div": {
            height: "250px",
            width: "250px",
            border: "3px solid black",
            borderRadius: "20px",
            marginBottom: "35px",
            fontWeight: "1000",
            fontSize: "30px",
            textAlign: "center",
            lineHeight: "230px",
            color: "#000",
            transition: "all ease 0.3s",
            ":hover": {
                scale: "1.1",
            },
        },
        ".characters-div": {
            background: `url('${rick}') center/cover no-repeat`,
        },
        ".locations-div": {
            background: `url('${locations}') center/cover no-repeat`,
            color: "#fff",
        },
        ".episodes-div": {
            background: `url('${episodes}') center/cover no-repeat`,
        },
    }
};

const Home = () => {
    return (
        <Box sx={StyledHomeContainer}>
            <h1>Welcome to Rick and Morty wiki</h1>
            <div className="line"></div>
            <h2>Choose what you need from homepage or sidebar <br/> Enjoy :)</h2>
            <Box className="choose">
                <Link to="/characters"><div className="characters-div">Characters</div></Link>
                <Link to="/locations"><div className="locations-div">Locations</div></Link>
                <Link to="/episodes"><div className="episodes-div">Episodes</div></Link>
            </Box>
            <div className="line"></div>
        </Box>
    );
};

export default Home;