import React from 'react';
import {Box} from "@mui/material";


const StyledAbout = {
    textAlign: "center",
    "a":{
        color: "#55e",
        textDecoration: "underline",
    }
}

const About = () => {
    return (
        <Box sx={StyledAbout}>
            <h2>What is this?</h2>
            <h3>The Rick and Morty Single Page Application based on television show 
                <a href="https://www.adultswim.com/videos/rick-and-morty">Rick and Morty</a>
            </h3>
            <h2>Who are you?</h2>
            <h3>
                I am <a href="https://github.com/skarpovv">Serghei Carpov</a>, student on Technical University of Moldova,
                just a guy who wants to develop and create interesting things :)
            </h3>

            <h2>Technical stuff?</h2>
            <h3>View - React<br/>State manager - Redux <br/>Data access - Axios <br/><a href="https://mui.com/">Material UI</a></h3>

            <h2>Thanks to</h2>
            <h3>
                <a href="https://github.com/afuh">Axel Fuhrmann</a> for great <a href="https://rickandmortyapi.com/">Rick and Morty API</a>
                <br/> And <a href="https://pages.github.com/">GitHub Pages</a> for free hosting
            </h3>

        </Box>
    );
};

export default About;