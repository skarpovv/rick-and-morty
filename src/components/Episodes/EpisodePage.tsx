import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {getEpisodeThunk} from "../../redux/reducers/episodeReducer";
import {useDispatch, useSelector} from "react-redux";
import Character from "../Characters/Character";
import Preloader from "../Preloader";
import {getSE} from "./Episodes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

let StyledEpisodePage = {
    textAlign: "center",
    ".se":{
        padding: "5px",
        backgroundColor: "#666",
        color: "#fff",
        borderRadius: "7px",
    },
    ".cse":{
        marginTop: "0px",
    },
    "h1":{
        fontWeight: "300",
        fontSize: "34px",
    },
    ".arrowBack":{
        textAlign: "start",
        padding: "20px 20px 0px 20px",
        cursor: "pointer",
    }
}

const EpisodePage = () => {
    const param = useParams();
    let episode = useSelector((state:any)=>state.episodes.episode);
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(()=>{
        dispatch(getEpisodeThunk(param.id));
    },[]);

    return (
        (episode)
            ?
            <Box sx={StyledEpisodePage}>
                <div className="arrowBack"><ArrowBackIosIcon onClick={()=>{goBack()}}/></div>
                <h2 className="cse"> <span className="se">Season {getSE(episode.episode).season}, Episode {getSE(episode.episode).episode}</span></h2>
                <h1>{episode.name}</h1>
                <h3>{episode.air_date}</h3>
                <h2>Episode characters: </h2>
                <div style = {{display: "flex", flexWrap: "wrap", justifyContent: "space-around", maxWidth: "900px",margin: "0 auto"}}>
                    {episode.characters && episode.characters.map((el:any) => {
                        return <Character size={150} key={el.id} name={el.name} url={el.image} id={el.id}/>
                    }) }
                </div>
            </Box>
            :
            <Box>
                <Preloader/>
            </Box>
    );
};

export default EpisodePage;