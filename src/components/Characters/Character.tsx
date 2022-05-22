import React from 'react';
import {Box} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

type CharacterPropsType = {
    name: string,
    url: string,
    id: number,
}

let StyledCharacter = {
    ":hover":{
      scale: "1.05",
    },
    transition: "all ease 0.2s",
    padding: "0 0 5px 0",
    margin: "0 auto",
    border: "5px solid #000",
    borderRadius: "30px",
    overflow: "hidden",
    fontWeight: "1000",
    backgroundColor: "#A9D3E9",
    textAlign: "center",
    color: "black",
    "& a":{
        color: "black",
    },
    "& img":{
        borderRadius: "20px 20px 0 0",
    },
    "&":{
        margin: "10px"
    }
}

const Character = (props: CharacterPropsType) => {
    let navigate = useNavigate();
    let goCharacterPage = () => navigate("/characters/"+props.id);
    return (
        <span onClick={()=>{goCharacterPage()}} style={{color:"white"}}>
            <Box sx={StyledCharacter}>
                <div><img src={props.url} alt={props.name} width={220} height={220}/></div>
                <div>{(props.name.length > 22) ? props.name.slice(0,20) + "..." : props.name}</div>
            </Box>
        </span>
    );
};

export default Character;