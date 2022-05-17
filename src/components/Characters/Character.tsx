import React from 'react';
import {Box} from "@mui/material";
import {Link} from "react-router-dom";

type CharacterPropsType = {
    name: string,
    url: string,
    id: number,
}

let StyledCharacter = {
    padding: "0px",
    margin: "0 auto",
    border: "5px solid #333",
    borderRadius: "30px",
    overflow: "hidden",
    fontWeight: "1000",
    fontFamily: "Arial",
    backgroundColor: "#555",
    textAlign: "center",
    "& a":{
        color: "white",
    },
    "& img":{
        borderRadius: "20px",
    },
    "&":{
        margin: "10px"
    }
}

const Character = (props: CharacterPropsType) => {
    return (
        <Box sx={StyledCharacter}>
            <div><img src={props.url} alt={props.name} width={250} height={250}/></div>
            <div><Link to={`${props.id}`}>{(props.name.length > 22) ? props.name.slice(0,20) + "..." : props.name}</Link></div>
        </Box>
    );
};

export default Character;