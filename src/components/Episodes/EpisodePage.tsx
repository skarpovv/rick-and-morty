import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";
import {getEpisodeThunk} from "../../redux/reducers/episodeReducer";
import {useDispatch, useSelector} from "react-redux";
import Character from "../Characters/Character";
import Preloader from "../Preloader";
import {getSE} from "./Episodes";

let StyledEpisodePage = {
    textAlign: "center",
    ".se":{
        padding: "5px",
        backgroundColor: "#666",
        color: "#fff",
        borderRadius: "7px",
    },
    "h1":{
        fontWeight: "300",
        fontSize: "34px",
    }
}

const EpisodePage = () => {
    const param = useParams();
    let episode = useSelector((state:any)=>state.episodes.episode);
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getEpisodeThunk(param.id));
    },[]);

    return (
        (episode)
            ?
            <Box sx={StyledEpisodePage}>
                <h2> <span className="se">Season {getSE(episode.episode).season}, Episode {getSE(episode.episode).episode}</span></h2>
                <h1>{episode.name}</h1>
                <h3>{episode.air_date}</h3>
                <h2>Episode characters: </h2>
                <div style = {{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
                    {episode.characters && episode.characters.map((el:any) => {
                        return <Character key={el.id} name={el.name} url={el.image} id={el.id}/>
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