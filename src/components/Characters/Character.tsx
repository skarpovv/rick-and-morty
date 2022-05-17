import React from 'react';
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

type CharacterPropsType = {
    name: string,
    url: string,
    id: number,
}

let StyledCharacter = {
    //padding: "5px",
    margin: "0 auto",
    border: "2px solid black",
    borderRadius: "20px",
    overflow: "hidden"
}

const Character = (props: CharacterPropsType) => {
    return (
        <Box sx={StyledCharacter}>
            <div><img src={props.url} alt={props.name}/></div>
            <div><Link to={`${props.id}`}>{props.name}</Link></div>
        </Box>
    );
};

export default Character;