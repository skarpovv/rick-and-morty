import React, {useEffect} from 'react';
import {Box, Pagination} from "@mui/material";
import {getEpisodesThunk} from "../../redux/reducers/episodeReducer";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

export const getSE = (se:string) => {
    let season = "";
    let episode = "";
    if (se[1] === "0") season += se.slice(2,3)
    else season += se.slice(1,3)
    if (se[4] === "0") episode += se.slice(5,6)
    else episode += se.slice(4,6)
    return {
        season, episode
    }
}

const StyledEpisodes = {

    ".se":{backgroundColor: "#ddd", borderRadius: "5px", padding: "3px"},
    ".episode":{
        ":hover":{
            backgroundColor: "#bbb",
            "span":{
                backgroundColor: "#333",
                color: "#fff",
            }
        },
        textAlign: "center",
        "h5":{
            marginBottom: "3px",
        },
        "h4":{
            marginTop: "10px",
            marginBottom: "0px",
            paddingBottom: "10px",
            fontWeight: "300",
            fontSize: "28px",
        },
        backgroundColor: "#eee",
    },
};

const Episodes = () => {
    let dispatch = useDispatch();
    let currentPage = useSelector((state:any) => state.episodes.currentPage);
    let episodes = useSelector((state:any) => state.episodes.episodesArray);
    let pages = useSelector((state:any) => state.episodes.pages);


    const changePage = (e: React.ChangeEvent<unknown>, value:number) => {
        dispatch(getEpisodesThunk(value));
    }

    useEffect(()=>{
        dispatch(getEpisodesThunk(currentPage));
    },[])

    return (
        (episodes) ?
            <Box sx={StyledEpisodes}>
                <Pagination count={pages} page={currentPage} size="medium" onChange={changePage} />
                {episodes.map((el:any) => {
                    return (
                        <Link to={""+el.id}>
                        <div className="episode" key={el.id}>
                            <h5><span className="se">Season {getSE(el.episode).season}, Episode {getSE(el.episode).episode}</span></h5>
                            <h4>{el.name}</h4>
                        </div>
                        </Link>
                    )
                })}
            </Box>
            :
            <Box>
                <h1>Wait</h1>
            </Box>
    );
};

export default Episodes;