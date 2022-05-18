import React from 'react';
import {alpha, AppBar, Box, InputBase, styled, Toolbar, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "../Menu/Menu";
import Logo from "../../assets/RickAndMortyLogo.png";

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: "#1F1E46"}}>
                <Toolbar sx={{textAlign: "center"}}>
                    <Menu/>
                    <div style={{width: "90%"}}>
                        <img src={Logo} width={250} />
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;