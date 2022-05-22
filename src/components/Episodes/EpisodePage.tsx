import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useParams} from "react-router-dom";
import {getEpisodeThunk} from "../../redux/reducers/episodeReducer";
import {useDispatch, useSelector} from "react-redux";
import Character from "../Characters/Character";

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
            <Box sx={{textAlign: "center"}}>
                <h1>{episode.name}</h1>
                <h2>{episode.episode}</h2>
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
                <h1>Wait</h1>
            </Box>
    );
};

export default EpisodePage;