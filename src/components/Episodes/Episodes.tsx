import React, {useEffect} from 'react';
import {Box, Pagination} from "@mui/material";
import {getEpisodesThunk} from "../../redux/reducers/episodeReducer";
import {useDispatch, useSelector} from "react-redux";

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
            <Box>
                <Pagination count={pages} page={currentPage} size="medium" onChange={changePage} />
                {episodes.map((el:any) => {
                    return <div key={el.id}> {el.name}, {el.episode}, {el.air_date} </div>
                })}
            </Box>
            :
            <Box>
                <h1>Wait</h1>
            </Box>
    );
};

export default Episodes;