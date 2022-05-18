import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getCharacterThunk} from "../../redux/reducers/characterReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./../Preloader";
import {Box} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

let StyledCharacterPageBox = {
    backgroundColor: "#FBF976",
    height: "500px",
    display: "flex",
    padding: "40px",
    justifyContent: "space-around",
    flexWrap: "wrap",
    fontFamily: "'Quicksand', sans-serif"
}
let StyledImage = {
    height: "300px",
    border: "5px solid black",
    borderRadius: "50px",
    overflow: "hidden",
    boxShadow: "0px 0px 30px 5px rgba(0, 181, 204, 0.8)",
    minWidth: "300px",
}

const CharacterPage = () => {
    let param = useParams();
    let dispatch = useDispatch();
    let person = useSelector((state:any) => state.characters.character);

    useEffect(() => {
        dispatch(getCharacterThunk(param.id));
    },[])

    return (
        (person) ?
            <Box sx={StyledCharacterPageBox}>
                <Box sx={StyledImage}>
                    <img src={person.image}></img>
                </Box>

                <Box sx={{flexGrow: "1"}}>
                    <h1>{person.name}</h1>
                    <h2>Status: {person.status}</h2>
                    <h2>Class: {person.species}</h2>
                    <h2>Gender: {person.gender}</h2>
                </Box>

            </Box>
            :
            <Preloader/>
    );
};

export default CharacterPage;