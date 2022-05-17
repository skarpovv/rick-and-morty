import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from "@mui/icons-material/Menu";
import {IconButton} from "@mui/material";
import {NavLink} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PublicIcon from '@mui/icons-material/Public';
import TheatersIcon from '@mui/icons-material/Theaters';

const Menu = () => {
    const [state, setState] = React.useState(false);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(prev => !prev);
            };

    const list = () => (
        <Box
            sx={{ width: 'auto'}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Characters', 'Locations', 'Episodes'].map((text, index) => (
                    <NavLink key={text} to={"/" + text.toLowerCase()}>
                        <ListItem button>
                            <ListItemIcon >
                                { text == "Characters" ? <AccessibilityNewIcon /> : text == "Locations" ? <PublicIcon/> : <TheatersIcon/>}
                            </ListItemIcon>
                            <ListItemText sx={{"& span":{fontFamily: "'Quicksand', sans-serif"}}} primary={text} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
            <Divider />
            <List>
                <NavLink to={"/about"}>
                    <ListItem button>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary={"About"} />
                    </ListItem>
                </NavLink>
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon color={"inherit"}/>
            </IconButton>
            <SwipeableDrawer
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
};

export default Menu;