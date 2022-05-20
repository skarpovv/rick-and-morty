import React, {useEffect, useRef} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getCharacterThunk} from "../../redux/reducers/characterReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./../Preloader";
import {Box} from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

let StyledProperty = {
    display:"flex",
    alignItems: "center"
}

let StyledCharacterPageBox = {
    display: "flex",
    padding: "40px",
    justifyContent: "center",
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

let createLocationId = (url: string):string => url.replace("https://rickandmortyapi.com/api/location/","");


const CharacterPage = () => {
    let param = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let person = useSelector((state:any) => state.characters.character);
    const goLocation = (id: string) => navigate("/locations/"+id);

    useEffect(() => {
        dispatch(getCharacterThunk(param.id));
    },[])

    return (
        (person) ?
            <Box>
                <Box sx={StyledCharacterPageBox}>
                    <Box sx={StyledImage}>
                        <img src={person.image}></img>
                    </Box>

                    <Box sx={{ paddingLeft:"30px"}}>
                        <h1 style = {{fontWeight: "1000"}}>{person.name}</h1>
                        <h3 style={StyledProperty}>
                            Status: {person.status}   {(person.status === "Dead") ? <SentimentVeryDissatisfiedIcon color="error"/> :
                            (person.status === "Alive") ? <SentimentVerySatisfiedIcon sx={{color:"#090"}}/>
                                : <QuestionMarkIcon sx={{color:"#709"}}/>}
                        </h3>
                        <h3 style={StyledProperty}>
                            Gender: {person.gender}   {(person.gender == "Male") ? <MaleIcon sx={{color: "#09b"}}/> :
                            (person.gender == "Female") ? <FemaleIcon sx={{color: "#f0f"}}/> : <TransgenderIcon sx={{color: "#709"}} />}
                        </h3>
                        <h3 style={StyledProperty}>Class: {person.species}</h3>
                        <h3 style={StyledProperty}>

                            <span style={{cursor: "pointer", textDecoration:"underline"}}
                                  onClick={()=>{
                                      if (person.origin.name === "unknown") return;
                                      goLocation(createLocationId(person.origin.url))}
                                  }>
                        Home: {person.origin.name}
                        </span>
                        </h3>
                    </Box>
                </Box>

                <Box>
                    <ul>
                    {person.episode.map((el:any) => {
                        return <li key={el.id}>{el.name}</li>
                    })}
                    </ul>
                </Box>
            </Box>
            :
            <Preloader/>
    );
};

export default CharacterPage;