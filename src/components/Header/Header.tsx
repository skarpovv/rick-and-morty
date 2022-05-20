import React from 'react';
import {AppBar, Box, Toolbar} from "@mui/material";
import Menu from "../Menu/Menu";
import Logo from "../../assets/RickAndMortyLogo.png";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: "#00B5CC"}}>
                <Toolbar sx={{textAlign: "center"}}>
                    <Menu/>
                    <div style={{width: "90%"}}>
                        <Link to=""><img src={Logo} width={250} /></Link>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;